const express = require("express");
const cors = require("cors");

const PORT = 3000;
const app = express();
const ENDPOINT = "/api/v1/name";
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const nameList = [
  {
    name: "wisarut",
  },
  {
    name: "JeyZ9",
  },
];

app.get(`${ENDPOINT}/hello`, (req, res) => {
  const { name } = req.query;
  return res.send(`Hello! ${name}`);
});

app.get(`${ENDPOINT}/getAll`, (req, res) => {
  // const { name } = req.query;
  return res.send(nameList);
});

app.post(`${ENDPOINT}`, (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({
      message: "Name is require!",
    });
  }
  const data = {
    name: name,
  };

  nameList.push(data);

  res.status(201).send(data);
});

app.get(`${ENDPOINT}/search`, (req, res) => {
  const { name } = req.query;

  const user = nameList.filter(
    (nameList) => nameList?.name.toLowerCase() === name.toLowerCase()
  );

  if (user.length == 0) {
    return res.status(400).send({
      message: "ไม่พบชื่อผู้ใช้นี้!",
    });
  }

  return res.send(
    nameList.filter(
      (nameList) => nameList.name.toLowerCase() === name.toLowerCase()
    )
  );
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
