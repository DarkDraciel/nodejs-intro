const express = require('express')
const dittoJson = require('./pokemon/ditto.json') // importando un archivo JSON

const app = express()
app.disable('x-powered-by') // deshabilitar la cabecera x-powered-by
app.use((req, res, next) => {
  // console.log('Middleware ejecutado para todas las rutas')
  // trackear la request a la base de datos
  // revisar si el usuario tiene cookies de sesión

  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()
  // solo pasan requests POST con headercontent-type application/json
  let body = ''

  // escuchar el envento 'data' para recibir los datos del cuerpo de la solicitud
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const pokemon = JSON.parse(body)
    pokemon.timestamp = Date.now()
    // mutar la request y meter la informaciónen en el req.body
    req.body = pokemon
    next() // pasar al siguiente middleware o ruta
  })
})

const PORT = process.env.PORT ?? 1234

app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJson)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

app.use((_req, res) => {
  res.status(404).send('<h1>404 Página no encontrada</h1>\n')
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
