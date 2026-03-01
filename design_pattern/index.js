// task1
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getDetails() {
        return `${this.name} is ${this.age} years old`;
    }
}

class SchoolStudent extends Student {
    constructor(name, age) {
        super(name, age);
        this.level = "School";
    }
}

class UniversityStudent extends Student {
    constructor(name, age) {
        super(name, age);
        this.level = "University";
    }
}

class StudentFactory {
    static createStudent(type, name, age) {
        if (type === "school") {
            return new SchoolStudent(name, age);
        } 
        else if (type === "university") {
            return new UniversityStudent(name, age);
        }  
        else {
            console.log("Invalid student type");
        }
    }
}

let s1 = StudentFactory.createStudent("school", "youmna", 18);
console.log(s1);
let s2 = StudentFactory.createStudent("university", "ali", 23);
console.log(s2);


// task2
class Counter {
    constructor() {
        if (Counter.instance) {
            return Counter.instance;
        }

        this.count = 0;
        Counter.instance = this;
    }

    increase() {
        this.count++;
    }

    getCount() {
        return this.count;
    }
}