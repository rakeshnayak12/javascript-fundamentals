### Data types
Javascript has both primitive and object types.
#### Primitive Types
Javascript has seven primitive types
1. number (represents integer, floats)
2. string (sequence of character)
3. boolean (true or false)
4. undefined (declared but value has not assigned)
5. null (no value)
6. symbol (has unique value)
7. bigint
* All primitive types are immutable
* Primitive types don't have method of their own but when we try to access the method on a primitive type, js engine wraps the constructor of suitable type on the primitive type and run the method and returns the value.After the method is finished executing, the object would be garbage collected.