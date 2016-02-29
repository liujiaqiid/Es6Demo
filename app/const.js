// The const declaration creates a read-only reference to a value. 
// It does not mean the value it holds is immutable, just that the variable identifier cannot be reassigned.
// Syntax: const name1 = value1 [, name2 = value2 [, ... [, nameN = valueN]]];
//

var func = function () {
  const TITLE = "my title";
  const A = 1, B = 2;
  A = 2 ; //fail silently !!
  //const A = 2; //redeclare a constant throws an error !! 
  //const FOO; // SyntaxError: missing = in const declaration
  console.log("A: " + A);
  
  const MY_OBJECT = {"key": "value"};
  MY_OBJECT = {"key": "thisValue"};// Overwriting the object fails
  console.log(MY_OBJECT.key);
  MY_OBJECT.key = "otherValue";//However, object attributes are not protected
  console.log(MY_OBJECT.key);
}

func();
