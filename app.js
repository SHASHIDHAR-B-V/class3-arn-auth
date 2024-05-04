import express from 'express';
import db from './config/db.js';
import userRouter from './routes/userRouter.js';
import profileRouter from './routes/profileRouter.js';

let app = express();
db()

//to parse it we use json.parse
app.use(express.json());

app.set('view engine', 'ejs');
//server static files
app.use(express.static('Public'))

app.use(express.urlencoded({extended: true}))

app.use('/api/v1/users', userRouter)
app.use('/api/v1/profile', profileRouter)

export default app;