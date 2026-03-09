

## 1️⃣ What is the difference between var, let, and const?

JavaScript provides three ways to declare variables: `var`, `let`, and `const`.

### var
- `var` is the older way of declaring variables.
- It is **function-scoped**, meaning it is accessible inside the function it is declared in.
- It can be **redeclared and updated**.

Example:

```javascript
var name = "John";
var name = "Mike"; // allowed
```

### let
- `let` was introduced in **ES6 (ECMAScript 2015)**.
- It is **block-scoped**, meaning it only works inside `{ }`.
- It can be **updated but cannot be redeclared** in the same scope.

Example:

```javascript
let age = 20;
age = 25; // allowed
```

### const
- `const` is also **block-scoped**.
- It **cannot be reassigned** after it is declared.
- It must be initialized when declared.

Example:

```javascript
const pi = 3.14;
// pi = 3.1416 ❌ not allowed
```

---

## 2️⃣ What is the spread operator (...)?

The **spread operator (`...`)** allows arrays or objects to be expanded into individual elements.

It is often used to **copy, merge, or pass values**.

Example with arrays:

```javascript
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];

console.log(newNumbers);
```

Output:

```
[1, 2, 3, 4, 5]
```

Example with objects:

```javascript
const user = { name: "Efaz", age: 20 };

const updatedUser = {
  ...user,
  city: "Dhaka"
};

console.log(updatedUser);
```

Output:

```
{ name: "Efaz", age: 20, city: "Dhaka" }
```

---

## 3️⃣ What is the difference between map(), filter(), and forEach()?

These are **array methods** used to process data inside arrays.

### map()

- Creates a **new array**
- Transforms each element

Example:

```javascript
const numbers = [1, 2, 3];

const doubled = numbers.map(num => num * 2);

console.log(doubled);
```

Output:

```
[2, 4, 6]
```

### filter()

- Creates a **new array**
- Returns elements that **match a condition**

Example:

```javascript
const numbers = [1, 2, 3, 4];

const evenNumbers = numbers.filter(num => num % 2 === 0);

console.log(evenNumbers);
```

Output:

```
[2, 4]
```

### forEach()

- Runs a function **for each element**
- **Does not return a new array**

Example:

```javascript
const numbers = [1, 2, 3];

numbers.forEach(num => {
  console.log(num);
});
```

This method is commonly used for **side effects like logging or updating the UI**.

---

## 4️⃣ What is an arrow function?

An **arrow function** is a shorter way to write functions in JavaScript.  
It was introduced in **ES6**.

Traditional function:

```javascript
function add(a, b) {
  return a + b;
}
```

Arrow function:

```javascript
const add = (a, b) => a + b;
```

Arrow functions are commonly used in callbacks and make code **shorter and easier to read**.

---

## 5️⃣ What are template literals?

**Template literals** allow you to create strings using backticks `` ` `` instead of quotes.

They allow:
- **Embedding variables inside strings**
- **Multi-line strings**

Example:

```javascript
const name = "Efaz";
const age = 20;

const message = `My name is ${name} and I am ${age} years old.`;

console.log(message);
```

Output:

```
My name is Efaz and I am 20 years old.
```

Template literals make it easier to combine text and variables in a clean way.

---

## Conclusion

Modern JavaScript features like `let`, `const`, arrow functions, the spread operator, and array methods such as `map()`, `filter()`, and `forEach()` help developers write **cleaner, more efficient, and more readable code**.