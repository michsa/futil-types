// Type definitions for Futil 1.55
// Project: https://github.com/smartprocure/futil-js
// Definitions by: Michelle Saad <https://github.com/michsa>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

interface Foo {}
// jazmine
// ansi shadow
declare module 'futil-js' {

  import * as _ from 'lodash/fp'

  type Fn<A extends unknown[], R> = (...args: A) => R

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
  type Compactable<T> = ArrayLike<T | null | undefined | false | '' | 0> | null | undefined
  type Equalable = number | string | boolean | symbol | null | undefined

  /**
```
joinString -> [string1, string2, ...stringN] -> string1 + joinString + string2 + joinString ... + stringN
```
   * Joins an array after compacting. Note that due to the underlying behavior
   * of `_.curry` no default `join` value is supported -- you must pass in some
   * string with which to perform the join.
   */
  export function compactJoin(joinString: string): <T>(array: Compactable<T>) => string
  export function compactJoin<T>(joinString: string, array: Compactable<T>): string



  /**
```
[string1, string2, ...stringN] -> string1 + '.' + string2 + '.' ... + stringN
```
   * Compacts and joins an array with `.`
   */
  export function dotJoin<T>(array: Compactable<T>): string


  /**
```
filterFunction -> [string1, string2, ...stringN] -> string1 + '.' + string2 + '.' ... + stringN
```
   * Compacts an array by the provided function, then joins it with `.`
   *
   * Note that because `filterFunction` is passsed to `_.filter`, which caps
   * iteratees to one argument, it likewise supports one argument only.
   */
  export function dotJoinWith<T>(filterFunction: (x: T) => boolean | T):
      (xs: ArrayLike<T>) => string


  /**
```
[a] -> [a]
```
   * Returns an array of elements that are repeated in the input array.
   *
   * Note that `repeated` relies on `_.uniq` to reduce the array of repeated
   * elements, which uses [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons. Therefore, the input array may contain only those
   * types which `SameValueZero` is able to compare for equality.
   */
  export function repeated<T>(xs: ArrayLike<Equalable>): ArrayLike<Equalable>


  /**
```
([[], [], []]) -> [[], []]
```
   *
   * Takes any number of ranges and return the result of merging them all.
   *
   * Note that `mergeRanges` can be given a nonexistent or empty argument, in
   * which case it will return an empty array. However, each element within the
   * argument array, if there are any, *must* be a two-element array of numbers.
   *
   * @example [[0,7], [3,9], [11,15]] -> [[0,9], [11,15]]
   */
  export function mergeRanges(ranges: ArrayLike<NumberRange> | null | undefined):
      ArrayLike<NumberRange>
  type NumberRange = [number, number]


  /**
```
(val, array) -> array
```
   * Return array with val pushed.
   */
  export function push<T>(val: T, array: ArrayLike<T>): ArrayLike<T>
  export function push<T>(val: any, array: ArrayLike<any>): ArrayLike<any>
  export function push(val: any): (array: ArrayLike<any>) => ArrayLike<any>


  /**
```
(from, to, array) -> array
```
   * Moves a value from one index to another.
   */
  export function moveIndex<T extends ArrayLike<any>>(from: number, to: number, array: T): T


  /**
```
[a, b...] -> a -> b
```
   * Creates a function that takes an element of the original array as argument
   * and returns the next element in the array (with wrapping). Note that (1)
   * This will return the first element of the array for any argument not in the
   * array and (2) due to the behavior of `_.curry` the created function will
   * return a function equivalent to itself if called with no argument.
   * 
   * `cycle` does not deep compare, so passing a clone of an object in the
   * original array will return the first element. However, passing a reference
   * to an object in the original array will still return the next element after
   * that object:
```
let foos = [{foo: 0}, {foo: 1}, {foo: 2}]
F.cycle(foos)({foo: 1})  //-> {foo: 0}
F.cycle(foos)(foos[1])  //-> {foo: 2}
```
   */
  export function cycle<T extends any>(array: ArrayLike<T>): (x?: T) => T


