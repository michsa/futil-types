import * as F from 'futil-js'
import * as _ from 'lodash/fp'

const p = (x: any) => console.log(x)
const foo = ['a', 'b', 'a', 0, 'c', 0, {foo: 'bar'}, 1, {foo: 'bar'}]

p(F.dotJoin(foo))

const slashJoin = F.compactJoin('/')
slashJoin(foo)
// compactJoin should work both curried and not
p(F.compactJoin('//', foo))

// when we curry dotJoinWith, we generate a function that takes a
// collection. this collection's type signature should depend on the
// argument of the filterFunction we supplied to dotJoinWith.
const filterFn = (x: number | string) => x > 3
const dotJoinWithGt3 = F.dotJoinWith(filterFn)
p(dotJoinWithGt3([6, 5, 4, 3, 2, 1]))

// dotJoinWith should work for a string argument in place of
// an array, as _.filter does.
const dotJoinWithA = F.dotJoinWith((x: string) => x === 'a')
p(dotJoinWithA('abcdeasadagege'))

// 
p(F.repeated([1, null, undefined]))

const tildeJoin = F.compactJoin('~')
p(tildeJoin(foo))

// mergeRanges behaves somewhat unpredictably with null or empty ranges.
// those commented out are disallowed in the definition.
p(F.mergeRanges([[4, 5], [0, 3], [1, 4], [8, 11]]))   //=> [[0, 5], [8, 11]]
p(F.mergeRanges([[0, 4], [2, 5], [5, 6]]))            //=> [[0, 6]]
p(F.mergeRanges([[9, 10], [7, 9]]))                   //=> [[7, 10]]
p(F.mergeRanges([[5, 0], [9, 5]]))                    //=> [[5, 0], [9, 5]]
p(F.mergeRanges(undefined))                           //=> []
p(F.mergeRanges(null))                                //=> []
p(F.mergeRanges([]))                                  //=> []
// p(F.mergeRanges([[0, undefined], [undefined, 9]])) //=> [0, 9]
// p(F.mergeRanges([undefined, undefined]))           //=> [[undefined]]
// p(F.mergeRanges([null, null]))                     //=> [[null]]
// p(F.mergeRanges([[], []]))                         //=> [[]]
// const u_range = [undefined, undefined]
// p(F.mergeRanges([u_range, u_range]))               //=> [[undefined, undefined]]
// p(F.mergeRanges([[null, null], [null, null]]))     //=> [[null, undefined]]

p(F.push('x', foo))
p(F.push('x')(['a', 'b', 'c']))
