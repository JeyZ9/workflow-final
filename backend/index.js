const express = require('express')
const cors = require('cors')

const PORT = 3000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.get("/api/hello", (req, res) => {
  const { name } = req.query;
  return res.send(`Hello! ${name}`);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});