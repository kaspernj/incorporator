import Incorporator from "../index.mjs"

describe("Incorporator", () => {
  it("replaces array values if the option is given", () => {
    const object1 = {
      testValues: ["Kasper", "Christina"]
    }
    const object2 = {
      testValues: ["Storm", "Lisa", "Karl"]
    }

    const incorporator = new Incorporator({objects: [object1, object2]})
    const result = incorporator.merge()

    expect(result).toEqual({testValues: ["Kasper", "Christina", "Storm", "Lisa", "Karl"]})
  })

  it("replaces array values if the option is given", () => {
    const object1 = {
      testValues: ["Kasper", "Christina"]
    }
    const object2 = {
      testValues: ["Storm", "Lisa", "Karl"]
    }

    const incorporator = new Incorporator({objects: [object1, object2]})

    incorporator.replaceArrayIfExists(true)

    const result = incorporator.merge()

    expect(result).toEqual({testValues: ["Storm", "Lisa", "Karl"]})
  })
})
