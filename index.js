// Calling the packages that we need

const express = require("express");
const app = express();
const port = 5000;
const bp = require("body-parser");
const qr = require("qrcode");

// Using the ejs (Embedded JavaScript templates) as our template engine
// and call the body parser  - middleware for parsing bodies from URL
//                           - middleware for parsing json objects

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

// Simple routing to the index.ejs file
app.get("/", (req, res) => {
    res.render("index");
});

// Blank input
// Incase of blank in the index.ejs file, return error 
// Error  - Empty Data!
app.post("/scan", (req, res) => {
    const url = req.body.url;

    if (url.length === 0) res.send("Empty Data!");
    qr.toDataURL(url, (err, src) => {
        if (err) res.send("Error occured");

        res.render("scan", { src });
    });
});

// Setting up the port for listening requests
app.listen(port, () => console.log("Server at 5000"));