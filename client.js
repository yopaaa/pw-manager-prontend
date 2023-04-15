const express = require('express');

const path = require('path');
const app = express();
const port = process.env.PORT

app.use(express.static(path.join(__dirname, 'build')));

app.all('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, "localhost", ()=>{
 console.log("server is runing on http://localhost:port")
});
