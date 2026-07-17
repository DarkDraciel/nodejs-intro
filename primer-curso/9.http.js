const http = require('node:http')
const { findAvailablePort } = require('./10.free-port.js')

console.log(process.env)

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('request recieved')
  res.end('HOLA MUNDO')
})

// Una forma de asignar puerto disponible
// server.listen(0, () => {
//   console.log(`server listening on port http://localhost:${server.address().port}`)
// })

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})
