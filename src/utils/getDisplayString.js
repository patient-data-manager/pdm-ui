export default function getDisplayString(object, field) {
  if (object[field] !== undefined) {
    if (object[field].text) return object[field].text;
    if (object[field].coding[0].display) return object[field].coding[0].display;
  }
  return '';
}