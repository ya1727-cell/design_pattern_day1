// task1
class Teacher {
    constructor(name, subject) {
        this.name = name;
        this.display=function(){
            console.log(`Teacher: ${this.name}`);
        }
    }
}

class TeacherDecorator {
    constructor(teacher, salary, nationality, street) {
        this.name = teacher.name;
        this.salary = salary;
        this.nationality = nationality;
        this.street = street;
        this.display=function(){
            console.log(`Teacher: ${this.name}, Salary: ${this.salary}, Nationality: ${this.nationality}, Street: ${this.street}`);
        }
    }
}

let teacher1 = new Teacher("youmna");
teacher1.display();

let decoratedTeacher = new TeacherDecorator(
    teacher1,
    10000,
    "Egyptian",
    "elmesala Street"
);

console.log(decoratedTeacher);
decoratedTeacher.display();

// task2
console.log("task2");
class Country {
    getCountry(country) {
        return country + " data";
    }
}

class CountryProxy {
    constructor() {
        this.service = new Country();
        this.cache = {};
    }

    getCountry(country) {
        if (!this.cache[country]) {
            console.log("false");
            this.cache[country] = this.service.getCountry(country);
            return false;
        } else {
            console.log("true");
            return true;
        }
    }
}

let proxy = new CountryProxy();
proxy.getCountry("Egypt"); 
proxy.getCountry("Egypt"); 

// task3
console.log("task3");
class TV {
    increaseVolume() {
        console.log("TV volume increased");
    }

    decreaseVolume() {
        console.log("TV volume decreased");
    }

    mute() {
        console.log("TV muted");
    }
}

class Speaker {
    increaseVolume() {
        console.log("Speaker volume increased");
    }

    decreaseVolume() {
        console.log("Speaker volume decreased");
    }

    mute() {
        console.log("Speaker muted");
    }
}

class BasicController {
    constructor(device) {
        this.device = device;
    }

    increase() {
        this.device.increaseVolume();
    }

    decrease() {
        this.device.decreaseVolume();
    }
}

class AdvancedController extends BasicController {
    mute() {
        this.device.mute();
    }
}

let tv = new TV();
let speaker = new Speaker();

let basicController = new BasicController(tv);
basicController.increase();
basicController.decrease();

let advancedController = new AdvancedController(speaker);
advancedController.increase();
advancedController.mute();


// task4
console.log("task4");

class Item {
    constructor(name) {
        this.name = name;
    }

    getPages() {
        return 0;
    }

    show(indent = 0) {}
}

class Book extends Item {
    constructor(name, pages) {
        super(name);
        this.pages = pages;
    }

    getPages() {
        return this.pages;
    }

    show(indent = 0) {
        console.log(" ".repeat(indent) + `${this.name} - ${this.pages} pages`);
    }
}

class Box extends Item {
    constructor(name) {
        super(name);
        this.children = [];
    }

    add(item) {
        this.children.push(item);
    }

    remove(item) {
        this.children = this.children.filter(child => child !== item);
    }

    getPages() {
        return this.children.reduce((total, child) => total + child.getPages(), 0);
    }

    show(indent = 0) {
        console.log(" ".repeat(indent) + `${this.name} (Total: ${this.getPages()} pages)`);
        this.children.forEach(child => child.show(indent + 4));
    }
}
let bigBox = new Box("Big Box");

let book1 = new Book("Book A", 100);
let book2 = new Book("Book B", 120);

let smallBox = new Box("Small Box");
let book3 = new Book("Book C", 60);
let book4 = new Book("Book D", 80);

smallBox.add(book3);
smallBox.add(book4);

bigBox.add(book1);
bigBox.add(book2);
bigBox.add(smallBox);

bigBox.show();

// task5
console.log("task5");
class Inventory {
    check(product) {
        console.log(`Checking if ${product} is in stock`);
        return true;
    }
    reserve(product) {
        console.log(`${product} reserved in inventory.`);
    }
}

class Payment {
    pay(amount) {
        console.log(`Processing payment of $${amount}`);
        return true;
    }
}

class Shipping {
    ship(product) {
        console.log(`Shipping ${product}`);
    }
}

class Notification {
    send() {
        console.log("Confirmation sent to customer.");
    }
}

class OnlineStore {
    constructor() {
        this.inventory = new Inventory();
        this.payment = new Payment();
        this.shipping = new Shipping();
        this.notification = new Notification();
    }

    placeOrder(product, amount) {

        if (!this.inventory.check(product)){
            return console.log("Product not available");
        }

        this.inventory.reserve(product);
        if (!this.payment.pay(amount)){
            return console.log("Payment failed");
        }
        this.shipping.ship(product);
        this.notification.send();

        console.log("Order completed successfully!");
    }
}

let store = new OnlineStore();
store.placeOrder("Laptop", 20000);

// task6
console.log("task6");
class AbstractState {
    constructor(task) {
        this.task = task;
    }

    behavior() {
    }
}

class StateInProgress extends AbstractState {
    constructor(task) {
        super(task);
        console.log(`StateInProgress is created for task "${task.name}"`);
    }

    behavior() {
        console.log(`Task "${this.task.name}" is in progress`);
    }
}

class StateReadyForReview extends AbstractState {
    constructor(task) {
        super(task);
        console.log(`StateReadyForReview is created for task "${task.name}"`);
    }

    behavior() {
        console.log(`Task "${this.task.name}" is ready for review.`);
    }
}

class StateDone extends AbstractState {
    constructor(task) {
        super(task);
        console.log(`StateDone is created for task "${task.name}"`);
    }

    behavior() {
        console.log(`Task "${this.task.name}" is done.`);
    }
}

class Task {
    constructor(name, stateName) {
        this.name = name;
        switch(stateName) {
            case "IN_PROGRESS":
                this.state = new StateInProgress(this);
                break;
            case "READY_FOR_REVIEW":
                this.state = new StateReadyForReview(this);
                break;
            case "DONE":
                this.state = new StateDone(this);
                break;
            default:
                console.log("Unknown state, defaulting to IN_PROGRESS");
                this.state = new StateInProgress(this);
        }
    }

    doAction() {
        this.state.behavior();
    }

    setState(stateName) {
        switch(stateName) {
            case "IN_PROGRESS":
                this.state = new StateInProgress(this);
                break;
            case "READY_FOR_REVIEW":
                this.state = new StateReadyForReview(this);
                break;
            case "DONE":
                this.state = new StateDone(this);
                break;
            default:
                console.log("Unknown state, no change");
        }
    }
}

let task1 = new Task("Write report", "IN_PROGRESS");
task1.doAction();

task1.setState("READY_FOR_REVIEW");
task1.doAction();

task1.setState("DONE");
task1.doAction();

