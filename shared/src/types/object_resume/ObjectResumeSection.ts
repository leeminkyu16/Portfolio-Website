import { ObjectResumeUniqueId } from "./general/ObjectResumeUniqueId";
import { ObjectResumeSectionData } from "./ObjectResumeSectionData";
import { ObjectResumeSectionTitle } from "./ObjectResumeSectionTitle";

export type ObjectResumeSection = {
    uniqueId: ObjectResumeUniqueId;
    title: ObjectResumeSectionTitle;
    data: ObjectResumeSectionData;
};
