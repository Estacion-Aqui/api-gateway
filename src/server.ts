import app from './app';

app.listen(process.env.PORT || 5010, ()=> {
    console.log('API Gateway running in port 5010!');
});
