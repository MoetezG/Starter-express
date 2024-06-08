const express = require("express");
const app = express();

app.use(express.json());

let users = [];

app.get("/", (req, res) => {
  res.send("welcome");
});
app.get("/users", (req, res) => {
  if (users.length < 1) {
    res.status(400).send("not found");
    return;
  } else res.status(200).send(users);
});
app.post("/users", (req, res) => {
  const user = req.body;
  const findUser = users.find((x) => x.id === user.id);
  if (findUser) {
    res.status(404).send("user already exist");
    return;
  }
  users.push(user);
  res.status(201).send("Created!");
});
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const findUserId = users.findIndex((x) => x.id === id);

  if (findUserId === -1) {
    res.status(400).send("user not found");
    return;
  }
  users.splice(findUserId, 1);
  res.status(200).send("user delited");
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});
