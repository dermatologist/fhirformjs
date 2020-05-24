export default interface VueFormGeneratorField {

    type?: string,
    inputType?: string,
    label?: string,
    model?: string,
    id?: string,
    values?: Array<string>,
    placeholder?: string,
    readonly?: boolean,
    disabled?: boolean,
    featured?: boolean,
    required?: boolean,
    default?: boolean,
    hint?: string,
    validator?: object
    textOn?: string,
    textOff?: string,
    dateTimePickerOptions?: any
  } 