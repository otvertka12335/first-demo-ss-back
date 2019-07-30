import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './server/routes/UserRoutes';
import projectRoutes from './server/routes/ProjectRoutes';
import teamRoutes from './server/routes/TeamRoutes';

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

const port = process.env.PORT || 8000;


//Router Usages
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/teams', teamRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to this API.',
}));

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

export default app;
