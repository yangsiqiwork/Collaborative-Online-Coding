var express = require("express");
var router = express.Router();
var problemService = require("../services/problemService");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json(); //使用json-parser

//router处理对应的API

router.get("/problems", function(req, res){  //如果/api/v1后面跟/problems，就调用
    problemService.getProblems() //等Promise运行之后，拿到problems,去services里定义getProblem()
        .then(problems => res.json(problems));
});

router.get("/problems/:id", function(req, res) {
    var id = req.params.id;   //Express提供的params
    problemService.getProblem(+id)
        .then(problem => res.json(problem))
});

 //serve parse json data，need json-parser to get req.body
 router.post("/problems", jsonParser, function(req, res) {
    problemService.addProblem(req.body)
        .then(function (problem) { 
            res.json(problem);
        }, function (error) {
            res.status(400).send("Problem name already exists!!!");
        });
});

module.exports = router;
