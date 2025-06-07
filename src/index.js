const incorporate = (...objects) => {
  const incorporator = new Incorporator({objects})

  return incorporator.merge()
}

export {incorporate}

export default class Incorporator {
  constructor({objects}) {
    this.objects = objects
    this.replaceArrayIfExistsValue = false
  }

  replaceArrayIfExists(newValue) {
    this.replaceArrayIfExistsValue = newValue
  }

  merge() {
    return this.mergeObjects(...this.objects)
  }

  isPlainObject = (input) => {
    if (input && typeof input === "object" && !Array.isArray(input)) {
      return true
    }

    return false
  }

  mergeObjects = (firstObject, ...objects) => {
    for (const object of objects) {
      this.mergeObjectsInto(firstObject, object)
    }

    return firstObject
  }

  mergeArraysInto = (mergeIntoValue, ...arrays) => {
    for (const array of arrays) {
      for (const value of array) {
        if (!mergeIntoValue.includes(value)) {
          mergeIntoValue.push(value)
        }
      }
    }
  }

  mergeObjectsInto = (mergeInto, object) => {
    for (const key in object) {
      const value = object[key]

      if (key in mergeInto) {
        const mergeIntoValue = mergeInto[key]

        if (Array.isArray(value) && !this.replaceArrayIfExistsValue) {
          // Current value isn't an array - turn into array and then merge into that
          if (!Array.isArray(mergeIntoValue)) {
            mergeInto[key] = [mergeIntoValue]
          }

          this.mergeArraysInto(mergeInto[key], value)
        } else if (this.isPlainObject(mergeIntoValue) && this.isPlainObject(value)) {
          this.mergeObjectsInto(mergeIntoValue, value)
        } else {
          mergeInto[key] = value
        }
      } else {
        mergeInto[key] = value
      }
    }
  }
}
