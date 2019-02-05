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

const heroes = ["Hercules", "Perseus", "Achilles", "Odysseus", "Jason"]

// p(F.findIndexed(x, i, xs => false)(heroes))

var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];

p(F.findIndexed((o, i) => o.age < i, users))
// => object for 'barney'

// The `_.matches` iteratee shorthand.
p(F.findIndexed({ 'age': 1, 'active': true }, users))
// => object for 'pebbles'

// The `_.matchesProperty` iteratee shorthand.
p(F.findIndexed(['active', false], users))
// => object for 'fred'

// The `_.property` iteratee shorthand.
p(F.findIndexed('active', users))
// => object for 'barney'