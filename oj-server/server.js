var express = require("express") 
const app = express()
const port = 3000
var restRouter = require("./routes/rest");
var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://siqiy:102938@siqiy.6zytxru.mongodb.net/?retryWrites=true&w=majority");

// app.get('/', (req, res) => { 
//   res.send('Hello Express World!!!')
// })

app.use("/api/v1", restRouter); ///api/v1开头的都交给restRouter处理

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

