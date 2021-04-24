import { FhirJsonResp } from '../src/resp-mapper';
import { R4 } from '@ahryman40k/ts-fhir-types';
import { FhirJsonForm } from '../src/ques-mapper';
import { Testq1 } from '../examples/testq1';
import Fform from '../src/fhirForm';

const quesR1: R4.IQuestionnaireResponse = JSON.parse(
  '{"resourceType":"QuestionnaireResponse","item":[{"linkId":"1","text":"Do you have allergies?","answer":[{"valueBoolean":""}]},{"linkId":"2.1","text":"What is your gender?","answer":[{"valueString":""}]},{"linkId":"2.2","text":"What is your date of birth?","answer":[{"valueDate":""}]},{"linkId":"2.3","text":"What is your country of birth?","answer":[{"valueString":""}]},{"linkId":"2.4","text":"What is your marital status?","answer":[{"valueString":""}]},{"linkId":"3.1","text":"Do you smoke?","answer":[{"valueBoolean":""}]},{"linkId":"3.2","text":"Do you drink alchohol?","answer":[{"valueBoolean":""}]}],"status":"in-progress"}'
);
const formData =
  '{"1": true,"2": {"2.1": "Male", "2.2": "12/12/2020", "2.3": "Canada", "2.4": "Married"},"3": {"3.1": true,"3.2": true}}';

const parsedResponse: R4.IQuestionnaireResponse = JSON.parse(
  '      {"resourceType":"QuestionnaireResponse","item":[{"linkId":"1","text":"Do you have allergies?","answer":[{"valueBoolean":true}]},{"linkId":"sex","text":"Sex","answer":[{"valueCoding":null}]},{"linkId":"2.2","text":"What is your date of birth?","answer":[{"valueDate":"12/12/2020"}]},{"linkId":"2.3","text":"What is your country of birth?","answer":[{"valueString":"Canada"}]},{"linkId":"2.4","text":"What is your marital status?","answer":[{"valueString":"Married"}]},{"linkId":"3.1","text":"Do you smoke?","answer":[{"valueBoolean":true}]},{"linkId":"3.2","text":"Do you drink alchohol?","answer":[{"valueBoolean":true}]}],"status":"in-progress"}'
);

describe('map', () => {
  it('reads fhir questionnaireResponse', () => {
    expect(quesR1.resourceType).toBe('QuestionnaireResponse');
  });
  it('maps formData to fhir response', () => {
    const ff: Fform = FhirJsonForm(Testq1);
    const ffr: R4.IQuestionnaireResponse = FhirJsonResp(
      ff.model,
      JSON.parse(formData),
      ff.schema
    );
    expect(ffr).toEqual(parsedResponse);
  });
});
