/* eslint-disable @typescript-eslint/no-explicit-any */

declare const describe: any;
declare const it: any;
declare const expect: any;

import { middleware } from "../middleware";

describe("middleware", () => {
  it("is defined", () => {
    expect(middleware).toBeDefined();
  });
});
