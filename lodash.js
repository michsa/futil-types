const _ = require('lodash/fp')
const F = require('futil-js')
const util = require('util')

const p = (x) => console.log(util.inspect(x, false, null, true))
const bar = [6, 5, 4, 3, 2, 1]

_.filter.convert({cap: false})((e, i) => e > i)(bar)

const myConverge = (converger, branches) => (...args) =>
  converger(_.over(branches)(...args))

const myOver = (branches) => (...args) =>
  _.over(branches)(...args)

p(myOver([Math.max, Math.min])(1, 2, 3, 4))

const sum = ([a, b]) => a + b

p(myConverge(sum, [Math.max, Math.min])(1, 2, 3, 4))

p(F.zipObjectDeepWith(['a', 'b', 'c'], (x) => `${x}`))

const t = (a, b) => `${a} ${b}`

p(_.times(t)(2))



// const zod2 = (arr, f) => arr.reduce()

const strangeConcat = F.converge(_.join(' '), [_.toLower, _.toUpper])
// p(strangeConcat('Yodel'))

p(_.zipObjectDeep([{a: 1}, 2, 3], ['a', 'b', 'c']))

p(F.zipObjectDeepWith(['a.b[0].c', 'a.b[1].d'], [1, 2]))
p(F.zipObjectDeepWith(['a.b[0].c', 'a.b[1].d'], (x) => [x, x + 1]))
const zodExample = F.zipObjectDeepWith(['a.b[0].c', 'a.b[1].d'])
p(zodExample((x) => [x, x + 1]))

p(F.zipObjectDeepWith(['a', 'b'], () => 1))
p(F.zipObjectDeepWith(['a', 'b'], 1))
p(F.zipObjectDeepWith(['a', 'b'], [1, 1]))