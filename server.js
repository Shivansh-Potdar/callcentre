const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

console.log(`Started websocket server on port 8080`);

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${JSON.parse(message).name}`);
        const res ={
            name: JSON.parse(message).name,
            text: JSON.parse(message).text
        }
        ws.send(JSON.stringify(res));
    });
})