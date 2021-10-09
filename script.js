const { Console } = require('console')
const fs = require ('fs')

class Contenedor {
    constructor (nombreDelArchivo){
        this.ruta = nombreDelArchivo
    }

    getAll = async() => {
        try {
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8')
            return JSON.parse(contenido)
        }
        catch (error) {
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8')
            return JSON.parse(contenido)
        }
    }

    save = async nuevoObjeto =>{
        const llamadoBase = await this.getAll()
        llamadoBase.push(nuevoObjeto)
        if ( (nuevoObjeto).id === undefined){   //si no envío el argumento de id, generará un id automático.
            let arrayDeIds = [] //defino un array para guardar las ids de mis objetos.
            const extraerIds = llamadoBase.forEach(elemento => arrayDeIds.push(elemento.id)) //recorro mi base de datos, extraigo los IDs almacenados y los pusheo al array que cree.
            arrayDeIds.sort() //ordeno de menor a mayor mi array.
            let ultimoId = arrayDeIds.length //me permitirá saber que número de id exacto le corresponde a mi siguiente pusheo.
            nuevoObjeto.id = ultimoId //fuerzo a que el ID que no se paso por argumento, sea igual al número de largo de este array.
        }
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(llamadoBase, null, 2))
            return nuevoObjeto.id
        } catch (error) {
            throw new Error ("Hubo un inconveniente al guardar el objeto")
        }
    }

    getById = async idABuscar => {
        const llamadoBase = await this.getAll()
        const consultarPorId = llamadoBase.find(o => o.id === idABuscar)
        return consultarPorId
    }

    deleteById = async idABuscar => {
        const llamadoBase = await this.getAll()
        let consultarPorId = llamadoBase.find(o => o.id === idABuscar)
        const indexDelElementoABorrar = llamadoBase.indexOf(consultarPorId)
        return llamadoBase.splice(indexDelElementoABorrar, 1)
    }

    deleteAll = async () => {
        return await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
    }
}

const db = new Contenedor('baseDePrueba')
const prueba = async () => {
    console.log(await db.save ( {id: 1, producto: "zapato"})) // si se agrega un nuevo objeto sin definir el "ID", recibirá por defecto 2; el siguiente 3; el siguiente 4, y así susesivamente, siempre y cuando "baseDePrueba" sea un array limpio.
}
prueba()