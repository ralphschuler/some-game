export default class ArrayHelper extends Array {
  static removeElement(array, element) {
    const index = array.indexOf(element)
    if (index >= 0) {
      array.splice(index, 1)
    }
  }
}