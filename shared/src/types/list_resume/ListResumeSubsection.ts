import { ListResumeUniqueId } from "./general/ListResumeUniqueId";
import { ListResumeSubsectionCardSize } from "./ListResumeSubsectionCardSize";
import { ListResumeSubsectionData } from "./ListResumeSubsectionData";
import { ListResumeSubsectionTemplate } from "./ListResumeSubsectionTemplate";
import { ListResumeSubsectionTitle } from "./ListResumeSubsectionTitle";

export type ListResumeSubsection = [
    ListResumeUniqueId,
    ListResumeSubsectionTitle,
    ListResumeSubsectionCardSize,
    ListResumeSubsectionTemplate,
    ListResumeSubsectionData,
];
