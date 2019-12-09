/**
 * Created by Pencroff on 09-Dec-2019.
 */

interface Config {
  name?: string;
  only?: boolean;
  skip?: boolean;
  [key: string]: any;
}

type Tester<Opts> = (opts: Opts, done?: jest.DoneCallback) => any;

export function cases<Opts extends Config>(title: string, tester: Tester<Opts>, testCases: ReadonlyArray<Opts>): void {
  describe(title, () => {
    testCases.forEach((testCase, index) => {
      let name = testCase.name || `case: ${index + 1}`;

      let testFn;
      if (testCase.only) {
        testFn = test.only;
      } else if (testCase.skip) {
        testFn = test.skip;
      } else {
        testFn = test;
      }

      let cb;
      if (tester.length > 1) {
        cb = (done: jest.DoneCallback) => tester(testCase, done);
      } else {
        cb = () => tester(testCase);
      }

      testFn(name, cb);
    });
  });
}
