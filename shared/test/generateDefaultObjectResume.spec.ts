import { generateDefaultObjectResume } from "../src/functions/generate_default_object_resume/GenerateDefaultObjectResume";
import { ObjectResume } from "../src/types/object_resume/ObjectResume";

describe("generateDefaultObjectResume", () => {
    it("returns an array with exactly one section", () => {
        const result: ObjectResume = generateDefaultObjectResume();
        expect(result).toHaveLength(1);
    });

    it("the section has a non-empty title.english", () => {
        const result = generateDefaultObjectResume();
        expect(typeof result[0].title.english).toBe("string");
        expect(result[0].title.english.length).toBeGreaterThan(0);
    });

    it("the section has a non-empty title.french", () => {
        const result = generateDefaultObjectResume();
        expect(typeof result[0].title.french).toBe("string");
        expect(result[0].title.french.length).toBeGreaterThan(0);
    });

    it("the section contains exactly one subsection", () => {
        const result = generateDefaultObjectResume();
        expect(result[0].data).toHaveLength(1);
    });

    it("the subsection has an empty template array", () => {
        const result = generateDefaultObjectResume();
        expect(result[0].data[0].template).toEqual([]);
    });

    it("the subsection has an empty data array", () => {
        const result = generateDefaultObjectResume();
        expect(result[0].data[0].data).toEqual([]);
    });

    it("calling it twice produces a different section uniqueId each time", () => {
        const result1 = generateDefaultObjectResume();
        const result2 = generateDefaultObjectResume();
        expect(result1[0].uniqueId).not.toBe(result2[0].uniqueId);
    });

    it("calling it twice produces a different subsection uniqueId each time", () => {
        const result1 = generateDefaultObjectResume();
        const result2 = generateDefaultObjectResume();
        expect(result1[0].data[0].uniqueId).not.toBe(
            result2[0].data[0].uniqueId,
        );
    });

    it("the section uniqueId and subsection uniqueId are different within one call", () => {
        const result = generateDefaultObjectResume();
        expect(result[0].uniqueId).not.toBe(result[0].data[0].uniqueId);
    });

    it("returns numeric uniqueIds", () => {
        const result = generateDefaultObjectResume();
        expect(typeof result[0].uniqueId).toBe("number");
        expect(typeof result[0].data[0].uniqueId).toBe("number");
    });

    it("generates ids that do not collide with supplied existing ids", () => {
        const existing = [0, 1, 2, 3, 100];
        const result = generateDefaultObjectResume(existing);
        expect(existing).not.toContain(result[0].uniqueId);
        expect(existing).not.toContain(result[0].data[0].uniqueId);
        expect(result[0].uniqueId).toBeGreaterThan(100);
        expect(result[0].data[0].uniqueId).toBeGreaterThan(100);
    });

    it("still differs across calls when existing ids are supplied", () => {
        const r1 = generateDefaultObjectResume([5]);
        const r2 = generateDefaultObjectResume([5]);
        expect(r1[0].uniqueId).not.toBe(r2[0].uniqueId);
        expect(r1[0].data[0].uniqueId).not.toBe(r2[0].data[0].uniqueId);
    });
});
