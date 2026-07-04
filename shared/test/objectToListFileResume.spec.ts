import { objectToListFileResume } from "../src/functions/object_to_list_file_resume/ObjectToListFileResume";
import { ObjectResume } from "../src/types/object_resume/ObjectResume";
import { ObjectResumeSubsectionTemplateItemType } from "../src/types/object_resume/ObjectResumeSubsectionTemplateItemType";
import { ObjectToListFileResumeOption } from "../src/types/object_to_list_file_resume/ObjectToListFileResumeOptions";

const itemType: ObjectResumeSubsectionTemplateItemType = "Text";

const minimalObjectResume: ObjectResume = [
    {
        uniqueId: 1,
        title: { english: "Test Section", french: "Section Test" },
        data: [
            {
                uniqueId: 2,
                title: { english: "Test Sub", french: "Sous-test" },
                cardSize: "large",
                template: [
                    {
                        uniqueId: 0,
                        itemType: itemType,
                        additionalParam: null,
                    },
                ],
                data: [
                    {
                        uniqueId: 0,
                        resumeItems: [{ english: "Hello", french: "Bonjour" }],
                    },
                ],
            },
        ],
    },
];

const BASE_PATH = "src/assets/resume";
const defaultOptions: ObjectToListFileResumeOption = { indentSize: 4 };

describe("objectToListFileResume", () => {
    describe("basic output shape", () => {
        let outputMap: Map<string, string>;

        beforeEach(() => {
            outputMap = new Map<string, string>();
            objectToListFileResume(
                outputMap,
                minimalObjectResume,
                BASE_PATH,
                defaultOptions,
            );
        });

        it("produces a non-empty Map", () => {
            expect(outputMap.size).toBeGreaterThan(0);
        });

        it("contains the root index.ts file", () => {
            expect(outputMap.has(`${BASE_PATH}/index.ts`)).toBe(true);
        });

        it("contains the section index.ts file", () => {
            // stringToDirectoryName("Test Section") => "test_section"
            expect(outputMap.has(`${BASE_PATH}/test_section/index.ts`)).toBe(
                true,
            );
        });

        it("contains the subsection index.ts file", () => {
            // objectResumeSubsectionTitleToUtilitarianName("Test Sub") => "Test Sub"
            // stringToDirectoryName("Test Sub") => "test_sub"
            expect(
                outputMap.has(`${BASE_PATH}/test_section/test_sub/index.ts`),
            ).toBe(true);
        });
    });

    describe("root index.ts content", () => {
        let content: string;

        beforeEach(() => {
            const outputMap = new Map<string, string>();
            objectToListFileResume(
                outputMap,
                minimalObjectResume,
                BASE_PATH,
                defaultOptions,
            );
            content = outputMap.get(`${BASE_PATH}/index.ts`) as string;
        });

        it("content is a non-empty string", () => {
            expect(typeof content).toBe("string");
            expect(content.length).toBeGreaterThan(0);
        });

        it("contains an import statement", () => {
            expect(content).toContain("import");
        });

        it("contains an export statement", () => {
            expect(content).toContain("export");
        });

        it("contains a const declaration", () => {
            expect(content).toContain("const");
        });

        it("imports the ListResume type", () => {
            expect(content).toContain("ListResume");
        });

        it("exports the resume variable", () => {
            expect(content).toContain("resume");
        });
    });

    describe("indentSize option changes indentation in output", () => {
        // The leaf data file is a JSON-serialized value whose indentation is
        // driven by indentSize (the root/index wiring files are not nested).
        const DATA_PATH = `${BASE_PATH}/test_section/test_sub/test_sub_data.ts`;

        const generate = (indentSize: number): string => {
            const map = new Map<string, string>();
            objectToListFileResume(map, minimalObjectResume, BASE_PATH, {
                indentSize,
            });
            return map.get(DATA_PATH) as string;
        };

        it("indentSize 4 and indentSize 2 produce different content for the same file", () => {
            expect(generate(4)).not.toBe(generate(2));
        });

        it("indentSize 4 output contains 4-space indented lines where indentSize 2 would use 2 spaces", () => {
            expect(generate(4)).toMatch(/^ {4}\S/m);
            expect(generate(2)).toMatch(/^ {2}\S/m);
        });
    });
});
