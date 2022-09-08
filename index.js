const fs = require('fs');

class Contenedor {
    constructor (name) {
        this.name = name;
    }

    async save(informacion) {
        try {
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            let ultimoIndice = contenidoJson.length - 1;
            let ultimoId = contenidoJson[ultimoIndice].id;
            informacion.id = ++ultimoId;
            let id = informacion.id
            contenidoJson.push(informacion);
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidoJson));
            return id;

        }
        catch(error) {
            console.log(error.message)
        }
    }

    async getById(id) {
        try {
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            let contenidoExtraido;
            contenidoJson.forEach( ell => {
                if(ell.id == id) {
                    contenidoExtraido = ell;
                }
            });
            
            return contenidoExtraido;
        }
        catch(error) {
            console.log(error.message);
        }
    }

    async getAll() {
        try {
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            return contenido
        }
        catch(error) {
            console.log(error.message);
        }
    }

    async deleteById(id) {
        try {
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            let indice = --id
            contenidoJson.splice(indice,1);
            contenidoJson.forEach(el => {
                if(el.id > id) {
                    el.id--;
                }
            })
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidoJson));
        }
        catch(error) {
            console.log(error.message);
        }
    }

    async deleteAll() {
        try {
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            contenidoJson.splice(0,contenidoJson.length);
            console.log(contenidoJson);
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidoJson));
        }
        catch(error) {
            console.log(error.message);
        }
    }

}

let contenedor = new Contenedor('productos.json');

let infoNueva = {
    id : 1, 
    title: "goma",
    price: 10
}

contenedor.getById(2).then(res => {
    console.log(res);
})

contenedor.getAll().then(res => {
    console.log(res);
})

contenedor.deleteById(1);

contenedor.deleteAll();

contenedor.save(infoNueva).then( res => {
    console.log(res);
});