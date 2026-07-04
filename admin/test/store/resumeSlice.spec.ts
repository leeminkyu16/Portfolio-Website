import { ObjectResume, ObjectResumeSection } from "portfolio-website-shared";
import {
	resumeReducer,
	resumeActions,
	ResumeState,
} from "../../src/renderer/store/components/resume/resumeSlice";

const section = (uniqueId: number, english: string): ObjectResumeSection => ({
	uniqueId,
	title: { english, french: "" },
	data: [],
});

// Deep-freeze so any accidental in-place mutation by a reducer throws instead of
// silently passing — this is the invariant the controlled-input refactor relies on.
const frozenState = (value: ObjectResume): ResumeState => {
	value.forEach((s) => {
		Object.freeze(s.title);
		Object.freeze(s);
	});
	Object.freeze(value);
	return Object.freeze({ value });
};

describe("resumeReducer", () => {
	it("setResume replaces the whole resume", () => {
		const start = frozenState([section(0, "Old")]);
		const next = [section(1, "New A"), section(2, "New B")];

		const result = resumeReducer(start, resumeActions.setResume(next));

		expect(result.value).toEqual(next);
		expect(start.value).toEqual([section(0, "Old")]); // original untouched
	});

	it("setResumeSection replaces one section immutably and leaves the rest by reference", () => {
		const untouched = section(0, "Keep");
		const start = frozenState([untouched, section(1, "Replace me")]);

		const result = resumeReducer(
			start,
			resumeActions.setResumeSection({
				sectionIndex: 1,
				section: section(1, "Replaced"),
			}),
		);

		expect(result.value[1].title.english).toBe("Replaced");
		expect(result.value[0]).toBe(untouched); // unchanged section kept by reference
		expect(result.value).not.toBe(start.value); // new array produced
		expect(start.value[1].title.english).toBe("Replace me"); // original untouched
	});

	it("setResumeSectionData updates only the target section's data", () => {
		const start = frozenState([section(0, "S0"), section(1, "S1")]);
		const newData = [
			{
				uniqueId: 9,
				title: { english: "Sub", french: "" },
				cardSize: "medium" as const,
				template: [],
				data: [],
			},
		];

		const result = resumeReducer(
			start,
			resumeActions.setResumeSectionData({ sectionIndex: 0, sectionData: newData }),
		);

		expect(result.value[0].data).toEqual(newData);
		expect(result.value[1].data).toEqual([]);
	});

	it("does not mutate a frozen input state", () => {
		const start = frozenState([section(0, "S0")]);

		expect(() =>
			resumeReducer(
				start,
				resumeActions.setResumeSection({ sectionIndex: 0, section: section(0, "Changed") }),
			),
		).not.toThrow();
	});
});
