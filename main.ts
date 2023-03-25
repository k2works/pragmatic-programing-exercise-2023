import { serve } from "./depos.ts";

const port = 8080;
const s = serve({ port: port });
console.log(`http://localhost:${port}/`);

for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}