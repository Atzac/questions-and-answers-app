const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/modules/database");
const AskModel = require("./database/models/Ask.model");
const AnswerModel = require("./database/models/Answer.model");

// Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão ON");
  })
  .catch((msgError) => {
    console.log("Erro ao conectar-se ao banco: " + msgError);
  });

// Using EJS as View Engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res) => {
  AskModel.findAll({ raw: true, order: [["createdAt", "DESC"]] }).then(
    (asks) => {
      res.render("index", {
        asks: asks,
      });
    }
  );
});

app.get("/ask", (req, res) => {
  res.render("ask");
});

app.post("/saveQuestion", (req, res) => {
  const title = req.body.titulo;
  const description = req.body.descricao;

  AskModel.create({
    title: title,
    description: description,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/ask/:id", (req, res) => {
  const id = req.params.id;

  AskModel.findOne({
    where: { id: id },
    order: [["id", "DESC"]],
  }).then((ask) => {
    if (ask !== null) {
      AnswerModel.findAll({
        where: { askId: ask.id },
      }).then((answers) => {
        res.render("askView", {
          ask: ask,
          answers: answers,
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/saveAnswer", (req, res) => {
  const body = req.body.body;
  const askId = req.body.answer;

  console.log(body, askId);

  AnswerModel.create({
    body: body,
    askId: askId,
  }).then(() => {
    res.redirect("/ask/" + askId);
  });
});

// Execução
app.listen(8080, () => {
  console.log("Q&A running");
});
