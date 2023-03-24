var mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({ //mongoDB type
    id: Number,
    name: String,
    desc: String,
    difficulty: String
});
const problemModel = mongoose.model("ProblemData", ProblemSchema);

module.exports = problemModel;  