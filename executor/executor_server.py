import executor_utils as eu
import json

from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)

# @app.route("/")
# def hello(): 
#     return "Hello World!"

@app.route("/build_and_run", methods = ["POST"])
def build_and_run():
    data = json.loads(request.data) #data 以string的形式，load成有格式的json的形式. node server里加进去的request.data?

    if 'code' not in data or 'lang' not in data: #判断code和lang有没有出现在json格式的data里面。rest.js里传进来的data？
        return "You should provide both 'code' and 'lang'"
    code = data['code']
    lang = data['lang']

    print( f"API got called with code: {code} in {lang}" )

    result = eu.build_and_run(code, lang)
    # print("===============================================")
    # print(type(result))
    # print(result)
    return jsonify(result)

if __name__ == "__main__":
    eu.load_image() #确定本地存在image
    app.run(debug=True) #再执行外部命令
