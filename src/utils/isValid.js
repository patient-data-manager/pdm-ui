// works on any variable type
export default function isValid(property) {
  if (property === null || property === undefined) return false;
  return true;
}