let express = require('express');
let port = 2000;
let app = express()
let cors = require('cors')

let { mongoRouter, mysql } = require('./routers')

app.use(cors())
app.use('/mongo', mongoRouter)
app.use("/data", mysql)

app.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>`)
})

app.listen(port, () => console.log(port))