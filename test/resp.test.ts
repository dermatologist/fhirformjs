import { FhirJsonResp } from '../src/resp-mapper';

const quesR1 =
  '{"resourceType":"QuestionnaireResponse","item":[{"linkId":"1","text":"Do you have allergies?","answer":[{"valueBoolean":""}]},{"linkId":"2.1","text":"What is your gender?","answer":[{"valueString":""}]},{"linkId":"2.2","text":"What is your date of birth?","answer":[{"valueDate":""}]},{"linkId":"2.3","text":"What is your country of birth?","answer":[{"valueString":""}]},{"linkId":"2.4","text":"What is your marital status?","answer":[{"valueString":""}]},{"linkId":"3.1","text":"Do you smoke?","answer":[{"valueBoolean":""}]},{"linkId":"3.2","text":"Do you drink alchohol?","answer":[{"valueBoolean":""}]}],"status":"in-progress"}';
const formData =
  '{"1": true,"2": {"2.1": "Male", "2.2": "12/12/2020", "2.3": "Canada", "2.4": "Married"},"3": {"3.1": true,"3.2": true}}';

describe('map', () => {
  it('reads fhir questionnaireResponse', () => {
    console.log(JSON.stringify(quesR1));
  });
  it('maps formData to fhir response', () => {
    const ff: any = JSON.parse(
      FhirJsonResp(JSON.parse(quesR1), JSON.parse(formData))
    );
    console.log(JSON.stringify(ff));
  });
});
