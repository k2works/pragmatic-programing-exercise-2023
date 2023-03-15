import sinon from "https://cdn.skypack.dev/sinon";
import { assertEquals } from "https://deno.land/std@0.179.0/testing/asserts.ts";
import { foo, funcs } from "./my_file.js";

Deno.test("calls bar during execution of foo", () => {
  // create a test spy that wraps 'bar' on the 'funcs' object
  const spy = sinon.spy(funcs, "bar");

  // call function 'foo' without an argument
  foo();

  assertEquals(spy.called, true);
  assertEquals(spy.getCalls().length, 1);
});