import { listToObjectResumeItem } from "../../src/functions/list_to_object_resume/items/ListToObjectResumeItem";
import { objectToListFileResume } from "../../src/functions/object_to_list_file_resume/ObjectToListFileResume";
import { objectToListResumeItem } from "../../src/functions/object_to_list_resume/items/ObjectToListResumeItem";
import { ListResumeSubsectionTemplateItem } from "../../src/types/list_resume/ListResumeSubsectionTemplateItem";
import { ObjectResume } from "../../src/types/object_resume/ObjectResume";
import { ObjectResumeSubsectionTemplateItemType } from "../../src/types/object_resume/ObjectResumeSubsectionTemplateItemType";

describe("listToObjectResumeItem", () => {
    it("parses a Text item", () => {
        const template: ListResumeSubsectionTemplateItem = [0, "Text"];
        expect(listToObjectResumeItem(["hello", "bonjour"], template)).toEqual({
            english: "hello",
            french: "bonjour",
        });
    });

    it("throws on an unknown item type instead of returning garbage", () => {
        const template = [
            0,
            "NotARealType",
        ] as unknown as ListResumeSubsectionTemplateItem;
        expect(() => listToObjectResumeItem(["x", "y"], template)).toThrow(
            /NotARealType/,
        );
    });
});

describe("objectToListResumeItem", () => {
    it("converts a Text item to its list tuple value", () => {
        expect(
            objectToListResumeItem(
                { english: "hello", french: "bonjour" },
                "Text",
            ),
        ).toEqual(["hello", "bonjour"]);
    });

    it("throws on an unknown item type instead of returning garbage", () => {
        const itemType =
            "NotARealType" as unknown as ObjectResumeSubsectionTemplateItemType;
        expect(() =>
            objectToListResumeItem({ english: "x", french: "" }, itemType),
        ).toThrow(/NotARealType/);
    });
});

describe("generated source escapes dangerous content", () => {
    // A resume text containing a double quote, backslash, and template-literal
    // marker must be escaped in the generated data file, otherwise the emitted
    // TypeScript would be invalid or injectable. JSON.stringify is the canonical
    // escaped form; assert the data file contains it and not the raw string.
    it("escapes quotes/backslashes when writing a data file", () => {
        const dangerous = 'he said "hi" \\ ${x}';
        const resume: ObjectResume = [
            {
                uniqueId: 1,
                title: { english: "Sec", french: "" },
                data: [
                    {
                        uniqueId: 2,
                        title: { english: "Sub", french: "" },
                        cardSize: "large",
                        template: [
                            {
                                uniqueId: 0,
                                itemType: "Text",
                                additionalParam: null,
                            },
                        ],
                        data: [
                            {
                                uniqueId: 0,
                                resumeItems: [
                                    { english: dangerous, french: "" },
                                ],
                            },
                        ],
                    },
                ],
            },
        ];

        const output = new Map<string, string>();
        objectToListFileResume(output, resume, "base", { indentSize: 4 });
        const dataFile = output.get("base/sec/sub/sub_data.ts") as string;

        expect(dataFile).toContain(JSON.stringify(dangerous));
        expect(dataFile).not.toContain(`"${dangerous}"`);
    });
});
