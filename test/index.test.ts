import { FhirFormVue } from '../src/fhirformvue';
import { Testq1 } from '../src/example/testq1'

describe('blah', () => {
  it('works', () => {
    expect(FhirFormVue(Testq1)).toBeDefined();
  });
});
