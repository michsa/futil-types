// Type definitions for Futil 1.55
// Project: https://github.com/smartprocure/futil-js
// Definitions by: Michelle Saad <https://github.com/michsa>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


// jazmine
// ansi shadow
declare module 'futil-js' {

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
  export function repeated<T>(xs: _.List<Equalable>): _.List<Equalable>
  type Equalable = number | string | boolean | symbol | null | undefined


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
  export function moveIndex<T extends any[]>(from: number, to: number, array: T): T


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
  export function cycle<T extends Equalable>(array: _.List<T>): (x: T) => T
  
  
  /**
```
(k, v, [a]) -> { k(a): v(a) }
```
   * Creates an object from an array by generating a key/value pair for each
   * element in the array using the key and value mapper functions.
   */
  export function arrayToObject<T, K extends Key, V>
    (k: Fn<T, K>, v: Fn<T, V>, array: T[]): {[k in K]: V}
  export function arrayToObject<T, K extends Key, V>
    (k: Fn<T, K>, v: Fn<T, V>): (array: T[]) => {[k in K]: V}
  export function arrayToObject<T, K extends Key, V>
    (k: Fn<T, K>): ArrayToObjectCurryee<T, K, V>

  type Fn<T, U> = (x: T) => U
  
  interface ArrayToObjectCurryee<T, K extends Key, V> {
    (v: (x: T) => V): (array: T[]) => {[k in K]: V},
    (v: (x: T) => V, array: T[]): {[k in K]: V}
  }
  
  
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
   * **Note:** `intersperse` can be used with JSX components! To see an example,
   * please check the official documentation at https://github.com/smartprocure/futil-js#intersperse.
   */
  export function intersperse(...x: any): any

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

  // export function findIndexed

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
   * ensures that the converger function accepts an array. 
   * 
   * However, it does **not** validate that the converger function's arguments
   * correctly correspond to the return types of the branch functions, so care
   * must still be taken to avoid runtime errors from mismatched functions.
   */
  export function converge<A extends unknown[], R>
      (converger: (...args: any[]) => R, branches: ((...args: A) => any)[]): 
          (...args: A) => R

          
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

  // export function throws
  
  // export function tapError
  
  // export function exists (alias: isNotNil)
  
  // export function isMultiple
  
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

  // export function isBlank
  
  // export function isNotBlank
  
  // export function isBlankDeep

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

  // export function isTraversable

  // export function traverse

  // export function walk

  // export function transformTree

  // export function reduceTree

  // export function treeToArrayBy

  // export function treeToArray

  // export function leaves

  // export function treeLookup

  // export function keyTreeByWith

  // Flat Tree
  // export function treeKeys

  // export function treeValues

  // export function treePath

  // export function flattenTree

  // export function flatLeaves

  // export function tree

}
