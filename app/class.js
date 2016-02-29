// strict mode only
// Classes are in fact "special functions"
"use strict";


////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
//var p = new Polygon(); // ReferenceError You first need to declare your class and then access it
class Polygon {

  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  get area(){
    return this.cacArea();
  }

  calcArea() {
    return this.height * this.width;
  }

}
var p = new Polygon(1,2);
console.log(p.height+" : "+p.width);


////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// unnamed
var PolygonA = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

// named
var PolygonB = class PolygonB {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

var pa = new PolygonA(3,4);
var pb = new PolygonB(5,6);

console.log(pa.height+" : "+pa.width);
console.log(pb.height+" : "+pb.width);

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.sqrt(dx*dx + dy*dy);
    }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));



////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
class Animal { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}
new Animal("SomeAnimal").speak();
new Dog("Adog").speak();

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
class Cat { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(this.name + ' roars.');
  }
}

new Lion('lion').speak();

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
var CalculatorMixin = Base => class extends Base {
  calc() { }
};

var RandomizerMixin = Base => class extends Base {
  randomize() { }
};

class Foo { }
//class Bar extends CalculatorMixin(RandomizerMixin(Foo)) { }
