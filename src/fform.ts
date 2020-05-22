import { R4 } from '@ahryman40k/ts-fhir-types'
import VueFormGeneratorSchema from 'schema';

export default interface Fform {

    model: R4.IQuestionnaireResponse,
    schema: VueFormGeneratorSchema

}