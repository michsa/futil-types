import * as F from 'futil-js'
import * as _ from 'lodash/fp'

// utilities for pretty printing
// -----------------------------

const p = (...x: any[]) => console.log(...x)

const separator = (char: string) => (length: number) => (first: string, last?: string) =>
  `${first}${char.repeat(length)}${last ? last : first}`

const sepDash = separator('-')
const sepEq = separator('=')

const header = (name: string) => {
  const sep = sepDash(name.length + 2)
  p(`${sep('.')}\n| ${name} |\n${sep('\'')}`)
}

const bigHeader = (name: string) => {
  const sep = sepEq(62)
  const spaceSep = separator(' ')(62)('|')
  const prtName = _.pad(60, _.upperCase(name).split('').join('  '))
  p(`\n${sep('/', '\\')}\n${spaceSep}\n| ${prtName} |\n${spaceSep}\n${sep('\\', '/')}`)
}


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
// --------------

p(F.dotJoin(foo))


header('compactJoin')
// ------------------

const slashJoin = F.compactJoin('/')
slashJoin(foo)
// compactJoin should work both curried and not
p(F.compactJoin('//', foo))
const tildeJoin = F.compactJoin('~')
p(tildeJoin(foo))


header('dotJoinWith')
// ------------------

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
// ---------------

p(F.repeated([1, null, undefined]))


header('mergeRanges')
// ------------------

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
// -----------

p(F.push(1, ['a', 'b', 'c']))
p(F.push('x')(['a', 'b', 'c']))
p(F.push(null)([]))
p(F.push('a')([null, 1, 3]))
p(F.push('a', 'hello'))


header('moveIndex')
// ----------------

const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT' ]
const altWeek = F.moveIndex(0, 10, week)
p(altWeek)


header('cycle')
// ------------

const cycleDiffKinds = F.cycle(['a', 1, false, 'b', 2])
p(cycleDiffKinds('a')) // 1
const dayAfter = F.cycle(week)
p(dayAfter('TUE')) // WED
const fooCycle = [{foo: 1}, {foo: 2}, {foo: 3}]
const cycleObjects = F.cycle(fooCycle) // type error
p(cycleObjects({foo: 2})) // {foo: 1}, since indexOf doesn't deep compare
p(cycleObjects(cycleObjects())) // {foo: 2}, since object references work for shallow eq

let superWeirdThing = {
    0: 'w',
    1: 't',
    2: 'f',
    length: 3,
    indexOf: (value: string) => parseInt(_.findKey((x: string) => x == value, superWeirdThing) || '-1')
}
p('superWeirdThing')
p(F.cycle(superWeirdThing)('f'))
p(F.cycle(superWeirdThing)('g'))
p(F.cycle(['a', 'b', 'c'])('g'))

header('arrayToObject')
// --------------------

const boringKey = (x: any) => `key${x}`
const boringValue = (x: any) => `val${x}`
const boringA2ONoCurry = F.arrayToObject(x => `key${x}`, x => `val${x}`)
p(boringA2ONoCurry([1, 'a', 2, 'b', 3, 'c']))
const boringA2OPartial = F.arrayToObject(boringKey)
const boringA2O = boringA2OPartial(boringValue)
p(boringA2OPartial(boringValue, [1, 'a', 2, 'b', 3, 'c']))
p(boringA2O([1, 'a', 2, 'b', 3, 'c']))

const stringsOnly = F.arrayToObject(
  (x: string | number) => `key${x}`,
  (x: string) => x.length
)
const stringsOnlyKey = F.arrayToObject((x: string | number) => `key${x}`)
const stringsOnlyKeyValue = stringsOnlyKey((x: string) => x.length)
// restricts the argument array to the stricter type given between k() and v()
p(stringsOnly(['a', 'b', 'c']))
p(stringsOnlyKeyValue(['a', 'b', 'c']))


header('zipObjectDeepWith')
// ------------------------

p(F.zipObjectDeepWith(['a', 'b'], () => 1))
p(F.zipObjectDeepWith(['a', 'b'], [1, 1]))

p(F.zipObjectDeepWith(['a.b[0].c', 'a.b[1].d'], [1, 2]))
const zipped = F.zipObjectDeepWith(['a.b[0].c', 'a.b[1].d'], (x) => [x, x + 1])
p(zipped)

const zod2 = (keys: any, f?: any) =>
_.zipObjectDeep(keys, _.isFunction(f) && _.isArray(keys) ? _.times(f, keys.length) : f)

