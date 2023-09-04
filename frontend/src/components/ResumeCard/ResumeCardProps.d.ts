import { ListResumeItemBundle } from "portfolio-website-shared";
import { ListResumeSubsectionTemplate } from "portfolio-website-shared/src/types/list_resume/ListResumeSubsectionTemplate";

export type ResumeCardProps = {
	keyId: string;
	template: ListResumeSubsectionTemplate;
	data: ListResumeItemBundle;
};
