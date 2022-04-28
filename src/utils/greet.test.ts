import {greet} from "./greet"

test("greet returns a string, greeting the passed name", () => {
    expect(greet("Christian")).toBe("Hello, Christian!")
})