  /**
```
(k, v, [a]) -> { k(a): v(a) }
```
   * Creates an object from an array by generating a key/value pair for each
   * element in the array using the key and value mapper functions `k` and `v`.
   *
   * The type of the resulting object's keys and values are inferred from the
   * return types of the `k` and `v` mapper functions, with one exception: when
   * `v` is curried, the value type is not correctly inferred, and defaults to
   * `{}`.
   */
  export function arrayToObject<T, K extends Key, V>
    (k: (x: T) => K, v: (x: T) => K, array: ArrayLike<T>): { [k in K]: V }
  export function arrayToObject<T, K extends Key, V>
    (k: (x: T) => K, v: (x: T) => V): (array: ArrayLike<T>) => { [k in K]: V }
  export function arrayToObject<T, K extends Key>
    (k: (x: T) => K): ArrayToObjectCurryee<T, K>

  // necessary for overrides to work in both these cases
  interface ArrayToObjectCurryee<T1, K extends Key> {
    <V, T2>(v: (x: T2) => V): (array: ArrayLike<T1 & T2>) => { [k in K]: V },
    <V, T2>(v: (x: T2) => V, array: ArrayLike<T1 & T2>): { [k in K]: V }
  }
  type InferValue<T> = T extends (...args: any[]) => infer R ? R : never

  /**
   * A version of `_.zipObjectDeep` that supports passing a function to
   * determine values intead of an array, which will be invoked for each key.
   *
   * The function receives the index of the current element in the `keys` array
   * as its only argument.
   */
  export function zipObjectDeepWith
    (keys: ArrayLike<string>, f: (i: number) => any): _.LodashZipObjectDeep1x2
  export function zipObjectDeepWith
    (keys: ArrayLike<string>, values: ArrayLike<any>): _.LodashZipObjectDeep1x2
  export function zipObjectDeepWith
    (keys: ArrayLike<string>): (f: (i: number) => any) =>  _.LodashZipObjectDeep1x2
  export function zipObjectDeepWith
    (keys: ArrayLike<string>): (values: ArrayLike<any>) => _.LodashZipObjectDeep1x2


  /**
```
[a, b] -> {a:true, b:true}
```
   * Converts an array of strings into an object mapping to true. Useful for
   * optimizing `includes`.
   */
  export function flags(x: ArrayLike<string>): _.LodashZipObjectDeep1x2


  /**
```
['a', 'b', 'c'] -> [['a'], ['a', 'b'], ['a', 'b', 'c']]
```
   * Returns a list of all prefixes. Works on strings, too. Implementations must
   * guarantee that the orginal argument has a length property.
   */
  export function prefixes<T extends ArrayLike<any>>(x: T): Array<T>


  /**
```
string -> {encode: array -> string, decode: string -> array}
```
   * Creates an object with encode and decode functions for encoding arrays as
   * strings. The input string is used as input for join/split.
   */
  export function encoder(input: string): Encoder
  export type Encoder = {
    encode: (x: ArrayLike<any>) => string
    decode: (x: string) => Array<string>
  }

  /**
```
{ encode: ['a', 'b'] -> 'a.b', decode: 'a.b' -> ['a', 'b'] }
```
   * An encoder using `.` as the separator.
   */
  export const dotEncoder: Encoder


  /**
```
{ encode: ['a', 'b'] -> 'a/b', decode: 'a/b' -> ['a', 'b'] }
```
   * An encoder using `/` as the separator
   */
  export const slashEncoder: Encoder


  /**
```
((a, a) -> Boolean) -> [a] -> [[a]]
```
   * Returns an array of arrays, where each one of the arrays has one or more
   * elements of the original array, grouped by the first function received.
   * Similar to Haskell's [groupBy](http://zvon.org/other/haskell/Outputlist/groupBy_f.html).
   */
  export function chunkBy<T>(f: <T>(a: T[], b: T) => boolean, a: ArrayLike<T>): T[][]
  export function chunkBy<T>(f: (a: T[], b: T) => boolean): (a: ArrayLike<T>) => T[][]


