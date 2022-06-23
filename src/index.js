import express from 'express'
import conn  from'./database.js'
import morgan from 'morgan'
import cors from 'cors'


conn()

import { createRoles } from './libs/initialSetup' 

//Routes
import productRouter from './routes/product.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

const app = express()

createRoles()

app.set('port', process.env.PORT || 3001)
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/product', productRouter)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)

app.use('/', (req, res) => {
    res.send('Welcome to the server')
})

app.listen(app.get('port'), () => {
    console.log(`Server listen in port ${app.get('port')}`)
})