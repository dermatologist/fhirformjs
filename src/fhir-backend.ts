// Based on SMART on FHIR Example Backend Service App @ https://github.com/smart-on-fhir/sample-apps-stu3/tree/master/backend-service
import axios from 'axios'
import { R4 } from '@ahryman40k/ts-fhir-types';
export class FhirBackend {

        baseUrl: string = "http://hapi.fhir.org/baseR4"
        questionnaireBundle: R4.IBundle | undefined

        constructor(baseUrl: string){
            if(baseUrl != '')
                this.baseUrl = baseUrl;
        };

        async initialize() {

            this.questionnaireBundle = await axios.get(this.baseUrl + '/Questionnaire')

        }

        getQuestionnaires(): R4.IBundle | undefined {
            return this.questionnaireBundle;
        }


}

