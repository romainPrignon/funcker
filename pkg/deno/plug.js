export const plug = (fn) => {
  const args = Deno.args.map(arg => JSON.parse(arg))

  return fn(...args)
    .then(res => console.log(JSON.stringify(res)))
    .catch((err) => {
      console.error(err)
      Deno.exit(1);
    })
}
