function getWebSocketServer() {
    if (window.location.host === "memory-in-pairs.herokuapp.com") {
        return "wss://memory-in-pairs-ws.herokuapp.com/";
    } else if (window.location.host === "localhost:5000") {
        return "ws://localhost:5678/";
    } else {
        throw new Error(`Unsupported host: ${window.location.host}`);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    console.log(getWebSocketServer())
    const socket = new WebSocket(getWebSocketServer());
    const userId = document.querySelector("#userId").value
    const userName = document.querySelector("#userName").value
    const userEmail = document.querySelector("#userEmail").value
    socket.onmessage = ({ data }) => {
        console.log(data)
        const event = JSON.parse(data);
        switch (event.type) {
            case "conected":
                socket.send(JSON.stringify({ action: "loadData", userId: userId, name: userName, email: userEmail }));
                break;
            case "responseData":
                const playerList = document.querySelector("#playerList")
                playerList.innerHTML = ""
                for (var i = 0; i < event.users.length; i++) {
                    var li = document.createElement('li');
                    li.innerHTML = `${event.users[i].name} - <span class="text-gray-500">${event.users[i].email}</span>`
                    playerList.appendChild(li);
                }
                break;
            default:
                console.error("unsupported event", event);
        }
    }
})
