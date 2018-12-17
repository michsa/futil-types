const _ = require('lodash/fp')

const p = (x) => console.log(x)
const bar = [6, 5, 4, 3, 2, 1]

_.filter.convert({cap: false})((e, i) => e > i)(bar)

var foo = ['a', 'b', 'a', 0, 1, 0, {foo: 'bar'}, {foo: 'baz'}, [100, 200], [100, 300]]


const repeated = _.flow(
  _.groupBy(e => e),
  _.filter(e => e.length > 1),
  _.flatten,
  _.uniq
)


foo = [1, 1, null, null, undefined, undefined]
p(_.groupBy(e => e)(foo))
p(repeated(foo))