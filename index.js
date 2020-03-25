let express = require('express');
let port = 2000;
let app = express()
let cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())

let { mongoRouter, mysql, user, admin, cart } = require('./routers')

app.use('/mongo', mongoRouter)
app.use("/data", mysql, user, cart)
app.use("/admin", admin)

app.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>`)
})

app.listen(port, () => console.log(port))