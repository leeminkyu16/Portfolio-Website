import resumeArray from "../src/assets/resume/index";
import { listToObjectResume } from "../src/functions/list_to_object_resume/ListToObjectResume";
import { ListResume } from "../src/types/list_resume/ListResume";
import { ListResumeSection } from "../src/types/list_resume/ListResumeSection";
import { ListResumeSubsection } from "../src/types/list_resume/ListResumeSubsection";
import { ListResumeSubsectionData } from "../src/types/list_resume/ListResumeSubsectionData";
import { ListResumeSubsectionTemplate } from "../src/types/list_resume/ListResumeSubsectionTemplate";
import { ObjectResume } from "../src/types/object_resume/ObjectResume";

describe("listToObjectResume", () => {
    describe("with the real resumeArray", () => {
        let result: ObjectResume;

        beforeEach(() => {
            result = listToObjectResume(resumeArray);
        });

        it("returns an array", () => {
            expect(Array.isArray(result)).toBe(true);
        });

        it("returns 4 sections matching the 4 resume categories", () => {
            expect(result).toHaveLength(4);
        });

        it("every section has a numeric uniqueId", () => {
            result.forEach((section) => {
                expect(typeof section.uniqueId).toBe("number");
            });
        });

        it("every section has a non-empty title.english", () => {
            result.forEach((section) => {
                expect(typeof section.title.english).toBe("string");
                expect(section.title.english.length).toBeGreaterThan(0);
            });
        });

        it("every section has a data array", () => {
            result.forEach((section) => {
                expect(Array.isArray(section.data)).toBe(true);
            });
        });

        it("first section title is Experience", () => {
            expect(result[0].title.english).toBe("Experience");
        });
    });

    describe("with a minimal hand-crafted ListResume (single Text item)", () => {
        const template: ListResumeSubsectionTemplate = [[0, "Text"]];
        const subsectionData: ListResumeSubsectionData = [
            [["Hello", "Bonjour"]],
        ];
        const subsection: ListResumeSubsection = [
            200,
            ["Test Sub", "Sous-test"],
            "large",
            template,
            subsectionData,
        ];
        const section: ListResumeSection = [
            100,
            ["Test Section", "Section Test"],
            [subsection],
        ];
        const minimalListResume: ListResume = [section];

        let result: ObjectResume;

        beforeEach(() => {
            result = listToObjectResume(minimalListResume);
        });

        it("returns a single section", () => {
            expect(result).toHaveLength(1);
        });

        it("maps the section uniqueId correctly", () => {
            expect(result[0].uniqueId).toBe(100);
        });

        it("maps the section title to an object with english and french fields", () => {
            expect(result[0].title).toEqual({
                english: "Test Section",
                french: "Section Test",
            });
        });

        it("maps the section data to one subsection", () => {
            expect(result[0].data).toHaveLength(1);
        });

        it("maps the subsection uniqueId correctly", () => {
            expect(result[0].data[0].uniqueId).toBe(200);
        });

        it("maps the subsection title to an object with english and french fields", () => {
            expect(result[0].data[0].title).toEqual({
                english: "Test Sub",
                french: "Sous-test",
            });
        });

        it("maps the subsection cardSize", () => {
            expect(result[0].data[0].cardSize).toBe("large");
        });

        it("maps the template with one Text item", () => {
            expect(result[0].data[0].template).toHaveLength(1);
            expect(result[0].data[0].template[0].uniqueId).toBe(0);
            expect(result[0].data[0].template[0].itemType).toBe("Text");
            // additionalParam is null at runtime when the third tuple element is absent
            expect(result[0].data[0].template[0].additionalParam).toBeNull();
        });

        it("maps one item bundle in the subsection data", () => {
            expect(result[0].data[0].data).toHaveLength(1);
        });

        it("maps the Text item inside the bundle to an i18n object", () => {
            const bundle = result[0].data[0].data[0];
            expect(bundle.uniqueId).toBe(0);
            expect(bundle.resumeItems).toHaveLength(1);
            expect(bundle.resumeItems[0]).toEqual({
                english: "Hello",
                french: "Bonjour",
            });
        });
    });
});
