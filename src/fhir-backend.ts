import axios from 'axios'
import { R4 } from '@ahryman40k/ts-fhir-types';

/**
 *
 */
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
            return  this.questionnaireBundle?.entry?.find(entry => {
                return entry.resource?.id  === id
            })
        }
}

