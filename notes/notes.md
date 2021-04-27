## Licenser

"licenser.license": "MIT",
"licenser.author": "Bell Eapen",
"licenser.projectName": "FHIRFormJS",


## Validation

```
  // validation succeeded
  const schemaValidationResult = R4.RTTI_Questionnaire.decode(fhirjson); // => Right if good, Left if not
  const fhirq: R4.IQuestionnaire = schemaValidationResult.value as R4.IQuestionnaire;
```


## Release

* npm run lint
* gitflow -release
* change version in package.json
* npm run build
* npm publish --dry-run
* npm publish
* finish gitflw release
