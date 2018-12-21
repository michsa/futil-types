// Type definitions for Futil 1.55
// Project: https://github.com/smartprocure/futil-js
// Definitions by: Michelle Saad <https://github.com/michsa>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


// jazmine
// ansi shadow
declare module 'futil-js' {

  import * as lodash from 'lodash'

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
  /*
  type Not<T, U> = T extends U ? never : T
  type MaybeFunction<T, A extends any[], R> = ((...args: any) => R) | Not<T, Function>
  type ResultOrFalse<T, R> = T extends Function ? R : false & {}
  export function maybeCall1<T, A extends any[], R>(fn: MaybeFunction<T, A, R>, ...args: A):
    ResultOrFalse<T, R>

  export function maybeCall2<A extends any[], R>(fn: (...args: A) => R, ...args: A): R
  export function maybeCall2<T>(fn: Not<T, Function>, ...args: any[]): false
  */
  
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
   * ensures that the converger function accepts an array. 
   * 
   * However, it does **not** validate that the converger function's arguments
   * correctly correspond to the return types of the branch functions, so care
   * must still be taken to avoid runtime errors.
   */
  export function converge<A extends unknown[], T>
      (converger: (...args: any[]) => T, branches: ((...args: A) => any)[]): 
          (...args: A) => T

  /**
```
(f, g) -> x -> f(g(x))(x)
```
   * A combinator that combines `compose` and `apply`. `f` should be a 2 place
   * curried function. Useful for applying comparisons to pairs defined by some
   * one place function, e.g. `var isShorterThanFather = F.comply(isTallerThan, fatherOf)`
   */
  type ComposeApply = (...x: any) => any
  export const comply: ComposeApply
  export const composeApply: ComposeApply

  /**
   * Implement `defer`, ported from bluebird docs and used by debounceAsync.
   */
  export function defer(...x: any): any

  /**
   * A `_.debounce` for async functions that ensure the returned promise is
   * resolved with the result of the execution of the actual call. Using 
   * `_.debounce` with `await` or `.then` would result in the earlier calls
   * never returning because they're not executed - the unit tests demonstate
   * it failing with `_.debounce`.
   */
  export function debounceAsync(...x: any): any

  /**
```
(f1, f2, ...fn) -> f1Arg1 -> f1Arg2 -> ...f1ArgN -> fn(f2(f1))
```
   * Flurry is combo of `flow` + `curry`, preserving the arity of the initial
   * function. See https://github.com/lodash/lodash/issues/3612.
   */
  export function flurry(...x: any): any


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
  type Compactable<T> = _.List<T | null | undefined | false | '' | 0> | null | undefined

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
      (xs: _.List<T>) => string

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
  export function repeated<T>(xs: _.List<Uniqable>): _.List<Uniqable>
  type Uniqable = number | string | boolean | symbol | null | undefined

  /**
```
([[], [], []]) -> [[], []]
```
   * 
   * Takes any number of ranges and return the result of merging them all.
   * 
   * @example [[0,7], [3,9], [11,15]] -> [[0,9], [11,15]]
   */
  export function mergeRanges(ranges: _.List<NumberRange> | null | undefined): 
      _.List<NumberRange>
  type NumberRange = [number, number]

  /**
```
(val, array) -> array
```
   * Return array with val pushed.
   */
  export function push<T>(val: T, array: _.List<T>): _.List<T>
  export function push<T>(val: any, array: _.List<any>): _.List<any>
  export function push(val: any): (array: _.List<any>) => _.List<any>

  /**
```
(from, to, array) -> array
```
   * Moves a value from one index to another.
   */
  export function moveIndex(...x: any): any

  /**
```
[a, b...] -> a -> b
```
   * Creates a function that takes an element of the original array as argument
   * and returns the next element in the array (with wrapping). Note that (1)
   * This will return the first element of the array for any argument not in the
   * array and (2) due to the behavior of `_.curry` the created function will
   * return a function equivalent to itself if called with no argument.
   */
  export function cycle(...x: any): any

