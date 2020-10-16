# Licenser

"licenser.license": "MIT",
"licenser.author": "Bell Eapen",
"licenser.projectName": "FHIRFormJS",


## Validation

```
  // validation succeeded
  const schemaValidationResult = R4.RTTI_Questionnaire.decode(fhirjson); // => Right if good, Left if not
  const fhirq: R4.IQuestionnaire = schemaValidationResult.value as R4.IQuestionnaire;
```
