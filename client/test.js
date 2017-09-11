var wsUri;
var chatWindow;
var websocket;

function init() {
    initVariable();
    initWebSocket();
}

function initVariable() {
    wsUri ="ws://192.168.0.180:9502/";
    chatWindow = document.getElementById("chat_window");
}

function initWebSocket() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
        onOpen(evt)
    };
    websocket.onclose = function(evt) {
        onClose(evt)
    };
    websocket.onmessage = function(evt) {
        onMessage(evt)
    };
    websocket.onerror = function(evt) {
        onError(evt)
    };
}

function onOpen(evt) {
    writeToScreen("CONNECTED");
}

function onClose(evt) {
    writeToScreen("DISCONNECTED");
}

function onMessage(evt) {
    var data =  JSON.parse(evt.data);
    console.log(data);
    var content = '<span style="color: blue;">'+ data.fd + ':&nbsp;&nbsp;' + data.data +'</span>';
    writeToScreen(content);
}

function onError(evt) {
    var content = '<span style="color: red;">ERROR:</span> '+ evt.data;
    writeToScreen(content);
}

function writeToScreen(message) {
    var pre = document.createElement("p");
    pre.innerHTML = message;
    chatWindow.appendChild(pre);
}

function sendMessage() {
    message = document.getElementById("input_msg").value;
    if (message) {
        document.getElementById("input_msg").value = '';
        // writeToScreen("SENT: " + message);
        websocket.send(message);
    }
}

window.addEventListener("load", init, false);
window.addEventListener("unload", onClose);
