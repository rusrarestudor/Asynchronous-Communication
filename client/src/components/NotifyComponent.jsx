
import React, { useState } from 'react';
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'https://a2raresback.herokuapp.com/ws-message';

const NotifyComponent = () => {
    const [messages, setMessage] = useState([]);

    let onConnected = () => {
        console.log("Connected!!")
    }

    let onMessageReceived = (msg) => {
        console.log("NOTIFACTION: ", msg)
        setMessage([...messages, msg.message]);
    }

    let showMessages = (msgs) => {
        msgs.forEach(
            msg => <br><div>{msg}</div></br>
        )
        return msgs;
    }

    return(
        <div>
            <div>
                <SockJsClient
                    url={SOCKET_URL}
                    topics={['/topic/message']}
                    onConnect={onConnected}
                    onDisconnect={console.log("Disconnected!")}
                    onMessage={msg => onMessageReceived(msg)}
                    debug={false}
                />
            </div>
            <div>
                <h2>Notifications</h2>
                <br></br>
                {showMessages(messages)}
            </div>
        </div>
    );
}

export default NotifyComponent;