const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

app.get('/', (req,res) => {
    res.send('Esta es la pagina de inicio =)')
})

app.get('/login', (req,res) => {
    res.send('Hola soy la pagina de login')
})

app.get('*', (req,res) => {
    const responseStatus = 404;
    res.status(responseStatus).send(`<h1 style="color:red;"> La pagina que busca no existe (${responseStatus}) </h1>`)
})

const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log(error.message);
});