import {
	ObjectResume,
	listToObjectResume,
	resumeArray,
	ListResume,
} from "portfolio-website-shared";
import { validateObjectResume } from "../../src/main/ipc_main/functions/validate_object_resume";

// Builds a valid single-section resume; callers mutate it to create invalid cases.
const validResume = (): ObjectResume => [
	{
		uniqueId: 0,
		title: { english: "Experience", french: "" },
		data: [
			{
				uniqueId: 1,
				title: { english: "Work", french: "" },
				cardSize: "large",
				template: [{ uniqueId: 0, itemType: "Text", additionalParam: null }],
				data: [{ uniqueId: 0, resumeItems: [{ english: "Hello", french: "" }] }],
			},
		],
	},
];

describe("validateObjectResume", () => {
	it("accepts a valid resume", () => {
		expect(validateObjectResume(validResume())).toBeNull();
	});

	it("accepts the real checked-in resume data (regression: empty-title subsections)", () => {
		const real = listToObjectResume(resumeArray as ListResume);
		expect(validateObjectResume(real)).toBeNull();
	});

	it("allows an empty subsection title (maps to the 'proper' bundle)", () => {
		const resume = validResume();
		resume[0].data[0].title.english = "";
		expect(validateObjectResume(resume)).toBeNull();
	});

	it("rejects a whitespace-only subsection title", () => {
		const resume = validResume();
		resume[0].data[0].title.english = "   ";
		expect(validateObjectResume(resume)).toMatch(/whitespace/i);
	});

	it("rejects a missing section title", () => {
		const resume = validResume();
		resume[0].title.english = "";
		expect(validateObjectResume(resume)).toMatch(/section/i);
	});

	it("rejects an unknown template item type", () => {
		const resume = validResume();
		// deliberately corrupt the item type
		(resume[0].data[0].template[0] as { itemType: string }).itemType = "Nonsense";
		expect(validateObjectResume(resume)).toMatch(/Nonsense/);
	});

	it("rejects template/data column misalignment", () => {
		const resume = validResume();
		// template defines 1 column but the data row carries 2 items
		resume[0].data[0].data[0].resumeItems.push({
			english: "Extra",
			french: "",
		});
		expect(validateObjectResume(resume)).toMatch(/column/i);
	});

	it("reports the first error and stops", () => {
		const resume = validResume();
		resume[0].title.english = "";
		resume[0].data[0].title.english = "   ";
		// section error is encountered first
		expect(validateObjectResume(resume)).toMatch(/section/i);
	});
});