  /**
```
(any, array) -> array
```
   * Removes an element from an array if it's included in the array, or pushes
   * it in if it doesn't. Immutable (so it's a clone of the array).
   */
  export function toggleElement<X, A>(x: X, a: ArrayLike<A>): ArrayLike<A | X>
  export function toggleElement<X>(x: X): <A>(a: ArrayLike<A>) => ArrayLike<A | X>


  /**
```
bool -> value -> list -> newList
```
   * Just like `toggleElement`, but takes an iteratee to determine if it should
   * remove or add. This is useful for example in situations where you might
   * have a checkbox that you want to represent membership of a value in a set
   * instead of an implicit toggle. Used by `includeLens`.
   */
  export function toggleElementBy<X, A>
    (shouldToggle: boolean, value: X, list: ArrayLike<A>): ArrayLike<A | X>
  export function toggleElementBy<X>
    (shouldToggle: boolean, value: X): <A>(list: ArrayLike<A>) => ArrayLike<A | X>
  export function toggleElementBy(shouldToggle: boolean): ToggleElementByCurryee

  // necessary for overrides to work in both these cases
  interface ToggleElementByCurryee {
    <X>(value: X): <A>(list: ArrayLike<A>) => ArrayLike<A | X>,
    <X, A>(value: X, list: ArrayLike<A>): ArrayLike<A | X>
  }


  /**
```
f -> array -> [array[0], f(), array[n], ....)
```
   * Puts the result of calling `f` in between each element of the array. `f` is
   * a standard lodash iterator taking the value, index, and list. If `f` isn't
   * a function, it will treat `f` as the value to intersperse. See
   * https://ramdajs.com/docs/#intersperse.
   *
   * **Note:** `intersperse` can be used with JSX components! To see an example,
   * please check the official documentation at https://github.com/smartprocure/futil-js#intersperse.
   */
  export function intersperse<T, F>(f: Interspersed<T, F>, array: ArrayLike<T>):
    ArrayLike<T | F>
  export function intersperse<T, F>(f: Interspersed<T, F>):
    (array: ArrayLike<T>) => ArrayLike<T | F>

  export type Interspersed<T, R> = R |
    ((acc: ArrayLike<T | R>, i: number, xs: ArrayLike<T>) => R)

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

  // export function aspect

  // export function aspectSync

  // export function aspects


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

  // export function flowMap

  // export function findApply


  // Algebras
  // ----------

  // export function map

  // export function deepMap

  // export function insertAtIndex


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

  // Flips
  // ----------

  // export function getIn

  // export function hasIn

  // export function pickIn

  // export function includesIn

  // export function inversions


  // Mutables
  // ----------

  // export function extendOn

  // export function defaultsOn

  // export function mergeOn

  // export function setOn

  // export function unsetOn

  // export function pullOn

  // export function updateOn


  // Uncaps
  // ----------

  // export function reduce

  // export function mapValues

  // export function each

  // export function mapIndexed


  type IterateePredicate<T> = (value: T, index: number) => boolean

  export function findIndexed<T, K extends Key>(
    predicate: IterateePredicate<T>, collection: T[]
  ): T | undefined
  export function findIndexed<T, K extends Key>(
    predicate: IterateePredicate<T>): (collection: T[]
  ) => T | undefined


  // export function eachIndexed

  // export function reduceIndexed

  // export function pickByIndexed

  // export function mapValuesIndexed


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

  /**
```
(fn, a, b) -> fn(a, b)
```
   * If `fn` is a function, call the function with the passed-in arguments.
   * Otherwise, return `false`.
   */
  export function maybeCall<T>(fn: T, ...args: InferArgs<T>): ResultOrFalse<T>
  type ResultOrFalse<T> = T extends (...args: any[]) => infer R ? R : false
  type InferArgs<T> = T extends (...args: infer A) => any ? A : any[]


