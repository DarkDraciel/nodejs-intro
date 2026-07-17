const os = require('node:os') // a partir de la v16 de node, se recomienda poner node:

console.log('Información del sistema operativo:')
console.log('-----------------------------')
console.log('Nombre del sistema operativo:', os.platform())
console.log('Versión del sistema operativo:', os.release())
console.log('Arquitectura', os.arch())
console.log('CPuS', os.cpus()) // vamos a poder escalar procesos en node
console.log('Memoria libre', os.freemem() / 1024 / 1024)
console.log('Memoria total', os.totalmem() / 1024 / 1024)
console.log('Uptime', os.uptime() / 60 / 60)
