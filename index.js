const express = require('express');
const app = express();

// Using EJS as View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => { 
    res.render('index');
});

app.get('/perguntar', (req, res) => { 
    res.render('perguntar');
});


app.listen(8080, () => {
    console.log('Q$A running');
});