  /**
```
(fn, a, b) -> fn(a, b)
```
   * If `fn` is a function, call the function with the passed-in arguments.
   * Otherwise, return `fn`.
   */
  export function callOrReturn<T>(fn: T, ...args: InferArgs<T>): ResultOrIdentity<T>
  type ResultOrIdentity<T> = T extends (...args: any[]) => infer R ? R : T


  /**
```
(a, Monoid f) -> f[a] :: f a
```
   * Binds a function of an object to its object.
   */
  export function boundMethod<T extends ObjectWithFunction<K>, K extends Key>
      (fn: K, obj: T): T[K]
  type Key = string | number | symbol
  type ObjectWithFunction<F extends Key> = { [k in F]: Function }


  /**
```
(f, [g1, g2, ...gn]) -> a -> f([g1(a), g2(a), ...gn(a)])
```
   * http://ramdajs.com/docs/#converge. Note that `f` is called on the array of
   * the return values of `[g1, g2, ...gn]` rather than applied to it.
   *
   * This definition correctly generates types for the created function: its
   * return value matches the return value of the converger function, and its
   * arguments match the arguments of the strictest branch function. It also
   * validates that the converger function's argument array matches the return
   * types of the branch functions. Works for up to 8 branch functions.
   */
  export function converge<A extends unknown[], R, T extends unknown[]>(
    converger: Converger<R, T>,
    branches: Branches<A, T>
  ): (...args: A) => R

  type Converger<R, T> = (arg: T) => R

