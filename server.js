const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3500;
const logEvents = require('./logEvents')

const app = express();

// handle urlencoded data in other word form-data
// content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// built-in json middleware
app.use(express.json());

// serve static files (css, img, etc.)
app.use(express.static(path.join(__dirname, "/public")));

// Custom middleware
app.use((req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqlog.txt')
    console.log(`${req.method} ${req.path}`);
    next();
});

app.get("/", (req, res) => {
    // res.sendFile("./views/index.html", { root: __dirname });
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
