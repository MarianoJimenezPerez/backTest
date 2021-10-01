class usuario {
    constructor (nombre, apellido, libros = [], mascotas = []){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
        
    }

    getFullName(){
        console.log(`${this.nombre} ${this.apellido}`)
    }
    addMascota(nuevaMascota){
        this.mascotas.push(nuevaMascota)
    }
    countMascotas(){
        let cantidad = this.mascotas.length
        return (
            cantidad
        )
    }
    addBook(nuevoLibro){
        this.libros.push(nuevoLibro)
    }
    getBookNames(){
        return this.libros.map(libro => libro.nombreLibro)
    }
}

const mariano = new usuario ('mariano','jimenez', [], []) //no defino libros ni mascotas porque por default ya es un array vacio
mariano.addBook({  //agrego un libro
    nombreLibro: 'Las locuras',
    autor: 'Yo'
})
mariano.addBook({  //agrego otro libro
    nombreLibro: 'Las locuras 2',
    autor: 'yo'
})
mariano.addMascota("firulais")  //agrego una mascota
mariano.addMascota("firulais2")  //agrego otra mascota

console.log(mariano.mascotas)

//Listo! Puedes ejecutar el metodo que sea.