  type Branches<A extends unknown[], T extends unknown[]> =
    Branches1<A, T[0]> |
    Branches2<A, T[0], T[1]> |
    Branches3<A, T[0], T[1], T[2]> |
    Branches4<A, T[0], T[1], T[2], T[3]> |
    Branches5<A, T[0], T[1], T[2], T[3], T[4]> |
    Branches6<A, T[0], T[1], T[2], T[3], T[4], T[5]> |
    Branches7<A, T[0], T[1], T[2], T[3], T[4], T[5], T[6]> |
    Branches8<A, T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7]>

  type Branches1<A extends unknown[], T1> =
    [Fn<A, T1>]
  type Branches2<A extends unknown[], T1, T2> =
    [Fn<A, T1>, Fn<A, T2>]
  type Branches3<A extends unknown[], T1, T2, T3> =
    [Fn<A, T1>, Fn<A, T2>, Fn<A, T3>]
  type Branches4<A extends unknown[], T1, T2, T3, T4> =
    [Fn<A, T1>, Fn<A, T2>, Fn<A, T3>, Fn<A, T4>]
  type Branches5<A extends unknown[], T1, T2, T3, T4, T5> =
    [Fn<A, T1>, Fn<A, T2>, Fn<A, T3>, Fn<A, T4>, Fn<A, T5>]
  type Branches6<A extends unknown[], T1, T2, T3, T4, T5, T6> =
    [Fn<A, T1>, Fn<A, T2>, Fn<A, T3>, Fn<A, T4>, Fn<A, T5>, Fn<A, T6>]
  type Branches7<A extends unknown[], T1, T2, T3, T4, T5, T6, T7> =
    [Fn<A, T1>, Fn<A, T2>, Fn<A, T3>, Fn<A, T4>, Fn<A, T5>, Fn<A, T6>, Fn<A, T7>]
  type Branches8<A extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8> =
    [Fn<A, T1>, Fn<A, T2>, Fn<A, T3>, Fn<A, T4>, Fn<A, T5>, Fn<A, T6>, Fn<A, T7>, Fn<A, T8>]

  /**
```
(f, g) -> x -> f(g(x))(x)
```
   * A combinator that combines `compose` and `apply`. `f` should be a 2 place
   * curried function. Useful for applying comparisons to pairs defined by some
   * one place function, e.g. `const isShorterThanFather = F.comply(isTallerThan, fatherOf)`
   *
   * Note that the current implementation of `composeApply` only uses the first
   * argument given, so both `g` and the return function are single-arity only.
   */
  export function composeApply<Ag, Rg, Rf>
    (f: (arg: Rg) => (x: Ag) => Rf, g: (x: Ag) => Rg): (x: Ag) => Rf
  /*
  // here is the variable-arity type definition:
  export function composeApply<Ag extends any[], Rg, Rf>
    (f: (arg: Rg) => (...args: Ag) => Rf, g: (...args: Ag) => Rg): (...x: Ag) => Rf
  */


  /**
```
(f, g) -> x -> f(g(x))(x)
```
   * A combinator that combines `compose` and `apply`. `f` should be a 2 place
   * curried function. Useful for applying comparisons to pairs defined by some
   * one place function, e.g. `const isShorterThanFather = F.comply(isTallerThan, fatherOf)`
   *
   * Note that the current implementation of `composeApply` only uses the first
   * argument given, so both `g` and the return function are single-arity only.
   */
  export const comply: typeof composeApply


  /**
   * Implement `defer`, ported from bluebird docs and used by debounceAsync.
   */
  export function defer(): {resolve: any, reject: any, promise: Promise<any>}


  /**
   * A `_.debounce` for async functions that ensure the returned promise is
   * resolved with the result of the execution of the actual call. Using
   * `_.debounce` with `await` or `.then` would result in the earlier calls
   * never returning because they're not executed - the unit tests demonstate
   * it failing with `_.debounce`.
   */
  export function debounceAsync<A extends any[], R>
    (n: number, f: (...args: A) => R): (...args: A) => Promise<R>


  /**
```
(f1, f2, ...fn) -> f1Arg1 -> f1Arg2 -> ...f1ArgN -> fn(f2(f1))
```
   * Flurry is combo of `flow` + `curry`, preserving the arity of the initial
   * function. See https://github.com/lodash/lodash/issues/3612.
   */
  export function flurry(...fns: Function[]): Function
  // TODO: the god damn mess of overrides we need to type curried functions
  // (thank lodash for not exporting them)

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

  // export function differentLast

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

  /**
   * Just throws whatever it is passed.
   */
  export function throws(x: Error): never


  /**
   * Run the provided function and then throw the first argument. It's like
   * `_.tap` for rethrowing errors.
   */
  export function tapError<A extends any[]>(f: (e: Error, ...args: A) => any):
    (e: Error, ...args: A) => never


  /**
   * Negated `_.isNil`.
   */
  export function exists(x: any): boolean


  /**
   * Negated `_.isNil`. Alias of `exists`.
   */
  export const isNotNil: typeof exists


  /**
   * Returns true if the input has a `length` property > 1, such as arrays,
   * strings, or custom objects with a `length` property.
   */
  export function isMultiple(x: any): boolean


  /**
   * A curried, flipped `_.add`. The flipping matters for strings, e.g.
   * `F.append('a')('b') -> 'ba'`
   *
   * The type definition follows the [TypeScript specification for the binary `+`
   * operator](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#4.19.2),
   * which is what `append` uses internally. In short, a `number` type for *both*
   * arguments will return a `number`, a `string` type for *either* argument will
   * return a `string`, and any other combination returns `any`.
   */
  export function append(toAppend: number): <T>(appendee: T) => MatchNumberOrString<T>
  export function append(toAppend: string): (appendee: any) => string
  export function append(toAppend: any): <T>(appendee: T) => MatchString<T>
  type MatchNumberOrString<T> = T extends number ? number : MatchString<T>
  type MatchString<T> = T extends string ? string : any

  /**
```
x -> bool
```
   * Designed to determine if something has a meaningful value, like a ux
   * version of truthiness. It's true for everything except `null`,
   * `undefined`, `''`, `[]`, and `{}`. Another way of describing it is that
   * it's the same as falsiness except `0` and `false` are truthy and `{}` is
   * falsey. Useful for implementing "required" validation rules.
   */
  export function isBlank(x: any): boolean

  /**
```
x -> bool
```
 * pposite of isBlank
 */
  export function isNotBlank(x: any): boolean

  /**
```
f -> x -> bool
```
   * Recurses through an object's leaf properties and passes an array of
   * booleans to the combinator, such as `_.some`, `_.every`, and `F.none`
   */
