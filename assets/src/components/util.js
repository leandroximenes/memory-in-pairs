const getURL = () => {
    if (window.location.host === "memory-in-pairs.herokuapp.com") {
        return "wss://memory-in-pairs-ws.herokuapp.com/";
    } else if (window.location.host === "localhost:5000") {
        return "ws://localhost:5678/";
    } else {
        throw new Error(`Unsupported host: ${window.location.host}`);
    }
}

const getParameters = () => {
    const userId = document.querySelector("#userId").value
    const userName = document.querySelector("#userName").value
    const userEmail = document.querySelector("#userEmail").value
    return {userId, userName, userEmail}
}

export {getURL, getParameters}