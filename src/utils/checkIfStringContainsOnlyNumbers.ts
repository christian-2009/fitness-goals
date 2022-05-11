export default function checkIfStringContainsOnlyNumbers(string: string) {
    if ((/^[0-9]+$/).test(string)) {
      return true;
    }
  }