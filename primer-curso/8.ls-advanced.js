const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

console.log(folder)

// fs.readdir('.', (err, files) => {
//     if (err){
//         console.error('Error al leer el directorio', err)
//         return;
//     }

//     files.forEach(file => {
//         console.log(file)
//     })
// })

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.error(pc.red(`No se puede leer el directorio: ${folder}`))
    process.exit(1)
  }

  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let stats

    try {
      stats = await fs.stat(filePath) // status - información del archivo
    } catch {
      console.error(pc.red(`No se puede leer el archivo: ${filePath}`))
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${pc.green(file)} ${pc.bgWhiteBright(fileSize.toString())} ${pc.blue(fileModified)}`
  })

  const fileInfo = await Promise.all(filesPromises)
  fileInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)
