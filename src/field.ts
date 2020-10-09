export default interface FhirJsonField {
  type?: string;
  title?: string;
  default?: string;
  description?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
}
