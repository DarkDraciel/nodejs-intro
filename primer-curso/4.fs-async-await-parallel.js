// Esto solo en los modulos que no tienen promesas nativas
// const  { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

import { readFile } from 'node:fs/promises'

console.log('-------- Primer opción -----------')
// Opcion 1
console.log('Leyendo el primer archivo')
readFile('./archivo.txt', 'utf-8').then(text => {
  console.log('primer texto:', text)
})

console.log('Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo')
readFile('./archivo2.txt', 'utf-8').then(text => {
  console.log('segundo texto:', text)
})

// Opcion 2
Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('-------- Segunda opción -----------')
  console.log('primer texto:', text)
  console.log('segundo texto:', secondText)
})
