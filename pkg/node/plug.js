const plug = (fn) => {
  const argv = process.argv.slice(2)
  const args = argv.map(arg => JSON.parse(arg))

  return fn(...args)
    .then(res => console.log(JSON.stringify(res)))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}

module.exports = {
  plug
}
