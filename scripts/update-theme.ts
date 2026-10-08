import { execSync } from "node:child_process";

const UPSTREAM = "https://github.com/kamimen/astro-theme-shinbun.git";
const run = (cmd: string) => execSync(cmd, { stdio: "inherit" });
const read = (cmd: string) => execSync(cmd, { encoding: "utf8" }).trim();

try {
  read("git remote get-url upstream");
} catch {
  run(`git remote add upstream ${UPSTREAM}`);
}

run("git fetch upstream");
const before = read("git rev-parse HEAD");
try {
  run("git merge upstream/main --allow-unrelated-histories");
} catch {
  console.error("衝突があります。ファイルを直して、コミットしてください。");
  process.exit(1);
}
console.log(before === read("git rev-parse HEAD") ? "すでに最新です" : "更新しました");
