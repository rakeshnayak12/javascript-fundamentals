### Array
Arrays are data types in which we can store multiple values of different types.
* `indexOf()` is used to get index of an element in array and `length` property returns length of array.
```js
let arr = [1, 2, 'a', 2];
console.log(arr.length); // 4 (returns length of array)
console.log(arr.indexOf(2)); // 1 (first occurrence of element form 0 index)
console.log(arr.indexOf(2, 2)); // 3 (first occurrence of element form index 2)
```
* `lastIndexOf()` returns the last index of an element in the array searching backwards from the index passed.
```js
let arr = [2, 3, 4, 5, 3];
console.log(arr.lastIndexOf(3,)); // 4
console.log(arr.lastIndexOf(3, 4)); // 4
console.log(arr.lastIndexOf(3, -1)); // 4
console.log(arr.lastIndexOf(3, 3)); // 1
```
* `includes()` checks if an element is present in the array.
```js
let arr = [2, 3, 4, 5];
console.log(arr.includes(4)); // true
```
* `concat()` creates new array consisting of elements of array passed as argument or the argument itself if it's not an array.This method doesn't change the array.
```js
let arr = [1, 2];
let add = ['a', 'b'];
console.log(arr.concat(3, add)); // [ 1, 2, 3, 'a', 'b' ]
```
* `pop()` remove the last item form the array and returns it.This method changes the length of array.
```js
let arr = [2, 3, 4, 5];
let poppedElement = arr.pop();
console.log(poppedElement, arr); // 5 [ 2, 3, 4 ]
```
* `shift()` removes the first element from the array and returns the element.It changes the array.
```js
let arr = [2, 3, 4, 5];
let firstElement = arr.shift();
console.log(firstElement, arr); // 2 [ 3, 4, 5 ]
```
* `push()` adds one or more element to the end of the array and returns the length of the array.
```js
let arr = [2, 3, 4, 5];
let length = arr.push(6, 7);
console.log(length, arr); // 6 [ 2, 3, 4, 5, 6, 7 ]
```
* `unshift()` adds one or more element to the beginning of the array and returns the length of the array.
```js
let arr = [2, 3, 4, 5];
let length = arr.unshift(0, 1);
console.log(length, arr); // 6 [ 0, 1, 2, 3, 4, 5 ]
```
* `reverse()` reverse the original array and returns the reference
```js
let arr = [2, 3, 4, 5];
let reversedArr = arr.reverse();
console.log(reversedArr, arr); // [ 5, 4, 3, 2 ] [ 5, 4, 3, 2 ]
```
* `for of` can be used to iterate over the array.
```js
let arr = [2, 3, 4, 5];
for(element of arr) {
    console.log(element); // prints all the element
}
```
* `arr.entries()` returns array iterator object.
```js
let arr = [1, 2, 3];
let itr = arr.entries();
console.log(itr.next().value);
for([index, element] of arr.entries()) {
    console.log(index, element);
}
```
**output:**
```
[ 0, 1 ]
0 1
1 2
2 3
```  
* `every()` takes a callback function and invokes it for each element and returns true if test implemented by the function passes for every element.This method doesn't change the array.
```js
let arr = [2, 3, 4];
let isPass = arr.every((element) => element<5);
console.log(isPass); // true
```
* `filter()` returns an array of elements which passes the test implemented by callback function.
```js
let arr = [2, 3, 4, 5];
let filterArr = arr.filter((element) => element > 3);
console.log(filterArr); // [4, 5] (empty array if no element satisfies the condition)
```
* `find()` returns the first element that passes the test implemented by the callback function.
```js
let arr = [2, 3, 4, 5];
let filterArr = arr.find((element) => element > 3);
console.log(filterArr); // 4 (undefined if not found)
```
* `findIndex()` returns the index of the first element that satisfies the test condition implemented by the callback function.
```js
let arr = [2, 3, 4, 5];
let filterArr = arr.findIndex((element) => element > 3);
console.log(filterArr); // 2 ( -1 if element not found )
```
* `forEach()` executes the callback function for each element.It's used to just iterate over all the element.We can't break out of `forEach()` and this method returns `undefined`.
```js
let arr = [2, 3, 4, 5];
let returnValue = arr.forEach((element, index) => console.log(index, element + 3)); // adds 3 and prints all element along with the index
console.log(returnValue, arr); // undefined [ 2, 3, 4, 5 ]
```
* `join()`returns a new string by joining elements of array with commas or with specified separator.
```js
et arr = [2, 3, 4, 5];
console.log(arr.join()); // 2,3,4,5
console.log(arr.join('')); // 2345 (empty string)
```
#### Slice and Splice
* `slice()` returns a shallow copy of the array starting from the  fromIndex up to but not including endIndex. Changing the copied array won't change the original array.
```js
let arr = [2, 3, 4, 5];
let slicedArr = arr.slice(0, 3);
console.log(slicedArr, arr); // [ 2, 3, 4 ] [ 2, 3, 4, 5 ]
```
* `splice(startIndex, numberOfItemsToDelete, itemToInsert)` deletes or inserts elements to the array and returns array containing the deleted items.
```js
let arr = [2, 3, 4, 5];
let slicedArr = arr.splice(1, 2); // removes 2 items starting from index 1
console.log(slicedArr, arr); // [ 3, 4 ] [ 2, 5 ]
let char = ['a', 'd'];
char.splice(1,0, 'b', 'c'); // insert b and c at index 1 without removing 
console.log(char); // [ 'a', 'b', 'c', 'd' ]
```
#### Map, Filter & Reduce
* `map()` creates a new array with the modified elements implemented inside the passed callback function.
* Don't use `map()` unless you're not using the array it returns or you're not returning a value from the callback.
```js
let arr = [2, 3, 4, 5];
const mappedArr = arr.map(element => element*2);
console.log(mappedArr, arr); // [ 4, 6, 8, 10 ] [ 2, 3, 4, 5 ]
```
* `filter()` creates new array with all the elements that passed the conditione implemented by the callback function.
```js
let arr = [2, 3, 4, 5];
function findEven(number) {
    if(number % 2 === 0) {
        return true;
    }
}
const evenArr = arr.filter(findEven);
console.log(evenArr, arr); // [ 2, 4 ] [ 2, 3, 4, 5 ]
```
* `reduce()` function takes a callback function and results a single output value. The callback function takes four arguments but first two(accumulator, currentValue) are most important.
* Accumulator accumulates the returned value by the callback function and current value represents the current element of the array.
```js
