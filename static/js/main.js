(()=>{"use strict";const{userId:e,userName:o,userEmail:r}={userId:document.querySelector("#userId").value,userName:document.querySelector("#userName").value,userEmail:document.querySelector("#userEmail").value};window.URL=(()=>{if("memory-in-pairs.herokuapp.com"===window.location.host)return"ws://memory-in-pairs-ws.herokuapp.com/";if("localhost:5000"===window.location.host)return"ws://localhost:5678/";throw new Error(`Unsupported host: ${window.location.host}`)})(),window.userId=e,window.userName=o,window.userEmail=r;const s=new WebSocket(URL);s.onopen=n=>{s.send(JSON.stringify({action:"registerPlayer",userId:e,name:o,email:r}))},window.socket=s})();