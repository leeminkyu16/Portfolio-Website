import { getStringLiteral } from "../../src/functions/file_string_utils/GetStringLiteral";
import { stringToDirectoryName } from "../../src/functions/file_string_utils/StringToDirectoryName";
import { stringToVariableName } from "../../src/functions/file_string_utils/StringToVariableName";

describe("getStringLiteral", () => {
    // The generated string literal must be valid TS/JSON so the emitted
    // source file compiles. JSON.parse round-tripping proves it is escaped.
    const roundTrips = (input: string): boolean =>
        JSON.parse(getStringLiteral(input)) === input;

    it("wraps a plain string in double quotes", () => {
        expect(getStringLiteral("hello")).toBe('"hello"');
    });

    it("escapes embedded double quotes", () => {
        expect(roundTrips('he said "hi"')).toBe(true);
    });

    it("escapes backslashes", () => {
        expect(roundTrips("C:\\path\\to\\file")).toBe(true);
    });

    it("escapes newlines and tabs", () => {
        expect(roundTrips("line1\nline2\tend")).toBe(true);
    });

    it("neutralizes template-literal injection", () => {
        expect(roundTrips("${process.exit(1)}")).toBe(true);
    });

    it("handles the empty string", () => {
        expect(roundTrips("")).toBe(true);
    });
});

describe("stringToDirectoryName", () => {
    it("lowercases", () => {
        expect(stringToDirectoryName("Work")).toBe("work");
    });

    it("replaces every space, not just the first", () => {
        expect(stringToDirectoryName("Work Experience Stuff")).toBe(
            "work_experience_stuff",
        );
    });

    it("collapses slashes and punctuation into single underscores", () => {
        expect(stringToDirectoryName("Programming/Markup Languages")).toBe(
            "programming_markup_languages",
        );
    });

    it("trims leading and trailing separators", () => {
        expect(stringToDirectoryName("  Skills!  ")).toBe("skills");
    });
});

describe("stringToVariableName", () => {
    it("camel-cases multi-word input", () => {
        expect(stringToVariableName("Work Experience")).toBe("workExperience");
    });

    it("lowercases a single word", () => {
        expect(stringToVariableName("Skills")).toBe("skills");
    });

    it("does not throw on an empty string", () => {
        expect(() => stringToVariableName("")).not.toThrow();
    });

    it("does not throw on consecutive spaces", () => {
        expect(() => stringToVariableName("Work  Experience")).not.toThrow();
        expect(stringToVariableName("Work  Experience")).toBe("workExperience");
    });

    it("does not throw on leading/trailing spaces", () => {
        expect(() => stringToVariableName("  Work ")).not.toThrow();
    });

    it("splits on non-alphanumeric characters", () => {
        expect(stringToVariableName("Programming/Markup Languages")).toBe(
            "programmingMarkupLanguages",
        );
    });

    it("prefixes an underscore when the result starts with a digit", () => {
        expect(stringToVariableName("3D Modeling")).toBe("_3DModeling");
    });

    it("produces a valid identifier body from punctuation-heavy input", () => {
        expect(stringToVariableName("C++ & Rust")).toBe("cRust");
    });
});
