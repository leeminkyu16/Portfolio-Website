import { ObjectResumeInternationalizedString } from "../object_resume/general/ObjectResumeInternationalizedString";
import { ObjectResumeSubsectionTemplateItemType } from "./ObjectResumeSubsectionTemplateItemType";
import { ObjectResumeUniqueId } from "./general/ObjectResumeUniqueId";

export type ObjectResumeSubsectionTemplateItem = {
    uniqueId: ObjectResumeUniqueId;
    itemType: ObjectResumeSubsectionTemplateItemType;
    additionalParam: ObjectResumeInternationalizedString | undefined;
};
