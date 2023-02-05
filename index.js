const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/modules/database');
const AskModel = require('./database/models/Ask.model');

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão ON")
    })
    .catch((msgError) => {
        console.log("Erro ao conectar-se ao banco: " + msgError)
    })

// Using EJS as View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.get('/', (req, res) => {
    AskModel.findAll({ raw: true }).then((asks) => {
        console.log(asks)
        res.render('index', {
            asks: asks
        });
    }); 
});

app.get('/ask', (req, res) => { 
    res.render('ask');
});

app.post('/saveQuestion', (req, res) => { 
    var title = req.body.titulo;
    var description = req.body.descricao;
    AskModel.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect('/')
    });
});

// Execução
app.listen(8080, () => {
    console.log('Q&A running');
});