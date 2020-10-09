import { FhirJsonForm } from '../src/ques-mapper';
import { Testq1 } from '../examples/testq1';

describe('map', () => {
  it('maps fhir schema to json schema', () => {
    const ff: any = JSON.parse(FhirJsonForm(Testq1));
    console.log(JSON.stringify(ff.schema));
  });
  it('maps fhir to response', () => {
    const ff: any = JSON.parse(FhirJsonForm(Testq1));
    console.log(JSON.stringify(ff.model));
  });
  it('maps fhir to ui', () => {
    const ff: any = JSON.parse(FhirJsonForm(Testq1));
    console.log(JSON.stringify(ff.uischema));
  });
});
