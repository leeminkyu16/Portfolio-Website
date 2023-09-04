import { ListResumeInternationalizedString } from "../list_resume/general/ListResumeInternationalizedString";
import { ListResumeSubsectionTemplateItemType } from "./ListResumeSubsectionTemplateItemType";
import { ListResumeUniqueId } from "./general/ListResumeUniqueId";

export type ListResumeSubsectionTemplateItem = [
    ListResumeUniqueId,
    ListResumeSubsectionTemplateItemType,
    ListResumeInternationalizedString?,
];