const zipped2 = zod2(['a.b[0].c', 'a.b[1].d'])
p(zipped2)


header('prefixes')
// ---------------

const prefixes1 = F.prefixes([1, 2, 3])
const prefixes2 = F.prefixes('hello')
const prefixes3 = F.prefixes(['h', 'e', 'l', 'l', 'o'])
// should work the same
p(prefixes2.join(''))
p(prefixes3.join(''))


header('encoder')
// --------------

const enc = F.encoder('*')
const encoded = enc.encode([1, 2, 3])
p(enc.encode('hello'))
p(encoded)
p(enc.decode(encoded))


header('dotEncoder')
// -----------------

const denc = F.dotEncoder
p(denc.encode([4, 5, 6]))


header('chunkBy')
// --------------

const chunkNum = [1, 2, 1, 3, 3, 4, 4, 1, 5, 3, 6, 1]
const chunkStr = 'aabccddeedefffg'
const chunkIncreasing = <T>(a: ArrayLike<T>, b: T) => b <= a[0]
const chunked1 = F.chunkBy(chunkIncreasing, chunkNum)
const chunked2 = F.chunkBy(chunkIncreasing)(chunkStr)
p(chunked1)
p(chunked2)


header('toggleElement')
// --------------------
// if toggleElement finds an element to remove from a string, its return value
// is an array. if it doesn't, and instead appends, its return is still a string.
// from what i understand, the ArrayLike type should be able to handle this
// situation, casting with `as` when necessary. not sure though, might be bugs
const notAString = F.toggleElement('d', chunkStr)
p(notAString, typeof notAString)
const stillAString = F.toggleElement('h', chunkStr) as string
p(stillAString, typeof(stillAString))
stillAString.split(' ')
p(F.toggleElement('a', [1, 'a', 2, 'b', 3, 'c']))

const toggleA = F.toggleElement('a')
toggleA([1, 'a', 2, 'b', 3, 'c'])
toggleA('hello')
// should give an error, because type of array does not include type of togglee
// p(toggleA([1, 2, 3]))


header('toggleElementBy')
// ----------------------
// same as toggleElement but with an extra param,
// just make sure the 3-arity currying works
p(F.toggleElementBy(true, 'd', chunkStr))
p(F.toggleElementBy(true, 'd')(chunkStr))
p(F.toggleElementBy(true)('d', chunkStr))
p(F.toggleElementBy(true)('d')(chunkStr))


header('intersperse')
// ------------------
p(F.intersperse('and', [1, 2, 3]))
const andFinally = <T>(acc: any, i: number, xs: ArrayLike<T>) =>
    (i === xs.length - 1 ? 'and finally' : 'and')
p(F.intersperse(andFinally, [1, 2, 3]))


/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
================================================================================

              █████╗   ██████╗ ██████╗  ███████╗  ██████╗████████╗
             ██╔══██╗ ██╔════╝ ██╔══██╗ ██╔════╝ ██╔════╝╚══██╔══╝
             ███████║ ╚█████═╗ ██████╔╝ █████╗   ██║        ██║
             ██╔══██║  ╚═══██║ ██╔═══╝  ██╔══╝   ██║        ██║
             ██║  ██║ ██████╔╝ ██║      ███████╗ ╚██████╗   ██║
             ╚═╝  ╚═╝ ╚═════╝  ╚═╝      ╚══════╝  ╚═════╝   ╚═╝

================================================================================
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
// bigHeader('aspect')

// header('aspect')
// ----------------

// header('aspectSync')
// ----------------

// header('aspects')
// ----------------


/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
================================================================================

 █████╗  █████╗  ██╗     ██╗     ██████╗  █████╗████████╗ ██╗  █████╗  ███╗  ██╗
██╔═══╝ ██╔══██╗ ██║     ██║     ██╔═══╝ ██╔═══╝╚══██╔══╝ ██║ ██╔══██╗ ████╗ ██║
██║     ██║  ██║ ██║     ██║     ████╗   ██║       ██║    ██║ ██║  ██║ ██╔██╗██║
██║     ██║  ██║ ██║     ██║     ██╔═╝   ██║       ██║    ██║ ██║  ██║ ██║╚████║
╚█████╗ ╚█████╔╝ ██████╗ ██████╗ ██████╗ ╚█████╗   ██║    ██║ ╚█████╔╝ ██║ ╚███║
 ╚════╝  ╚════╝  ╚═════╝ ╚═════╝ ╚═════╝  ╚════╝   ╚═╝    ╚═╝  ╚════╝  ╚═╝  ╚══╝

