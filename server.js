const express = require("express");

const app = express();
const port = 2989;

app.all("/", (req, res) => {
    res.send("Bot state : Online");
});

function KeepAlive() {
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
}

function SendMessage(msg) {
    // TODO
}

module.exports = { KeepAlive, SendMessage };