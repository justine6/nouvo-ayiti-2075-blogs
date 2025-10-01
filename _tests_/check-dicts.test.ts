import { execSync } from "child_process";
import path from "path";

const scriptPath = path.join(__dirname, "..", "scripts", "checks", "check-dicts.mjs");

describe("check-dicts.mjs", () => {
  it("prints diagnostics (missing keys or validation results)", () => {
    let output: string;

    try {
      // Run the check script and capture output
      output = execSync(`node ${scriptPath}`, { encoding: "utf8" });
    } catch (err: any) {
      // Capture error output if the script fails validation
      output = (err.stdout?.toString() || "") + (err.stderr?.toString() || "");
    }

    // Expect script to print some diagnostic info
    expect(output).toMatch(/Missing|passed strict validation|failed strict validation/i);
  });
});
