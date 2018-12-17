// Type definitions for Futil 1.55
// Project: https://github.com/smartprocure/futil-js
// Definitions by: Michelle Saad <https://github.com/michsa>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'futil-js' {

  import * as lodash from 'lodash'

  // Arrays
  // ------
  type Compactable<T> = _.List<T | null | undefined | false | '' | 0> | null | undefined
  type Range = [number, number]
  
  /**
```
joinString -> [string1, string2, ...stringN] -> string1 + joinString + string2 + joinString ... + stringN
```
  * Joins an array after compacting. Note that due to the underlying
  * behavior of `_.curry` no default `join` value is supported -- you must
  * pass in some string with which to perform the join.
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
    (xs: _.List<T>) => string
  

  /**
```
[a] -> [a]
```
  * Returns an array of elements that are repeated in the input array.
  * 
  * Note that `repeated` relies on `_.uniq` to reduce the array of repeated elements,
  * which uses [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
  * for equality comparisons. Therefore, the input array may contain only those
  * types which `SameValueZero` is able to compare for equality.
  */
  export function repeated<T>(xs: _.List<number | string | boolean | symbol | null | undefined>): 
    _.List<number | string | boolean | symbol | null | undefined>

  
  /**
```
([[], [], []]) -> [[], []]
```
  * 
  * Takes any number of ranges and return the result of merging them all.
  * 
  * @example [[0,7], [3,9], [11,15]] -> [[0,9], [11,15]]
  */
  export function mergeRanges(ranges: _.List<Range> | null | undefined): _.List<Range>
//  export function mergeRanges(...x: any): any

  /**
```
(val, array) -> array
```
  * 
  *  Return array with val pushed.
  */
  export function push<T>(val: T, array: _.List<T>): _.List<T>
  export function push(x?: any): any
}
