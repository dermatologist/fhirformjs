# fhirformjs

[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://github.com/dermatologist/fhir-questionnaire-render-react)
[![npm](https://img.shields.io/npm/dt/fhirformjs)](https://www.npmjs.com/package/fhirformjs)
[![Build](https://github.com/dermatologist/fhirformjs/workflows/CI/badge.svg)](https://nuchange.ca)
[![Documentation](https://badgen.net/badge/icon/documentation?icon=libraries&label)](https://dermatologist.github.io/fhirformjs/)
## About
Creating, maintaining and using forms for health data capture is vital, and [FHIRForm](https://github.com/E-Health/fhirform) is a framework for that. FHIRFormJS is one of its components (an npm module) that helps create input forms corresponding to a [FHIR questionnaire](https://www.hl7.org/fhir/questionnaire.html). FHIRFormJS does not render forms but converts FHIR questionnaire into a schema and lets other libraries (such as [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) ) do the heavy lifting. An output mapper that maps the output from a react-jsonschema-form to a [QuestionnaireResponse](https://www.hl7.org/fhir/questionnaireresponse.html) is also available. [Checkout this example React app](https://github.com/dermatologist/fhir-questionnaire-render-react) to see how it is used. This is a modern alternative to [LHC-Forms](https://lhncbc.github.io/lforms/)

FHIRFormJS is WIP (not production ready). Pull requests are welcome (See CONTRIBUTING.md) and add issues and feature requests by clicking on the 'issues' tab. :point_up:

## Installation
```
npm i --save fhirformjs
```

## Usage example (In a React component)
* FHIRFormJS is framework independent and can be used with other frameworks such as Vue / Angular.
* *Testq1 is a FHIR Questionnaire object*
```
import { FhirJsonForm, FhirJsonResp } from 'fhirformjs'
import Form from "@rjsf/core"
  const resp = FhirJsonForm(Testq1)
  let formData = {}
  let respData = {}
  function handleSubmit(data){
    respData = FhirJsonResp(resp.model, data, resp.schema)
    console.log(JSON.stringify(respData))
  }
  return (
    <div className="App">
      <header className="App-header">
        <Form schema={resp.schema}
        uiSchema={resp.uiSchema}
        formData={formData}
        onSubmit={e => handleSubmit(e.formData)}
        />
      </header>
    </div>
  );
```
### [See an example](https://github.com/dermatologist/fhir-questionnaire-render-react) :point_left:

## Author

* [Bell Eapen](https://nuchange.ca) [![Twitter Follow](https://img.shields.io/twitter/follow/beapen?style=social)](https://twitter.com/beapen)

## Contributor(s)
* [Marco Ferreira](https://rco.cc) [![Twitter Follow](https://img.shields.io/twitter/follow/marfife?style=social)](https://twitter.com/marfife)
