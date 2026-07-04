import { ListResumeSubsection } from "../../../../types/list_resume/ListResumeSubsection";
import programmingLanguagesData from "./programming_languages_data";
import programmingLanguagesTemplate from "./programming_languages_template";

const programmingLanguages: ListResumeSubsection = [
    0,
    [
        "Programming/Markup Languages",
        "Langages de programmation et de balisage",
        "프로그래밍/마크업 언어",
        "プログラミング・マークアップ言語",
    ],
    "small",
    programmingLanguagesTemplate,
    programmingLanguagesData,
];

export default programmingLanguages;
