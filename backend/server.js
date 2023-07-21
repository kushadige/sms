import express from "express";
import cors from "cors"
import { WebSocketServer, WebSocket} from "ws"

const app = express()
app.use(cors())
app.use(express.json())

const server = new WebSocketServer({ port: 3000 });

server.on("connection", (socket) => {
    socket.on("message", (data) => {
        const packet = JSON.parse(data);
        console.log(packet)
        switch (packet.type) {
            case "bot-show":
                broadcast(packet)
                break;
        }
    });
});

const broadcast = (data) => {
    server.clients.forEach(client => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data))
        }
    })
}

app.get("/", (req, res) => {
    res.send("hi")
})

app.get("/:id", (req, res) => {
    res.send(req.params.id)
})

app.put("/:id", (req, res) => {
    res.send(req.params.id)
})

app.post("/", async (req, res) => {
    if(req.body) {
        try {
            const data = await fetch("http://localhost:5000/api/epos-show-contract", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req.body)
            })
            const json = await data.json()
            res.sendStatus(json.status)
        } catch(err) {
            res.status(400).json({code: err.cause.code, address: `${err.cause.errors[1].address}:${err.cause.errors[1].port}`, message: err.message})
        }
    }
})

app.listen(5001, () => {
    console.log("Server is running on port 5001.")
})