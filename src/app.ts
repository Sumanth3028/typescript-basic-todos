import  Express  from "express"

import todosRoutes from './routes/todos'

import bodyParser from "body-parser"

const app=Express()


app.use(bodyParser.json())

app.use(todosRoutes)

app.listen(3000)