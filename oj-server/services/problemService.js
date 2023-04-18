// var problems = [
//         {
//             id: 1,
//             name: "Two Sum",
//             desc: `Given an array of integers, find two numbers such that they add up to a specific target number.
        
//         The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are NOT zero-based.`,
//             difficulty: "easy"
//           },
//           {
//             id: 2,
//             name: "3Sum",
//             desc: `Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.`,
//             difficulty: "medium"
//           },
//           {
//             id: 3,
//             name: "4Sum",
//             desc: `Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target?
        
//         Find all unique quadruplets in the array which gives the sum of target.`,
//             difficulty: "medium"
//           },
//           {
//             id: 4,
//             name: "Triangle Count",
//             desc: `Given an array of integers, how many three numbers can be found in the array, so that we can build an triangle whose three edges length is the three numbers that we find?`,
//             difficulty: "hard"
//           },
//           {
//             id: 5,
//             name: "Sliding Window Maximum",
//             desc: `Given an array of n integer with duplicate number, and a moving window(size k), move the window at each iteration from the start of the array, find the maximum number inside the window at each moving.`,
//             difficulty: "super"
//           }
      
//       ];

var ProblemModel = require("../models/problemModel");

//定义getProblems：
var getProblems = function () {
    return new Promise((resolve, reject) => {
        // resolve(problems); //把现有的problems都扔进去
        
        ProblemModel.find({})
        .then(function (problems) {
            resolve(problems);
        })
        .catch(function (err) {
            reject(err);
        }) 
    });
}

var getProblem = function (id) {
    return new Promise((resolve, reject) => {
        // resolve(problems.find(problem => problem.id === id)); 
        
        ProblemModel.find({id: id})
        .then(function (problem) {
            resolve(problem);
        })
        .catch(function (err) {
            reject(err);
        }) 
    });
}

var addProblem = function (newProblem) { //newProblem: do not have id
    return new Promise((resolve, reject) => {
        // if (problems.find(problem => problem.name === newProblem.name)) {
        //     reject("Problem already exists");
        // } else {
        //     newProblem.id = problems.length + 1;
        //     problems.push(newProblem);
        //     resolve(newProblem);
        // }
        // ProblemModel.findOne({name: newProblem.name}, function (err, problem) {
        //     if (problem) {  //if problem already exits
        //         reject("Problem name already exists");
        //     } else {
        //         ProblemModel.count({}, function(err, count){
        //             newProblem.id = count + 1;
        //             var mongoProblem = new ProblemModel(newProblem);
        //             mongoProblem.save();
        //             resolve(newProblem);
        //         });
        //     }
        // });
        ProblemModel.exists({name: newProblem.name})
            .then(function (problem) {
                // console.log(problem) //{ _id: new ObjectId("641d4461069fc3f273bf7998") } or null
                if (problem) { //因为数组是object，所以即便数组中没有值，if判断的话也会被转化为true
                    console.log("reject")
                    reject("Problem name already exists");
                }else {
                            // ProblemModel.count({}, function(err, count){
                            //     console.log(count)
                            //     newProblem.id = count + 1;
                            //     var mongoProblem = new ProblemModel(newProblem);
                            //     mongoProblem.save();
                            //     resolve(newProblem);
                            // });

                            ProblemModel.count({})
                .then(function(count) {
                    // console.log(count)
                    newProblem.id = count + 1;
                    var mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save();
                    resolve(newProblem);
                })
                }                
            })
    })
}

module.exports = {//输出的object，是problemService
    getProblems: getProblems,
    getProblem: getProblem,
    addProblem: addProblem
}