================================================================================
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
// bigHeader('collection')

// header('flowMap')
// ----------------

// header('findApply')
// ----------------


// Algebras
// ----------

// header('map')
// ----------------

// header('deepMap')
// ----------------

// header('insertAtIndex')
// ----------------


/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
================================================================================

 █████╗ █████╗  ██╗  ██╗ ██╗  ██╗ ██████╗ █████╗   █████╗ ██╗  █████╗  ██╗  ██╗
██╔═══╝██╔══██╗ ███╗ ██║ ██║  ██║ ██╔═══╝ ██╔═██╗ ██╔═══╝ ██║ ██╔══██╗ ███╗ ██║
██║    ██║  ██║ ████╗██║ ██║  ██║ ████╗   ████╔═╝ ╚████═╗ ██║ ██║  ██║ ████╗██║
██║    ██║  ██║ ██╔████║ ╚██╗██╔╝ ██╔═╝   ██╔═██╗  ╚══██║ ██║ ██║  ██║ ██╔████║
╚█████╗╚█████╔╝ ██║╚███║  ╚███╔╝  ██████╗ ██║ ██║ █████╔╝ ██║ ╚█████╔╝ ██║╚███║
 ╚════╝ ╚════╝  ╚═╝ ╚══╝   ╚══╝   ╚═════╝ ╚═╝ ╚═╝ ╚════╝  ╚═╝  ╚════╝  ╚═╝ ╚══╝

================================================================================
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
// bigHeader('conversion')

// Flips
// ----------

// header('getIn')
// ----------------

// header('hasIn')
// ----------------

// header('pickIn')
// ----------------

// header('includesIn')
// ----------------

// header('inversions')
// ----------------


// Mutables
// ----------

// header('extendOn')
// ----------------

// header('defaultsOn')
// ----------------

// header('mergeOn')
// ----------------

// header('setOn')
// ----------------

// header('unsetOn')
// ----------------

// header('pullOn')
// ----------------

// header('updateOn')
// ----------------


// Uncaps
// ----------

// header('reduce')
// ----------------

// header('mapValues')
// ----------------

// header('each')
// ----------------

// header('mapIndexed')
// ----------------

// header('findIndexed')
// ----------------

var users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
  { user: 'pebbles', age: 1, active: true }
]
p(F.findIndexed((o, i) => o.age < i, users))
// The `_.matches` iteratee shorthand.
p(F.findIndexed({ 'age': 1, 'active': true }, users))
// The `_.matchesProperty` iteratee shorthand.
p(F.findIndexed(['active', false], users))
// The `_.property` iteratee shorthand.
p(F.findIndexed('active', users))
// => object for 'barney'

// _.find((o, i) => o.age < i, users)
F.findIndexed('active')

// header('eachIndexed')
// ----------------

// header('reduceIndexed')
// ----------------

// header('pickByIndexed')
// ----------------

// header('mapValuesIndexed')
// ----------------


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

type StrOrBool = [string | boolean, string]
type StrOrNum = [string | number]
type Question = StrOrBool & StrOrNum

const sayType = (x: string | number | boolean) => `'${x}' is a ${typeof x}`
const isGt5 = (x: number) => x > 5
// the typedef is not smart enough to merge some argument types properly. eg,
// if one branch is [string | number] and the other is [string | boolean], it
// will throw an error, rather than merging them to [string]. but it can still
// reduce them to subsets, eg [string | number] and [string | number | boolean]
// branches will result in a function that takes [string | number].
const isNumber = (x: string | number) => typeof x === 'number'
const shoutIfTrue = ([s, b]: [string, boolean]) => b ? _.toUpper(`${s}!`) : s
const shoutTypeIfGt5 = F.converge(shoutIfTrue, [sayType, isGt5])
const shoutTypeIfNumber = F.converge(shoutIfTrue, [sayType, isNumber])

p(shoutTypeIfNumber('shhhh'))
p(shoutTypeIfNumber(8))
// p(shoutTypeIfGt5('yep')) // should throw compile error
p(shoutTypeIfGt5(4))
p(shoutTypeIfGt5(8))

// branch argument checking should work with multiple different kinds of
// arguments, and array tuple arguments
const repeat = (s: string, times: number) => s.repeat(times)
const repeatFromArray = ([s, times]: [string, number]) => s.repeat(times)
const doubleRepeat = F.converge(_.join(''), [repeat, repeat])
const doubleRepeatFromArray = F.converge(_.join(''), [repeatFromArray, repeatFromArray])
const spooky: string = doubleRepeat('o', 4)
const spookier: string = doubleRepeatFromArray(['Oo', 3])
p(spooky + spookier)


