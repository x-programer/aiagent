
import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

//connect to database...
connect();

//middle wares..
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/users' , userRoutes);

// dummy route..
app.get('/' , (req,res)=>{
    res.send('Hello world !');
})

export default app;

// if we want log whenever routes hit so we will use morgan packeges
// npm install morgan