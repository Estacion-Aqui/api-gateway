import express from 'express'
import logger from 'morgan'

const app = express();

app.use(logger('dev'));

app.listen(5010, () => {
    console.log('API Gateway running in port 5010!');
});
