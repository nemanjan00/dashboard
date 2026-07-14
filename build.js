import { rmSync, mkdirSync, cpSync } from "node:fs";

const pkg = "node_modules/@nemanjan00/qrp";
const out = "vendor/qrp";

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

cpSync(`${pkg}/dist`, out, { recursive: true });
cpSync(`${pkg}/LICENSE`, `${out}/LICENSE`);

console.log("qrp copied to", out);
