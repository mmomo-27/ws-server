import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 9000 }) ;

const interval = setInterval(() => {
    wss.clients.forEach((client) => {
        if (client.isAlive === false){
            return client.terminate();
        }
        client.isAlive = false;
        client.ping();
    });
}, 25000);
 

wss.on('connection', (ws) => {
    console.log("New client connected");
    ws.isAlive = true ;
    ws.on('pong', () =>{ 
        ws.isAlive = true; 
    });
    ws.on('message', (message) => {
        console.log(`Message received : ${message}`);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === 1) {
                client.send(message.toString()) ;
            }
        }) ;
    }) ;
}) ;

wss.on('close', () => {
    clearInterval(interval);
});
 
console.log("listening on ws://localhost:9000") ;
