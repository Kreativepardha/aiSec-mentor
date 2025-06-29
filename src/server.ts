import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import logger from './utils/logger';
import challengeRoutes from './routes/challenger.route'
import mentorRoutes from './routes/mentor.routes'


dotenv.config()

const app = express();
app.use(express.json())
app.use(morgan('dev'))


app.use('/api/mentor', mentorRoutes)
app.use('/api/challenges', challengeRoutes)

app.use((err: any, _req: any, res: any, _next: any) => {
    logger.error(err.stack)
    res.status(500).json({
        error: 'Something Went Wrong!'
    })
})

export default app;
