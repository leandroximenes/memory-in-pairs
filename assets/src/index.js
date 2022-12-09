import { getURL, getParameters } from './components/util.js';

window.addEventListener("DOMContentLoaded", () => {
    const { userId, userName, userEmail } = getParameters()
    window.URL = getURL()
    window.userId = userId
    window.userName = userName
    window.userEmail = userEmail

    const socket = new WebSocket(URL);
    socket.onmessage = ({ data }) => {
        const event = JSON.parse(data);
        switch (event.type) {
            case "conected":
                socket.send(JSON.stringify({ action: "registerPlayer", userId: userId, name: userName, email: userEmail }));
                console.log("Player registered");
                break;
            default:
                console.error("unsupported event", event);
        }
    }
    window.socket = socket
})