import Incorporator, {incorporate} from "../index.mjs"

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

  it("merges an empty object and changes nothing", () => {
    const object = {
      firstName: "Kasper",
      age: 35
    }

    incorporate(object, {})

    expect(object).toEqual({
      firstName: "Kasper",
      age: 35
    })
  })

  it("merges an empty object into a nested object", () => {
    const object = {ransack: {account_id_eq: 1}}

    incorporate(object, {})

    expect(object).toEqual({ransack: {account_id_eq: 1}})
  })
})
