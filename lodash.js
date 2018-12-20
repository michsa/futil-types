const _ = require('lodash/fp')
const F = require('futil-js')

const p = (x) => console.log(x)
const bar = [6, 5, 4, 3, 2, 1]

_.filter.convert({cap: false})((e, i) => e > i)(bar)

const myConverge = (converger, branches) => (...args) =>
  converger(_.over(branches)(...args))

const myOver = (branches) => (...args) =>
  _.over(branches)(...args)

p(myOver([Math.max, Math.min])(1, 2, 3, 4))

const sum = ([a, b]) => a + b

p(myConverge(sum, [Math.max, Math.min])(1, 2, 3, 4))



const strangeConcat = F.converge(_.join(' '), [_.toLower, _.toUpper])
p(strangeConcat('Yodel'))