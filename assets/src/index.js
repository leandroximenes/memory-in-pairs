import { getURL, getParameters } from './components/util.js';

const { userId, userName, userEmail } = getParameters()
window.URL = getURL()
console.log(window.URL)
window.userId = userId
window.userName = userName
window.userEmail = userEmail

const socket = new WebSocket(URL);

socket.onopen = (event) => {
    socket.send(JSON.stringify({ action: "registerPlayer", userId: userId, name: userName, email: userEmail }));
};

window.socket = socket