import * as F from 'futil-js'
import * as _ from 'lodash/fp'

// utilities for pretty printing
// -----------------------------

const p = (x: any) => console.log(x)

const separator = (char: string) => (length: number) => (first: string, last?: string) => 
  `${first}${char.repeat(length)}${last ? last : first}`

const sepDash = separator('-')
const header = (name: string) => {
  const sep = sepDash(name.length + 2)
  p(`${sep('.')}\n| ${name} |\n${sep('\'')}`)
}

const pSeparator = () => p(sepEq(64)('\n'))

const sepEq = separator('=')
const bigHeader = (name: string) => {
  const sep = sepEq(62)
  const spaceSep = separator(' ')(62)('|')
  const prtName = _.pad(60, _.upperCase(name).split('').join('  '))
  p(`${sep('/', '\\')}\n${spaceSep}\n| ${prtName} |\n${spaceSep}\n${sep('\\', '/')}`)
}


/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
================================================================================

    ███████╗██╗   ██╗ ███╗   ██╗  ██████╗████████╗ ██╗  ██████╗  ███╗   ██╗
    ██╔════╝██║   ██║ ████╗  ██║ ██╔════╝╚══██╔══╝ ██║ ██╔═══██╗ ████╗  ██║
    █████╗  ██║   ██║ ██╔██╗ ██║ ██║        ██║    ██║ ██║   ██║ ██╔██╗ ██║
    ██╔══╝  ██║   ██║ ██║╚██╗██║ ██║        ██║    ██║ ██║   ██║ ██║╚██╗██║
    ██║     ╚██████╔╝ ██║ ╚████║ ╚██████╗   ██║    ██║ ╚██████╔╝ ██║ ╚████║
    ╚═╝      ╚═════╝  ╚═╝  ╚═══╝  ╚═════╝   ╚═╝    ╚═╝  ╚═════╝  ╚═╝  ╚═══╝

================================================================================
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
bigHeader('function')

header('maybeCall')
// ----------------

// note: maybeCall is NOT auto-curried (thankfully)
const fun = (x: string, y: number) => y < 10 ? x.repeat(y) : y
const fun0 = () => 5
const notFun = {a: 1, b: 2} 
p(F.maybeCall(fun, 'a', 2)) //=> 3
p(F.maybeCall(notFun, 1, 2)) //=> false, args irrelevant
p(F.maybeCall(fun0))
const funResultImplicit = F.maybeCall(fun, '@', 108)
const typedFunResult: string | number = funResultImplicit
p(typedFunResult)
const notFunResult: boolean = F.maybeCall(123)


header('callOrReturn')
// -------------------

p(F.callOrReturn(fun, 'five times the fun! ', 5))
const notFunAgain: typeof notFun = F.callOrReturn(notFun)
p(notFunAgain)


header('boundMethod')
// ------------------

let obj = {
  name: 'Wade Watts',
  greet(x: number) {
    return `Happy ${x}th birthday, ${this.name}!`
  },
  1(place: string) {
    return `Welcome to ${place}, ${this.name}!`
  }
}
p(obj.greet.call({ name: 'John Henry' }, 40))
const bound1 = F.boundMethod('greet', obj)
p(bound1(11)) // should error here if arguments missing or incorrect
p(obj[1].call({ name: 'futil-js' }, 'TypeScript'))
const bound2 = F.boundMethod(1, obj)
p(bound2('Yharnam'))


header('converge')
// ---------------

const strangeConcat = F.converge(_.join(''), [_.toLower, _.toUpper])
p(strangeConcat('Yodel'))

const sum = ([a, b]: number[]) => a + b
const sumOfMaxAndMin = F.converge(sum, [Math.max, Math.min])
p(sumOfMaxAndMin(1, 2, 3, 4))

const sayType = (x: string | number) => `'${x}' is a ${typeof x}`
const isGt5 = (x: number) => x > 5
const isNumber = (x: string | number) => typeof x === 'number'

const uppercaseIfTrue = ([s, b]: [string, boolean]) => b ? _.upperCase(s) : s

const shoutTypeIfNumber = F.converge(uppercaseIfTrue, [sayType, isNumber])
p(shoutTypeIfNumber('shhhh'))
p(shoutTypeIfNumber(8))
const shoutTypeIfGt5 = F.converge(uppercaseIfTrue, [sayType, isGt5])
// p(shoutTypeIfGt5('yep')) // should throw compile error
p(shoutTypeIfGt5(4))
p(shoutTypeIfGt5(8))

/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
================================================================================
 
                  █████╗  ██████╗  ██████╗   █████╗ ██╗   ██╗
                 ██╔══██╗ ██╔══██╗ ██╔══██╗ ██╔══██╗╚██╗ ██╔╝
                 ███████║ █████╔═╝ █████╔═╝ ███████║ ╚████╔╝ 
                 ██╔══██║ ██╔══██╗ ██╔══██╗ ██╔══██║  ╚██╔╝  
                 ██║  ██║ ██║  ██║ ██║  ██║ ██║  ██║   ██║   
                 ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝   ╚═╝   
 
================================================================================
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
bigHeader('array')

const foo = ['a', 'b', 'a', 0, 'c', 0, {foo: 'bar'}, 1, {foo: 'bar'}]

header('dotJoin')

p(F.dotJoin(foo))

header('compactJoin')

const slashJoin = F.compactJoin('/')
slashJoin(foo)
// compactJoin should work both curried and not
p(F.compactJoin('//', foo))
const tildeJoin = F.compactJoin('~')
p(tildeJoin(foo))

header('dotJoinWith')

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

header('repeated')

p(F.repeated([1, null, undefined]))

header('mergeRanges')

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

header('push')

p(F.push(1, ['a', 'b', 'c']))
p(F.push('x')(['a', 'b', 'c']))
p(F.push(null)([]))
p(F.push('a')([null, 1, 3]))