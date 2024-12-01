import { submit } from "./api/submit.ts";
import { run } from "./run.ts";

const SESSION = Deno.env.get("SESSION")!; // TS-Config disagrees with its existence even if I check it
const YEAR = Deno.args[0] ?? new Date().getFullYear();
const DATE = Deno.args[1] ?? new Date().getDate();
const PART = Deno.args[2] ?? 1;

const ATTEMPT = await run(YEAR, DATE, PART);
await submit(YEAR, DATE, PART, SESSION, ATTEMPT);