header('composeApply / comply')
// ----------------------------

const timesTwo = (x: number) => x * 2
const timesThree = F.comply(F.append, timesTwo)
const fifteen: number = timesThree(5)
p(fifteen, typeof fifteen)

interface Fairy {
  height: number, // (in centimeters)
  father?: Fairy
}
const isTallerThan = (a?: Fairy) => (b: Fairy) =>
    (a && b ? a.height > b.height: false)
const fatherOf = (x: Fairy) => x.father
const isShorterThanFather = F.comply(isTallerThan, fatherOf)
const father: Fairy = {height: 11}
const son: Fairy = {height: 13, father: father}
const daughter: Fairy = {height: 9, father: father}
p('is son shorter than father?', isShorterThanFather(son))
p('is daughter shorter than father?', isShorterThanFather(daughter))

// testing variable-arity comply
const myComply = <Ag extends any[], Rg, Rf>(
  f: (arg: Rg) => (...args: Ag) => Rf,
  g: (...args: Ag) => Rg
) => (...x: Ag) => f(g(...x))(...x)

const repeatToArray = (a: string, b: number) => new Array<string>(b).fill(a)
const joinWithReverse = (xs: string[]) =>
  (a: string, b: number) => _.join(_.join('')(_.reverse(a)), xs)

// const flipFlop = F.comply(joinWithReverse, repeatToArray)
const flipFlop2 = myComply(joinWithReverse, repeatToArray)
// p(flipFlop('/-\\', 5))
p(flipFlop2('/-\\', 5))


header('defer')
// ------------

p('idk :(')


header('debounceAsync')
// --------------------
p('coming soon*')

async function testDebounce() {
  const plusTen = (x: number) => x + 10
  const asyncP10 = F.debounceAsync(10, plusTen)
  let aResult = await Promise.all([asyncP10(1), asyncP10(2), asyncP10(3)])
  const syncP10 = _.debounce(10, plusTen)
  let sResult = await Promise.all([syncP10(1), syncP10(2), syncP10(3)])


  p('\n\n*:')
  p(aResult) // [13, 13, 13]
  p(sResult) // [undefined, undefined, undefined]
}
testDebounce()


header('flurry')
// -------------

const add3 = (x: number, y: number, z: number) => x + y + z
const add2 = (x: number, y: number) => x + y
const double = (x: number) => x * 2

const doubleAdd3 = F.flurry(add3, double)

p(doubleAdd3(1, 4)(5))
p(doubleAdd3(1)(4)(5))


/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
================================================================================

  ██╗ ████████╗ ███████╗ ██████╗   █████╗ ████████╗ ██████╗  ██████╗   ██████╗
  ██║ ╚══██╔══╝ ██╔════╝ ██╔══██╗ ██╔══██╗╚══██╔══╝██╔═══██╗ ██╔══██╗ ██╔════╝
  ██║    ██║    █████╗   █████╔═╝ ███████║   ██║   ██║   ██║ █████╔═╝ ╚█████═╗
  ██║    ██║    ██╔══╝   ██╔══██╗ ██╔══██║   ██║   ██║   ██║ ██╔══██╗  ╚═══██║
  ██║    ██║    ███████╗ ██║  ██║ ██║  ██║   ██║   ╚██████╔╝ ██║  ██║ ██████╔╝
  ╚═╝    ╚═╝    ╚══════╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝  ╚═╝  ╚═╝ ╚═════╝

================================================================================
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
// bigHeader('iterators')

// header('differentLast')
// ----------------

/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
================================================================================

                     ██╗      █████╗  ███╗   ██╗  ██████╗
                     ██║     ██╔══██╗ ████╗  ██║ ██╔════╝
                     ██║     ███████║ ██╔██╗ ██║ ██║  ███╗
                     ██║     ██╔══██║ ██║╚██╗██║ ██║   ██║
                     ███████╗██║  ██║ ██║ ╚████║ ╚██████╔╝
                     ╚══════╝╚═╝  ╚═╝ ╚═╝  ╚═══╝  ╚═════╝

================================================================================
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
bigHeader('lang')

header('throws')
// -------------
try {
  F.throws(Error('throws'))
}
catch (err) {
  p(err)
}


header('tapError')
// ---------------
try {
  const princ = (e: Error, x: number) => p(x + 1)
  F.tapError(princ)(Error('tapError'), 4)
}
catch (err) {
  p(err)
}


