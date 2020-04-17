### Inbuilt String Methods
* Strings can be crated by string constructor(`String`).Example: `let str = String('string')`
* The `length` property of string returns the length of a string
```js
let lenStr = 'this is a string'.length; // returns 16 (including spaces)
```
* Get characters from a specific position.Indexing starts form zero.
```js
return 'string'.charAt(1); // returns t
return 'string'[1] // returns t
``` 
* Add two strings
```js
return 'john' + 'smith';
return str += 'str to be added';
return str.concat(str1, str2, str3); // not recommended
```
* Find if a string ends with another string
```js
let str = 'hello world'
return str.endsWith('rld'); // returns true default length is str.length
return str.endsWith('llo', 5) // true because it takes substring of length 5
return str.endsWith('rd'); // returns false
```
* Find if a substring is present in side a string
```js
let str = 'hello world'
return str.includes('llo') // returns true searching starts from index 0 if not specified
return str.includes('llo', 3) // returns false searching starts form index 3 ('lo world') 
```
* Find index of a substring from a string
```js
let str = 'hello world'
return str.indexOf('rld'); // returns 8 searching starts from index 0
return str.indexOf('o', 5); // returns 7 searching starts from index 5