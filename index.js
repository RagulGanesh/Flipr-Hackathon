const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')
const path=require('path')


connectToMongo();
const app = express()
const port = 5000

//Middleware
app.use(express.json())
app.use(cors())
app.use('/public',express.static(path.join(__dirname,'public')))

//Available Routes
app.use("/api/user", require('./routes/User'))
app.use("/api/auth",require('./routes/auth'))
app.use("/api/v1/media",require('./routes/media'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
