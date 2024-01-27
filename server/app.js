import { config } from 'dotenv'
config()
import express from 'express'
import cors from 'cors'
import cookie_parser from 'cookie-parser'
import morgan from 'morgan'
import userRoutes from './routes/UserRoutes.js'
import CourseRoutes from './routes/CourseRoute.js'
import miscRoutes from './routes/miselleneousRoute.js';
import file_upload from 'express-fileupload'
import paymentRoute from './routes/paymentRoutes.js'
const app = express()
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser())
app.use(morgan('dev'))
app.use('/ping', (req, res) => {
  res.send('hello world')
})
app.use(file_upload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/courses', CourseRoutes)
app.use('/api/v1',miscRoutes);
app.use('/api/v1/payments',paymentRoute)
app.all('*', (req, res) => {
  res.status(404).send("OOPS 404 Page not Found")
})
export default app;

