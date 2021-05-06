// Based on SMART on FHIR Example Backend Service App @ https://github.com/smart-on-fhir/sample-apps-stu3/tree/master/backend-service
import axios from 'axios'
import { R4 } from '@ahryman40k/ts-fhir-types';

export interface FhirBackendToc {
    fullUrl?: string;
    id?: string;
}
export class FhirBackend {

        baseUrl: string = "http://hapi.fhir.org/baseR4"
        questionnaireBundle: R4.IBundle = {
            resourceType: "Bundle"
        }

        constructor(baseUrl: string){
            if(baseUrl != '')
                this.baseUrl = baseUrl;
        };

        async initialize() {

            const response = await axios.get(this.baseUrl + '/Questionnaire')
            this.questionnaireBundle = response.data
        }

        getQuestionnaires(): R4.IBundle {
            return this.questionnaireBundle;
        }

        getTableOfContents(){
            return this.questionnaireBundle?.entry?.map(entry => {return {fullUrl: entry.fullUrl, id: entry.resource?.id}})
        }

        getQuestionnaire(id: string){
            return this.questionnaireBundle?.entry?.find(entry => {
                console.log(entry.resource?.id?.toString() + id)
                entry.resource?.id?.toString() === id
            })
        }


}

