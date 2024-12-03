import { submit } from "./api/submit.ts";
import { run } from "./run.ts";

const SESSION = Deno.env.get("SESSION")!;
const YEAR = Deno.args[0] ?? new Date().getFullYear();
const DATE = Deno.args[1] ?? new Date().getDate();
const formattedDate = `0${DATE}`.slice(-2);
const files = [...Deno.readDirSync(`./src/${YEAR}/${formattedDate}`)].map((
  e,
) => e.name)
  .map((filename) => {
    return {
      filename,
      mtime: Deno.statSync(`./src/${YEAR}/${formattedDate}/${filename}`).mtime,
    };
  });
const mostRecent =
  files.sort((a, b) => b.mtime!.getTime() - a.mtime!.getTime())[0];
const PART = Deno.args[2] ?? mostRecent.filename.match(/[\d]/)![0];
const ATTEMPT = await run(YEAR, DATE, PART);
await submit(YEAR, DATE, PART, SESSION, ATTEMPT);
