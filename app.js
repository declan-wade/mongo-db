// const express = require("express");
// const app = express();
// const port = 5555
// const server = app.listen(port, () => {
//  console.log(`Example app listening on port ${port}`)
// })
// app.use(express.static("./public"));

const express = require('express')
const app = express()

const PORT = 5555;

app.listen(PORT, () => {
  console.log(`http server listen on ${PORT}`);
});

app.get("/", (req, res) => {
    res.setHeader('content-type', 'text/html');
    res.sendFile('public/index.html' , { root : __dirname});
});
