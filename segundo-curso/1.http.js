const http = require('node:http') // protocolo http
const fs = require('node:fs') // sistema de archivos

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
//   console.log('Request received', req.url)
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  if (req.url === '/') {
    res.end('Hola mundo desde Node.js página principal\n')
  } else if (req.url === '/imagen-bonita.png') {
    fs.readFile('./segundo-curso/cheems.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('Error interno del servidor\n', err)
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/about') {
    res.end('Acerca de\n')
  } else {
    res.statusCode = 404
    res.end('Página no encontrada\n')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
