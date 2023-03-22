export class Greeting {
  constructor(public name: string) {}
  say() {
    console.log(`Hello ${this.name}`);
  }
}