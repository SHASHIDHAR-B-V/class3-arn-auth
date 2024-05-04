import http from 'http';
import app from './app.js';

let server=http.createServer(app)

server.listen(8000,()=>{
    console.log('server is running on the port 8000');
})
