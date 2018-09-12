import getDisplayString from './getDisplayString';
import isValid from './isValid';
import _ from 'lodash';

export default function getBloodPressureString(vital, type) {
  if (isValid(vital.component)) {    
    const matchingBloodPressure = vital.component.filter((component) => type === getDisplayString(component, 'code'));
    if (matchingBloodPressure.length > 0) {
      const bloodPressure = matchingBloodPressure[0];
      const text = getDisplayString(bloodPressure, 'code');
      let value = '';
      let unit = '';
      if (isValid(bloodPressure.valueQuantity)) {
        value = isValid(bloodPressure.valueQuantity.value) ? bloodPressure.valueQuantity.value : '';
        unit = isValid(bloodPressure.valueQuantity.unit) ? bloodPressure.valueQuantity.unit : '';
      }
      return `${text} ${_.round(value, 2)} ${unit}`;
    }
  }
  return '';
}