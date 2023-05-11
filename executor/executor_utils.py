import docker 
import os
import shutil #bash util
import uuid

from docker.errors import * #导入exeption #docker 自带的exception 

IMAGE_NAME = "yangsiqiwork/coj-executor"

CURRENT_DIR = os.path.dirname(os.path.realpath(__file__)) #os得到当前路径
TEMP_BUILD_DIR = f"{CURRENT_DIR}"  

SOURCE_FILE_NAMES = {
    'java': "Example.java",
    'python' : 'example.py'
}

BINARY_NAMES = {
    'java': 'Example',
    'python': 'example.py'
}

BUILD_COMMANDS = {
    'java': 'javac',
    'python': 'python3'
}

EXECUTE_COMMANDS = {
    'java': 'java',
    'python': 'python3'
}

client = docker.from_env()

def load_image():
    try:
        client.images.get(IMAGE_NAME)
    except ImageNotFound: #image 在不在本地，需要下载pull
        print("Image not found locally. loading from Dockerhub...")
        client.images.pull(IMAGE_NAME)
    except APIError: #更早的exception，链接docker hub没有成功连上
        print("Image not found locally. DockerHub is not accessible.")
        return
    print( f"Image:{IMAGE_NAME} loaded")

def build_and_run(code, lang):
    # Docker operations:使用client，用docker run运行IMAGE，同时用磁盘作为空间映射，传入用户的代码。 
    # 把Ubuntu里的file映射到docker里。在docker container里就能看到用户代码。
    result = {"build": None, "run": None, "error": None} #定义返回体格式，json：build值，run的值，会被返回到rest.js中

    source_file_parent_dir_name = uuid.uuid4() #会同时接受多个request，唯一生成一个id，定位一个file
    source_file_host_dir = f"{TEMP_BUILD_DIR}/{source_file_parent_dir_name}" #host directory在Ubuntu上
    source_file_guest_dir = f"/test/{source_file_parent_dir_name}"#在docker contain里面,直接在根目录里建
    #把host里的内容直接map到guest directory里。
    make_dir(source_file_host_dir)
    
    with open(f"{source_file_host_dir}/{SOURCE_FILE_NAMES[lang]}", 'w') as source_file: #SOURCE_FILE_NAMES map?
        source_file.write(code)

    try: 
        client.containers.run(
            image=IMAGE_NAME, #指定部分参数
            command=f"{BUILD_COMMANDS[lang]} {SOURCE_FILE_NAMES[lang]}",  #build command:javac command compiles Java source code into Java bytecodes
            volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}}, #bind两个
            working_dir=source_file_guest_dir #指定container运行起来以后位置，相当于在linux里运行了一个cd
        )
        print("Source built.")
        result['build'] = 'OK' 
    except ContainerError as e:
        print("Build failed.")
        result["build"] = e.stderr.decode('utf-8')
        shutil.rmtree(source_file_host_dir) #删除文件夹，和里面包含的所有文件
        return result
    
    try:#excute command: java command is used to execute the bytecode of java
        log = client.containers.run( #log通过run直接返回过来，包含的是stantard output
            image=IMAGE_NAME, #指定部分参数
            command=f"{EXECUTE_COMMANDS[lang]} {BINARY_NAMES[lang]}",  #build command:javac command compiles Java source code into Java bytecodes
            volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}}, #bind两个
            working_dir=source_file_guest_dir #指定container运行起来以后位置，相当于在linux里运行了一个cd
        )
        print("Executed.")
        result['run'] = log.decode('utf-8')
    except ContainerError as e:
        print("Execution failed.")
        result["run"] = e.stderr.decode('utf-8')
        shutil.rmtree(source_file_host_dir) #删除文件夹，和里面包含的所有文件
        return result
    
    shutil.rmtree(source_file_host_dir) #结果完成了，删掉
    return result

def make_dir(dir):
    try:
        os.mkdir(dir)
        print(f"Temp build directory {dir} created.")
    except: #报错，绝大部分情况是已经有了
        print(f"Temp build directory {dir} exitsts.")
