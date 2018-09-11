import isValid from './isValid';

// works on strings only
export default function isArrayValidAndNotEmpty(string) {
  if (!isValid(string)) return false;
  if (string === '') return false;
  return true;
}