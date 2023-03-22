class Greeting {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log(`Hello ${this.name}`);
  }
}

export default Greeting;