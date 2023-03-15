function bar() {/* ... */ }

export const funcs = {
  bar,
};

// 'foo' no longer takes a parameter, but calls 'bar' from an object
export function foo() {
  funcs.bar();
}