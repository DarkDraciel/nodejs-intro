const http = require('node:http')

// CommonJs -> Modulos
const dittoJson = require('./pokemon/ditto.json') // importando un archivo JSON

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJson))
        default:
          res.statusCode = 404
          res.end('404 Página no encontrada\n')
      }
      break
    case 'POST':
      switch (url) {
        case '/pokemon':
          {
            let body = ''

            // escuchar el envento 'data' para recibir los datos del cuerpo de la solicitud
            req.on('data', chunk => {
              body += chunk.toString()
            })

            req.on('end', () => {
              const pokemon = JSON.parse(body)
              // enviar una respuesta con el código de estado 201 (Created) y el objeto Pokémon en formato JSON
              res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
              pokemon.timestamp = Date.now()
              res.end(JSON.stringify(pokemon))
            })
          }
          break
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end('404 Página no encontrada\n')
      }
      break
  }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log('Server listening on port http://localhost:1234')
})