//  export function isBlankDeep(combinator: Combinator): (x: any) => boolean
//  type Combinator = (f: (x: any) => boolean, a: LEAVES[]) => boolean

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

  // export function functionLens

  // export function objectLens

  // export function fnToObj

  // export function objToFn

  // export function lensProp

  // export function lensOf

  // export function includeLens

  // export function view

  // export function views

  // export function set

  // export function sets

  // export function setsWith

  // export function flip

  // export function on

  // export function off

  // export function domLens

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

  // export function ifElse

  // export function when

  // export function unless

  // export function whenExists

  // export function whenTruthy

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

  // export function singleObject

  // export function singleObjectR

  // export function chunkObject

  // export function compactObject

  // export function isEmptyObject

  // export function isNotEmptyObject

  // export function stripEmptyObjects

  // export function pickInto

  // export function renameProperty

  // export function unwind

  // export function isFlatObject

  // export function flattenObject

  // export function unflattenObject

  // export function matchesSignature

  // export function matchesSome

  // export function compareDeep

  // export function mapProp

  // export function getOrReturn

  // export function alias

  // export function aliasIn

  // export function cascade

  // export function cascadeIn

  // export function cascadeKey

  // export function cascadePropKey

  // export function cascadeProp

  // export function unkeyBy

  // export function simpleDiff

  // export function simpleDiffArray

  // export function diff

  // export function diffArray

  // export function pickOn

  // export function mergeAllArrays

  // export function invertByArray

  // export function stampKey


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

  // export function testRegex

  // export function makeRegex

  // export function makeAndTest

  // export function matchAllWords

  // export function matchAnyWord

  // export function allMatches

  // export function postings

  // export function postingsForWords

  // export function highlightFromPostings

  // export function highlight

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

  // export function wrap

  // export function quote

  // export function parens

  // export function concatStrings

  // export function trimStrings

  // export function autoLabel

  // export function autoLabelOption

  // export function autoLabelOptions

  // export function toSentenceWith

  // export function toSentence


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
  /**
   * A default check if something can be traversed - currently it is arrays
   * and plain objects.
   */
  export function isTraversable(x: any):
    typeof x extends Array<any> ? true : typeof x extends Object ? true : false


  /**
   * The default traversal function used in other tree methods if you don't
   * supply one. It returns false if it's not traversable or empty, and returns
   * the object if it is.
   */
  export function traverse<T>(x: T):
    T extends Array<any> ? (T | false) : T extends Object ? (T | false) : false


  /**
```
traverse -> (pre, post=_.noop) -> tree -> x
```
   * A depth first search which visits every node returned by `traverse`
   * recursively. Both `pre-order` and `post-order` traversals are supported
   * (and can be mixed freely). `walk` also supports exiting iteration early by
   * returning a truthy value from either the `pre` or `post` functions. The
   * returned value is also the return value of `walk`. The `pre`, `post`, and
   * `traversal` functions are passed the current node as well as the parent
   * stack (where `parents[0]` is the direct parent).
   */
  export function walk<T>(next?: Function | typeof traverse): (
    pre: WalkFunction<T>,
    post?: WalkFunction<T>,
    parents?: T[],
    parentIndexes?: number[]
  ) => (tree: T, index: number) => T | false

  type WalkFunction<T> = (tree: T, index: number, parents?: T[], parentIndexes?: number[]) => T | false

  /**
```
traverse -> _iteratee -> tree -> newTree
```
   * Structure preserving pre-order depth first traversal which clones, mutates,
   * and then returns a tree. Basically `walk` with a `_.cloneDeep` first
   * (similar to a tree map because it preserves structure). `_iteratee` can be
   * any suitable argument to `_.iteratee` https://lodash.com/docs/4.17.5#iteratee
   */
  export function transformTree(): any

  /**
```
traverse -> (accumulator, initialValue, tree) -> x
```
   * Just like `_.reduce`, but traverses over the tree with the traversal
   * function in `pre-order`.
   */
  export function reduceTree(): any

  /**
```
traverse -> tree -> [treeNode, treeNode, ...]
```
   * Flattens the tree nodes into an array, simply recording the node values in
   * pre-order traversal.
   */
  export function treeToArray(): any

  /**
```
traverse -> f -> tree -> [f(treeNode), f(treeNode), ...]
```
   * Like `treeToArray`, but accepts a customizer to process the tree nodes
   * before putting them in an array. It's `_.map` for trees - but it's not
   * called treeMap because it does not preserve the structure as you might
   * expect `map` to do.
   */
  export function treeToArrayBy(): any

  /**
```
traverse -> tree -> [treeNodes]
```
   * Returns an array of the tree nodes that can't be traversed into in `pre-order`.
   */
  export function leaves(): any

  /**
```
(traverse, buildIteratee) -> ([_iteratee], tree) -> treeNode
```
   * Looks up a node matching a path, which defaults to lodash `iteratee` but
   * can be customized with `buildIteratee`. The `_iteratee` members of the
   * array can be any suitable arguments for `_.iteratee`.
   * https://lodash.com/docs/4.17.5#iteratee
   */
  export function treeLookup(): any

  /**
```
traverse -> transformer -> _iteratee -> tree -> result
```
   * Similar to a keyBy (aka groupBy) for trees, but also transforms the grouped
   * values (instead of filtering out tree nodes). The transformer takes three
   * args, the current node, a boolean of if the node matches the current group,
   * and what group is being evaluated for this iteratee. The transformer is
   * called on each node for each grouping. `_iteratee` is any suitable argument
   * to `_.iteratee`, as above.
   */
  export function keyTreeByWith(): any


  // Flat Tree
  /**
   * A utility tree iteratee that returns the stack of node indexes.
   */
  export function treeKeys(): any

  /**
   * A utility tree iteratee that returns the stack of node values.
   */
  export function treeValues(): any

  /**
```
(build, encoder) -> treePathBuilderFunction
```
   * Creates a path builder for use in `flattenTree`. By default, the builder
   * will use child indexes and a `dotEncoder`. Encoder can be an encoding
   * function or a futil `encoder` (an object with `encode` and `decode`
   * functions).
   */
  export function treePath(): any

  /**
```
prop -> treePathBuilderFunction
```
   * Creates a path builder for use in `flattenTree`, using a slashEncoder and
   * using the specified prop function as an iteratee on each node to determine
   * the keys.
   */
  export function propTreePath(): any

  /**
```
traverse -> buildPath -> tree -> result
```
   * Creates a flat object with a property for each node, using `buildPath` to
   * determine the keys. `buildPath` takes the same arguments as a tree walking
   * iteratee. It will default to a dot tree path.
   */
  export function flattenTree(): any


  export function flatLeaves(): any

  /**
```
(traverse, buildIteratee) -> {walk, reduce, transform, toArray, toArrayBy, leaves, lookup, keyByWith, traverse, flatten, flatLeaves }
```
   * Takes a traversal function and returns an object with all of the tree
   * methods pre-applied with the traversal. This is useful if you want to use a
   * few of the tree methods with a custom traversal and can provides a slightly
   * nicer api. Exposes provided `traverse` function as `traverse`
   */
  export function tree(): any

}
