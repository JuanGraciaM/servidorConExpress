//------------------------------------------------Server, get y random element from array

const express = require ('express')

const Contenedor = require('./contenedor')

const PORT = process.env.PORT || 8080;

const app = express()

const contenedor = new Contenedor('./productos.txt')

const server = app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + PORT)
})

app.get('/', (req,res) => {
    res.send('Esta es la pagina principal')
})

app.get('/productos', async (req,res) =>{
    contenedor.getAll().then(resp => 
        res.send(resp)
    )
})

app.get('/productoRandom', async (req,res) =>{
    let total;
    let prodRandom
    contenedor.getAll().then(r => {
        total = r.length
        prodRandom = Math.floor(Math.random() * total + 1)
        contenedor.getById(prodRandom).then( prod =>{
            res.send(prod)
        })
    })
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