import { ListResume } from "../../types/list_resume/ListResume";
import awards from "./awards";
import experience from "./experience";
import projects from "./projects";
import skills from "./skills";

const resume: ListResume = [experience, skills, projects, awards];

export default resume;
