export default function toFixed(value) {
  if (value && !Number.isInteger(value) && value.toFixed) {
    return value.toFixed(2);
  } else {
    return value;
  }
}