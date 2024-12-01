const input = Deno.readTextFileSync("input.txt");
const puzzles = input.split("\n\n");

const findMirrorX = (lines: string[]) => {
  const res = [];
  for (let i = 1; i < lines.length; i++) {
    const len = Math.min(i, lines.length - i);
    const left = lines.slice(i - len, i);
    const right = lines.slice(i, i + len);
    if (left.toReversed().join("|") === right.join("|")) {
      res.push(i);
    }
  }
  if (res.length) {
    console.log({ result: res });
  }
  return res;
};

const findMirror = (p: string) => {
  const rows = p.split("\n");
  const cols = rows[0]
    .split("").map((_, idx) => rows.map((s) => s[idx]).join(""));
  return [findMirrorX(rows), findMirrorX(cols)];
};

const replace = (s: string, i: number) => {
  const arr = s.split("");
  const T = arr[i] === "." ? "#" : ".";
  arr[i] = T;
  return arr.join("");
};

let p1 = 0;
let p2 = 0;
console.log(puzzles.length);
puzzles.forEach((p) => {
  const [r, c] = findMirror(p);
  console.log({ rows: r, cols: c });

  p1 += (r[0] || 0) * 100 + (c[0] || 0);
  const arr = p.split("");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "\n") continue;
    let [_r, _c] = findMirror(replace(p, i));
    _r = _r.filter((i) => !r.includes(i));
    _c = _c.filter((i) => !c.includes(i));
    if (_r.length || _c.length) {
      p2 += (_r[0] || 0) * 100 + (_c[0] || 0);
      break;
    }
  }
});

// const part1 = (input: string) => {
//   return p1;
// };
// const part2 = (input: string) => {
//   return p2;
// };

// console.log(part1(""));
// console.log(part2(""));
console.log(p1);
console.log(p2);
