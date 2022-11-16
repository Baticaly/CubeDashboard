# Mosaic Dashboard

## **Websocket Proxy**

Start websocket proxy with;
```bash
npm start
```
---
### **Client**
  To receive any update, start the socket with;
```javascript
socket.emit("set-client");
```

  Any updates will be provided with the "update" tag
```javascript
socket.on("update", function (msg) {
      var item = document.createElement("li");
      item.textContent = msg;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
})
```
---
### **Provider**
To provide updates, start the socket with;
```javascript
socket.emit("set-provider");
```

Example payload;
```javascript
socket.emit("payload", { data });
```