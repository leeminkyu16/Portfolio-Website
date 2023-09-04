import { ListResumeUniqueId } from "./general/ListResumeUniqueId";
import { ListResumeSectionData } from "./ListResumeSectionData";
import { ListResumeSectionTitle } from "./ListResumeSectionTitle";

export type ListResumeSection = [
    ListResumeUniqueId,
    ListResumeSectionTitle,
    ListResumeSectionData,
];
