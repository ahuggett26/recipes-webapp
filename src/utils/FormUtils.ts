import { Measurement } from "../model/Measurement";

export function clearAllFields() {
  Array.from(document.getElementsByTagName("input")).forEach((input) => {
    input.value = input.defaultValue;
    input.checked = input.defaultChecked;
  });
}

export function getFieldString(fieldId: string): string {
  return (document.getElementById(fieldId) as HTMLInputElement).value;
}

export function getFieldInt(fieldId: string): number {
  return Number.parseInt(getFieldString(fieldId));
}

export function getFieldFloat(fieldId: string): number {
  return Number.parseFloat(getFieldString(fieldId));
}

export function getFieldMeasurement(fieldId: string): Measurement {
  return getFieldString(fieldId) as Measurement;
}

export function isChecked(fieldId: string): boolean {
  return (document.getElementById(fieldId) as HTMLInputElement).checked;
}
