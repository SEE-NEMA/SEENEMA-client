const express = require("express");
const app = express();
const cors = require("cors");
const Main = require("./Main");

app.use("api", Main);
app.get("/", (req, res) => {
    res.send("server open");
});

const port = 8080;
app.listen(port, () => {
    console.log('Listening on port ${port}');
});