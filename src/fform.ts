import { R4 } from '@ahryman40k/ts-fhir-types';
import FhirJsonSchema from './schema';

export default interface Fform {
    model: R4.IQuestionnaireResponse;
    schema: FhirJsonSchema;
    uischema: any;
}
