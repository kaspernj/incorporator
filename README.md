# incorporator

Yet another merger for JS.

## Usage

```js
import {incorporate} from "incorporator"

const data1 = {
  people: ["Kasper"],
  type: "nicePeople"
}

const data2 = {
  people: ["Christina"],
  mode: "lovelyPeople"
}

const merged = incorporate(data1, data2)

console.log(merged)
```

```js
{
  people: ["Kasper", "Christina"],
  type: "nicePeople",
  mode: "lovelyPeople"
}
```
