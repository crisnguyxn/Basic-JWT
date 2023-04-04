const express = require('express')
const router = require('./src/routes/main')
const handleErrorMiddleware = require('./src/middlewares/handle-error')
const app = express()

app.use(express.json())

app.use('/api/v1',router)
app.use(handleErrorMiddleware)

const port = 3000
app.listen(port,console.log(`server listening on port ${port}`))