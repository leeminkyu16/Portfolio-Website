import { objectResumeSubsectionTitleToDirectoryName } from "../../src/functions/object_to_list_file_resume/utils/ObjectResumeSubsectionTitleToDirectoryName";
import { objectResumeSubsectionTitleToUtilitarianName } from "../../src/functions/object_to_list_file_resume/utils/ObjectResumeSubsectionTitleToUtilitarianName";
import { objectResumeSubsectionTitleToVariableName } from "../../src/functions/object_to_list_file_resume/utils/ObjectResumeSubsectionTitleToVariableName";
import { ObjectResumeInternationalizedString } from "../../src/types/object_resume/general/ObjectResumeInternationalizedString";

const title = (english: string): ObjectResumeInternationalizedString => ({
    english,
    french: "",
});

describe("objectResumeSubsectionTitleToUtilitarianName", () => {
    it('maps the empty title to "proper"', () => {
        expect(objectResumeSubsectionTitleToUtilitarianName(title(""))).toBe(
            "proper",
        );
    });

    it("maps the special Programming/Markup Languages title", () => {
        expect(
            objectResumeSubsectionTitleToUtilitarianName(
                title("Programming/Markup Languages"),
            ),
        ).toBe("programming languages");
    });

    it("passes an ordinary title through unchanged", () => {
        expect(
            objectResumeSubsectionTitleToUtilitarianName(
                title("Work Experience"),
            ),
        ).toBe("Work Experience");
    });
});

describe("subsection title to derived names", () => {
    it("derives a safe directory name for the special title", () => {
        expect(
            objectResumeSubsectionTitleToDirectoryName(
                title("Programming/Markup Languages"),
            ),
        ).toBe("programming_languages");
    });

    it("derives a valid variable name for the special title", () => {
        expect(
            objectResumeSubsectionTitleToVariableName(
                title("Programming/Markup Languages"),
            ),
        ).toBe("programmingLanguages");
    });

    it('derives "proper" names for the empty title', () => {
        expect(objectResumeSubsectionTitleToDirectoryName(title(""))).toBe(
            "proper",
        );
        expect(objectResumeSubsectionTitleToVariableName(title(""))).toBe(
            "proper",
        );
    });
});
