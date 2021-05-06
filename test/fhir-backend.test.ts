import { FhirBackend } from '../src/fhir-backend'
import { R4 } from '@ahryman40k/ts-fhir-types';

describe('Testing Fhir Backend', () => {

    const backend = new FhirBackend('');
    beforeAll( async () => {
        await backend.initialize()
    });

    it('gets questionnaires on FHIR server', async () => {

        if(backend.getQuestionnaires() != undefined){
            const bundle: R4.IBundle = backend.getQuestionnaires()
            expect(bundle.resourceType).toBe('Bundle')
        }else{
            throw new Error("Bundle not found");
        }
    });

    it('gets table of contents', async () => {
        const toc: unknown = backend.getTableOfContents()
        expect(toc).toBeTruthy()
    });

    it('gets single questionnaire', async () => {
        if (backend.getQuestionnaire('2050148') != undefined) {
            const questionnaire: R4.IResourceList = backend.getQuestionnaire('2050148')!
            expect(questionnaire.id).toBe('2050148')
        } else {
            throw new Error("Bundle not found");
        }
    });
});