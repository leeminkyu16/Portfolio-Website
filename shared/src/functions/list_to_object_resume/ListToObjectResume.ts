import { ListResume } from "../../types/list_resume/ListResume";
import { ListResumeSection } from "./../../types/list_resume/ListResumeSection";
import { ObjectResume } from "./../../types/object_resume/ObjectResume";
import { listToObjectResumeSection } from "./ListToObjectResumeSection";

export const listToObjectResume = (input: ListResume): ObjectResume => {
    const output: ObjectResume = input.map((inputItem: ListResumeSection) => {
        return listToObjectResumeSection(inputItem);
    });

    return output;
};
