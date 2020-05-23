import { Ffvue } from '../src';
import { Testq1 } from '../src/example/testq1'

describe('blah', () => {
  it('works', () => {
    expect(Ffvue(Testq1)).toBeDefined();
  });
});
