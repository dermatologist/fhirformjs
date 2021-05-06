import { FhirBackend } from '../src/fhir-backend'

describe('Testing Fhir Backend', () => {


    it('counts questionnaires on FHIR server', async () => {
            const backend = new FhirBackend('');
            await backend.initialize()
            console.log(backend.getQuestionnaires())
            //expect(ff.schema.title).toBe('f201');
    });




});