header('exists') // (alias: isNotNil)
// ----------------------------------
p(F.exists(undefined))
p(F.exists((x: any) => x))


header('isMultiple')
// -----------------
p(F.isMultiple({length: 2}))
p(F.isMultiple(2))
p(F.isMultiple('hello'))


header('append')
// ----------------
const append1 = F.append(1)
const five: number = append1(4)
p(five, typeof five)
const a1: string = append1('a')
p(a1, typeof a1)
// unfortunately, this works, although the type is actually string
const weirdThing: number = append1({foo: 1, bar: 2})
p(weirdThing, typeof weirdThing)

const appendNull = F.append(null)
const just1: number = appendNull(1)
p(just1, typeof just1)

const badPigLatin = F.append('ay')
const oneay: string = badPigLatin(1)


// header('isBlank')
// ----------------

// header('isNotBlank')
// ----------------

// header('isBlankDeep')
// ----------------

/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
================================================================================

                      ██╗     ███████╗ ███╗   ██╗  ██████╗
                      ██║     ██╔════╝ ████╗  ██║ ██╔════╝
                      ██║     █████╗   ██╔██╗ ██║ ╚█████═╗
                      ██║     ██╔══╝   ██║╚██╗██║  ╚═══██║
                      ███████╗███████╗ ██║ ╚████║ ██████╔╝
                      ╚══════╝╚══════╝ ╚═╝  ╚═══╝ ╚═════╝

================================================================================
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
// bigHeader('lens')

// header('functionLens')
// ----------------

// header('objectLens')
// ----------------

// header('fnToObj')
// ----------------

// header('objToFn')
// ----------------

// header('lensProp')
// ----------------

// header('lensOf')
// ----------------

// header('includeLens')
// ----------------

// header('view')
// ----------------

// header('views')
// ----------------

// header('set')
// ----------------

// header('sets')
// ----------------

// header('setsWith')
// ----------------

// header('flip')
// ----------------

// header('on')
// ----------------

// header('off')
// ----------------

// header('domLens')
// ----------------

/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
================================================================================

                    ██╗      ██████╗   ██████╗  ██╗  ██████╗
                    ██║     ██╔═══██╗ ██╔════╝  ██║ ██╔════╝
                    ██║     ██║   ██║ ██║  ███╗ ██║ ██║
                    ██║     ██║   ██║ ██║   ██║ ██║ ██║
                    ███████╗╚██████╔╝ ╚██████╔╝ ██║ ╚██████╗
                    ╚══════╝ ╚═════╝   ╚═════╝  ╚═╝  ╚═════╝

================================================================================
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
// bigHeader('logic')

// header('ifElse')
// ----------------

// header('when')
// ----------------

// header('unless')
// ----------------

// header('whenExists')
// ----------------

// header('whenTruthy')
// ----------------

/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
================================================================================

               ██████╗  ██████╗      ██╗ ███████╗ ██████╗████████╗
              ██╔═══██╗ ██╔══██╗     ██║ ██╔════╝██╔════╝╚══██╔══╝
              ██║   ██║ ██████╔╝     ██║ █████╗  ██║        ██║
              ██║   ██║ ██╔══██╗██   ██║ ██╔══╝  ██║        ██║
              ╚██████╔╝ ██████╔╝╚█████╔╝ ███████╗╚██████╗   ██║
               ╚═════╝  ╚═════╝  ╚════╝  ╚══════╝ ╚═════╝   ╚═╝

================================================================================
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
// bigHeader('object')

// header('singleObject')
// ----------------

// header('singleObjectR')
// ----------------

// header('chunkObject')
// ----------------

// header('compactObject')
// ----------------

// header('isEmptyObject')
// ----------------

// header('isNotEmptyObject')
// ----------------

// header('stripEmptyObjects')
// ----------------

// header('pickInto')
// ----------------

// header('renameProperty')
// ----------------

// header('unwind')
// ----------------

// header('isFlatObject')
// ----------------

// header('flattenObject')
// ----------------

// header('unflattenObject')
// ----------------

// header('matchesSignature')
// ----------------

// header('matchesSome')
// ----------------

// header('compareDeep')
// ----------------

// header('mapProp')
// ----------------

// header('getOrReturn')
// ----------------

// header('alias')
// ----------------

// header('aliasIn')
// ----------------

// header('cascade')
// ----------------

// header('cascadeIn')
// ----------------

// header('cascadeKey')
// ----------------

