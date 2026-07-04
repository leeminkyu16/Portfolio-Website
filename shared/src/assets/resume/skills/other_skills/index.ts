import { ListResumeSubsection } from "../../../../types/list_resume/ListResumeSubsection";
import otherSkillsData from "./other_skills_data";
import otherSkillsTemplate from "./other_skills_template";

const otherSkills: ListResumeSubsection = [
    2,
    ["Other Skills", "Autres compétences", "기타 기술", "その他のスキル"],
    "small",
    otherSkillsTemplate,
    otherSkillsData,
];

export default otherSkills;
