import { execSync } from "child_process";
import path from "path";

const scriptPath = path.resolve(__dirname, "../scripts/check-dicts.js");

describe("check-dicts.js", () => {
  it("prints diagnostics (missing keys or validation results)", () => {
    let output = "";
    try {
      output = execSync(`node ${scriptPath}`, {
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
      });
    } catch (err: any) {
      output = (err.stdout?.toString() || "") + (err.stderr?.toString() || "");
    }
    expect(output).toMatch(/Missing|passed strict validation|failed strict validation/i);
  });
});
