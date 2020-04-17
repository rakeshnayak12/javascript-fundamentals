### Array
Arrays are data types in which we can store multiple values of different types.
* `indexOf()` is used to get index of an element in array and `length` property returns length of array.
```js
let arr = [1, 2, 'a', 2];
console.log(arr.length); // 4 (returns length of array)
console.log(arr.indexOf(2)); // 1 (first occurrence of element form 0 index)
console.log(arr.indexOf(2, 2)); // 3 (first occurrence of element form index 2)
```
* `concat()` creates new array consisting of elements of array passed as argument or the argument itself if it's not an array.
```js
let arr = [1, 2];
let add = ['a', 'b'];
console.log(arr.concat(3, add)); // [ 1, 2, 3, 'a', 'b' ]
```
* `arr.entries()` returns array iterator object
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
* `every()` takes a callback function and invokes it for each element and returns true if test implemented by the function passes for every element.
```js
let arr = [2, 3, 4];
let isPass = arr.every((element) => element<5);
console.log(isPass); // true
```