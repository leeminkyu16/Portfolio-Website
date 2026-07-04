import { ListResumeSubsection } from "../../../../types/list_resume/ListResumeSubsection";
import languagesData from "./languages_data";
import languagesTemplate from "./languages_template";

const languages: ListResumeSubsection = [
    1,
    ["Languages", "Langues", "언어", "言語"],
    "small",
    languagesTemplate,
    languagesData,
];

export default languages;
