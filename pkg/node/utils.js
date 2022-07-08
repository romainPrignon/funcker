// function makeEnv() {
//   return _.reduce(process.env, (acc, val, key) => {
//     acc.push(`${key}=${val}`)
//     return acc
//   }, [])
// }

const streamToString = (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
        stream.on('error', (err) => reject(err))
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    })
}

module.exports = {
    streamToString
}