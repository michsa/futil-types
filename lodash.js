const _ = require('lodash/fp')
const F = require('futil-js')
const util = require('util')
const p = (x) => console.log(util.inspect(x, false, null, true))


const a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const s = 'abcdefg'

const chunkPrint = (a, b) => {
  p(`a: ${a}, b: ${b}`)
  return a.indexOf(b) % 3 === 0
}
const chunked = F.chunkBy(chunkPrint, s)

p(chunked)