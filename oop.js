class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return (`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        return (`${this.name} barks.`);
    }
}

export default Dog;