import express from "express";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT || 3000;
const publicPath = fileURLToPath(new URL("./public", import.meta.url));
let requestsServed = 0;

const courses = [
    {
        id: 1,
        title: "Programming Fundamentals",
        credits: 5
    },
    {
        id: 2,
        title: "Data Structures",
        credits: 6
    },
    {
        id: 3,
        title: "Web Programming",
        credits: 4
    }
];

function requestLogger(req, res, next) {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
}

function requestCounter(req, res, next) {
    requestsServed++;
    next();
}

app.use(requestLogger);
app.use(requestCounter);
app.use(express.static(publicPath));

app.get("/hello", (req, res) => {
    res.send("Hello from Reyhaneh's server!");
});

app.get("/robots.txt", (req, res) => {
    res.set("Content-Type", "text/plain");
    res.send("User-agent: *\nDisallow:");
});

app.get("/old-page", (req, res) => {
    res.redirect("/hello");
});

app.get("/api/courses", (req, res) => {
    res.json(courses);
});

app.get("/api/status", (req, res) => {
    res.json({
        status: "running",
        nodeVersion: process.version,
        uptimeSeconds: process.uptime()
    });
});

app.get("/api/headers", (req, res) => {
    res.json({
        userAgent: req.get("User-Agent"),
        accept: req.get("Accept")
    });
});

app.post("/api/subscribe", (req, res) => {
    res.status(201).json({
        subscribed: true
    });
});

app.get("/api/admin", (req, res) => {
    res.status(403).json({
        error: "Forbidden"
    });
});

app.get("/api/stats", (req, res) => {
    res.json({
        requestsServed: requestsServed
    });
});

app.use((req, res) => {
    if (req.path.startsWith("/api")) {
        return res.status(404).json({
            error: "Not found"
        });
    }

    res.status(404).send("Page not found");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});