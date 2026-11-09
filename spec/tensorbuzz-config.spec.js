import {existsSync, readFileSync} from "node:fs"
import {dirname, join} from "node:path"
import {fileURLToPath} from "node:url"

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..")
const configFile = join(repoRoot, "tensorbuzz.yml")

// The build installs from package.json/package-lock.json and runs jasmine over
// spec/ against src/. Documentation and CI plumbing are the only repo content
// it provably never reads, so they are the only thing allowed behind a "!".
const excludedPathPatterns = ["!README.md", "!.github/**", "!.gitignore"]

const readPathPatterns = () => {
  const lines = readFileSync(configFile, "utf8").split("\n")
  const pathsIndex = lines.indexOf("paths:")

  if (pathsIndex < 0) {
    throw new Error("tensorbuzz.yml declares no paths block")
  }

  const patterns = []

  for (const line of lines.slice(pathsIndex + 1)) {
    if (!line.startsWith("  - ")) {
      break
    }

    patterns.push(line.slice(4).trim().replace(/^"|"$/g, ""))
  }

  return patterns
}

describe("tensorbuzz.yml", () => {
  const pathPatterns = readPathPatterns()

  it("is read as tensorbuzz.yml with no legacy peak_flow.yml beside it", () => {
    expect(existsSync(configFile)).toBe(true)
    expect(existsSync(join(repoRoot, "peak_flow.yml"))).toBe(false)
  })

  it("keeps the path filter fail-open", () => {
    expect(pathPatterns[0]).toBe("**")
  })

  it("excludes only the paths the build never reads", () => {
    expect(pathPatterns.filter((pattern) => pattern.startsWith("!"))).toEqual(excludedPathPatterns)
  })
})
