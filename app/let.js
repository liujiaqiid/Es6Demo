// strict mode only
// let expression
"use strict";
var j = 10;
for (var i = 1; i <= 5; i++) {
  let j = i;
  console.log("Item " + j + " .");
}
console.log("Item " + j);
