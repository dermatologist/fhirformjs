import VueFormGeneratorField from "field";
import VueFormGeneratorGroup from 'group';

export default interface VueFormGeneratorSchema {

    fields?: Array<VueFormGeneratorField>
    groups?: Array<VueFormGeneratorGroup>
  }
  