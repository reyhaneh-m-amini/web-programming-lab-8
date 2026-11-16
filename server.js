import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

let requestsServed = 0;

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

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
