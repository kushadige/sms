import { useEffect, useState } from "react";
import Form from "./components/Form"
import "./styles/app.scss"

const renderSwitch = (botStatus) => {
    switch(botStatus) {
        case 1:
            return 'sms gonderiliyor bekleyin';
        case 2:
            return "sms gonderildi sms'i gir"
        case 3:
            return "hata"
    }
}

const App = () => {
    const [botStatus, setBotStatus] = useState(null)
    
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3000");
        socket.addEventListener("message", ({ data }) => {
            const packet = JSON.parse(data);
            switch (packet.type) {
                case "bot-show":
                    setBotStatus(packet.status)
                    break;
            }
        });
        return () => {
            socket.close()
        }
    }, [])

    return (
        <>
            <div className="container">
                <Form botStatus={botStatus} />
            </div>
            {botStatus && (
                <div className="spinner">
                    {renderSwitch(botStatus)}
                    {botStatus === 1 ? (
                        <div className="dots">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    ) : botStatus === 2 ? (
                        <div className="sms_box">
                            <i className="fa-solid fa-comment-sms"></i>
                        </div>
                    ) : (<></>)}
                </div>
            )}
        </>
    )
}

export default App