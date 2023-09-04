import { ObjectResumeUniqueId } from "./general/ObjectResumeUniqueId";
import { ObjectResumeSubsectionCardSize } from "./ObjectResumeSubsectionCardSize";
import { ObjectResumeSubsectionData } from "./ObjectResumeSubsectionData";
import { ObjectResumeSubsectionTemplate } from "./ObjectResumeSubsectionTemplate";
import { ObjectResumeSubsectionTitle } from "./ObjectResumeSubsectionTitle";

export type ObjectResumeSubsection = {
    uniqueId: ObjectResumeUniqueId;
    title: ObjectResumeSubsectionTitle;
    cardSize: ObjectResumeSubsectionCardSize;
    template: ObjectResumeSubsectionTemplate;
    data: ObjectResumeSubsectionData;
};
