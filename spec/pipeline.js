const { Funcker } = require("../pkg/node")

const increment = new Funcker("funcker", "increment");

async function* range(from, to) {
  let i = from;
  while (i <= to) {
    yield i
    i++
  }
}

async function toArray(iter) {
  const arr = []
  for await (const val of iter) {
    arr.push(val)
  }

  return arr
}


function pipe(...functions) {
  return (input) => functions.reduce((acc, fn) => fn(acc), input);
}

const map = (fun) => {
  return async function* (values) {
    for await (const val of values) {
      yield fun(val)
    }
  }
}

// const filter = (fun: (val) => boolean) => {
//   return async function* (values) {
//     for await (const val of values) {
//       if (fun(val)) {
//         yield val
//       }
//     }
//   }
// }

// ---

// const increment = (i) => i + 1


const isPositive = (i) =>
  i < 0 ? false : true

const log = (val) => console.log(val)

const main = async () => {
  //todo; range from numpy
  const source = range(-100_000, 100_000)

  const program = pipe(
    // filter(isPositive),
    map((e) => increment.run(e)),
  )

  const res = await toArray(program(source))
  res.forEach(e => console.log(e))
}

main()
