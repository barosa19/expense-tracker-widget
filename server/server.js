const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const port = 3002

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server initiated!')
})

const expenseRouter = require("./routes/expense")
app.use("/expense", expenseRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})