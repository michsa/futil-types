const _ = require('lodash/fp')
const F = require('futil-js')

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

p('maybe call')
const fun = (x, y) => x + y
const notFun = {a: 1, b: 2} 
p(F.maybeCall(fun, 1, 2)) //=> 3
p(F.maybeCall(fun, 'abc')) //=> 'abc' + null, should type error
p(F.maybeCall(notFun, 1, 2)) //=> false, args irrelevant
const maybeCallAdd = F.maybeCall(fun)
p(maybeCallAdd(4, 5)) //=> 9
