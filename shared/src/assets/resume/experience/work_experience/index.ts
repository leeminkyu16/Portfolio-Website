import { ListResumeSubsection } from "../../../../types/list_resume/ListResumeSubsection";
import workExperienceData from "./work_experience_data";
import workExperienceTemplate from "./work_experience_template";

const workExperience: ListResumeSubsection = [
    0,
    ["Work Experience", "Expérience professionnelle", "직무 경력", "職務経歴"],
    "large",
    workExperienceTemplate,
    workExperienceData,
];

export default workExperience;
