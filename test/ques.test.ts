import { FhirJsonForm } from '../src/ques-mapper';
import { Testq1 } from '../examples/testq1';
import Fform from '../src/fhirForm';

describe('map', () => {
  it('maps fhir schema to json schema', () => {
    const ff: Fform = FhirJsonForm(Testq1);
    expect(ff.schema.title).toBe('f201');
  });
  it('maps fhir to response', () => {
    const ff: Fform = FhirJsonForm(Testq1);
    expect(ff.model.resourceType).toBe('QuestionnaireResponse');
  });
  it('maps fhir to ui', () => {
    const ff: Fform = FhirJsonForm(Testq1);
    expect(ff.uiSchema).toEqual({
      '2': { '2.2': { 'ui:widget': 'datetime' } },
      '3': {},
    });
  });
});
