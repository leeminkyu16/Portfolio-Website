import { ListResumeSection } from "../../../types/list_resume/ListResumeSection";
import languages from "./languages";
import otherSkills from "./other_skills";
import programmingLanguages from "./programming_languages";

const skills: ListResumeSection = [
    1,
    ["Skills", "Compétences", "기술", "スキル"],
    [programmingLanguages, languages, otherSkills],
];

export default skills;