// header('cascadePropKey')
// ----------------

// header('cascadeProp')
// ----------------

// header('unkeyBy')
// ----------------

// header('simpleDiff')
// ----------------

// header('simpleDiffArray')
// ----------------

// header('diff')
// ----------------

// header('diffArray')
// ----------------

// header('pickOn')
// ----------------

// header('mergeAllArrays')
// ----------------

// header('invertByArray')
// ----------------

// header('stampKey')
// ----------------


/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
================================================================================

                 ██████╗  ███████╗  ██████╗  ███████╗ ██╗  ██╗
                 ██╔══██╗ ██╔════╝ ██╔════╝  ██╔════╝ ╚██╗██╔╝
                 █████╔═╝ █████╗   ██║  ███╗ █████╗    ╚███╔╝
                 ██╔══██╗ ██╔══╝   ██║   ██║ ██╔══╝    ██╔██╗
                 ██║  ██║ ███████╗ ╚██████╔╝ ███████╗ ██╔╝ ██╗
                 ╚═╝  ╚═╝ ╚══════╝  ╚═════╝  ╚══════╝ ╚═╝  ╚═╝

================================================================================
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
// bigHeader('regex')

// header('testRegex')
// ----------------

// header('makeRegex')
// ----------------

// header('makeAndTest')
// ----------------

// header('matchAllWords')
// ----------------

// header('matchAnyWord')
// ----------------

// header('allMatches')
// ----------------

// header('postings')
// ----------------

// header('postingsForWords')
// ----------------

// header('highlightFromPostings')
// ----------------

// header('highlight')
// ----------------

/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
================================================================================

               ██████╗████████╗ ██████╗  ██╗ ███╗   ██╗  ██████╗
              ██╔════╝╚══██╔══╝ ██╔══██╗ ██║ ████╗  ██║ ██╔════╝
              ╚█████═╗   ██║    █████╔═╝ ██║ ██╔██╗ ██║ ██║  ███╗
               ╚═══██║   ██║    ██╔══██╗ ██║ ██║╚██╗██║ ██║   ██║
              ██████╔╝   ██║    ██║  ██║ ██║ ██║ ╚████║ ╚██████╔╝
              ╚═════╝    ╚═╝    ╚═╝  ╚═╝ ╚═╝ ╚═╝  ╚═══╝  ╚═════╝

================================================================================
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
// bigHeader('string')

// header('wrap')
// ----------------

// header('quote')
// ----------------

// header('parens')
// ----------------

// header('concatStrings')
// ----------------

// header('trimStrings')
// ----------------

// header('autoLabel')
// ----------------

// header('autoLabelOption')
// ----------------

// header('autoLabelOptions')
// ----------------

// header('toSentenceWith')
// ----------------

// header('toSentence')
// ----------------


/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
================================================================================

                     ████████╗██████╗  ███████╗ ███████╗
                     ╚══██╔══╝██╔══██╗ ██╔════╝ ██╔════╝
                        ██║   █████╔═╝ █████╗   █████╗
                        ██║   ██╔══██╗ ██╔══╝   ██╔══╝
                        ██║   ██║  ██║ ███████╗ ███████╗
                        ╚═╝   ╚═╝  ╚═╝ ╚══════╝ ╚══════╝

================================================================================
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
// bigHeader('tree')

header('isTraversable')
// --------------------
p(F.isTraversable(Array(1, 2, 3)))
p(F.isTraversable(1))
p(F.isTraversable({1: 'a', 2: 'b', 'foo': 'bar'}))
p(F.isTraversable(undefined))
p(F.isTraversable(null))


header('traverse')
// ---------------
p(F.traverse([1]))
p(F.traverse({1: 'a', 2: 'b', 'foo': 'bar'}))
// should just give us a false type if the argument is not traversable.
// not necessarily watertight, but seems to work
const shouldBeFalse = F.traverse(undefined)
p(shouldBeFalse, typeof shouldBeFalse)


// header('walk')
// ----------------

// header('transformTree')
// ----------------

// header('reduceTree')
// ----------------

// header('treeToArrayBy')
// ----------------

// header('treeToArray')
// ----------------

// header('leaves')
// ----------------

// header('treeLookup')
// ----------------

// header('keyTreeByWith')
// ----------------


// Flat Tree

// header('treeKeys')
// ----------------

// header('treeValues')
// ----------------

// header('treePath')
// ----------------

// header('flattenTree')
// ----------------

// header('flatLeaves')
// ----------------

// header('tree')
// ----------------
