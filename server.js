import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 9000 }) ;
 
wss.on('connection', (ws) => {
    console.log("New client connected");
    ws.on('message', (message) => {
        console.log(`Message received : ${message}`);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === 1) {
                client.send(message.toString()) ;
            }
        }) ;
    }) ;
}) ;
 
console.log("listening on ws://localhost:9000") ;
 