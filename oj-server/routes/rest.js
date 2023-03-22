var express = require("express");
var router = express.Router();
var problemService = require("../services/problemService");

router.get("/problems", function(req, res){  //如果/api/v1后面跟/problems，就调用
    problemService.getProblems() //等Promise运行之后，拿到problems,去services里定义getProblem()
        .then(problems => res.json(problems));
});

module.exports = router;