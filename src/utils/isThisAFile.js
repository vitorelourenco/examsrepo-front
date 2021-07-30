export default function isThisAFile(maybeFile) {
  return new Promise(function (resolve, reject) {
    if (maybeFile.type !== '') {
      return resolve(maybeFile)
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      if (reader.error && reader.error.name === 'NotFoundError') {
        return reject(reader.error.name)
      }
      resolve(maybeFile)
    }
    reader.readAsBinaryString(maybeFile)
  })
}