  /**
```
(k, v, [a]) -> { k(a): v(a) }
```
   * Creates an object from an array by generating a key/value pair for each
   * element in the array using the key and value mapper functions.
   */
  export function arrayToObject(...x: any): any

  /**
```

```
   * A version of _.zipObjectDeep that supports passing a function to determine
   * values intead of an array, which will be invoked for each key.
   */
  export function zipObjectDeepWith(...x: any): any

  /**
```
[a, b] -> {a:true, b:true}
```
   * Converts an array of strings into an object mapping to true. Useful for
   * optimizing `includes`.
   */
  export function flags(...x: any): any

  /**
```
['a', 'b', 'c'] -> [['a'], ['a', 'b'], ['a', 'b', 'c']]
```
   * Returns a list of all prefixes. Works on strings, too. Implementations must
   * guarantee that the orginal argument has a length property.
   */
  export function prefixes(...x: any): any

  /**
```
string -> {encode: array -> string, decode: string -> array}
```
   * Creates an object with encode and decode functions for encoding arrays as
   * strings. The input string is used as input for join/split.
   */
  export function encoder(...x: any): any

  /**
```
{ encode: ['a', 'b'] -> 'a.b', decode: 'a.b' -> ['a', 'b'] }
```
   * An encoder using `.` as the separator.
   */
  export function dotEncoder(...x: any): any

  /**
```
{ encode: ['a', 'b'] -> 'a/b', decode: 'a/b' -> ['a', 'b'] }
```
   * An encoder using `/` as the separator
   */
  export function slashEncoder(...x: any): any

  /**
```
((a, a) -> Boolean) -> [a] -> [[a]]
```
   * Returns an array of arrays, where each one of the arrays has one or more
   * elements of the original array, grouped by the first function received.
   * Similar to Haskell's [groupBy](http://zvon.org/other/haskell/Outputlist/groupBy_f.html).
   */
  export function chunkBy(...x: any): any

  /**
```
(any, array) -> array
```
   * Removes an element from an array if it's included in the array, or pushes
   * it in if it doesn't. Immutable (so it's a clone of the array).
   */
  export function toggleElement(...x: any): any

  /**
```
bool -> value -> list -> newList
```
   * Just like `toggleElement`, but takes an iteratee to determine if it should
   * remove or add. This is useful for example in situations where you might
   * have a checkbox that you want to represent membership of a value in a set
   * instead of an implicit toggle. Used by `includeLens`.
   */
  export function toggleElementBy(...x: any): any

  /**
```
f -> array -> [array[0], f(), array[n], ....)
```
   * Puts the result of calling `f` in between each element of the array. `f` is
   * a standard lodash iterator taking the value, index, and list. If `f` isn't
   * a function, it will treat `f` as the value to intersperse. See
   * https://ramdajs.com/docs/#intersperse.
   * 
   * **Note:** Intersperse can be used with JSX components! Specially with the
   * `differentLast` iterator:
   * 
   * Example with words (`toSentence` is basically this flowed into a `_.join('')`): 
```
F.intersperse(differentLast(() => 'or', () => 'or perhaps'), ['first', 'second', 'third'])
//=> ['first', 'or', 'second', 'or perhaps', 'third']
```
   * Example with React and JSX:
```
let results = [1, 2, 3]
return <div>
  <b>Results:</b>
  <br/>
  {
    _.flow(
      _.map(x => <b>{x}</b>),
      F.intersperse(F.differentLast(() => ', ', () => ' and '))
    )(results)
  }
</div>
```
   * Output:
   * > **Results:**
   * >
   * > **1**, **2** and **3**.
   * 
   */
  export function intersperse(...x: any): any


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

  /**
```

```
   * 
   */
  export function fn(...x: any): any

  /**
```

```
   * 
   */
  export function fn(...x: any): any

}