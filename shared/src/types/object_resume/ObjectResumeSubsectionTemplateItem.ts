import { ObjectResumeInternationalizedString } from "../object_resume/general/ObjectResumeInternationalizedString";
import { ObjectResumeSubsectionTemplateItemType } from "./ObjectResumeSubsectionTemplateItemType";
import { ObjectResumeUniqueId } from "./general/ObjectResumeUniqueId";

export type ObjectResumeSubsectionTemplateItem = {
    uniqueId: ObjectResumeUniqueId;
    itemType: ObjectResumeSubsectionTemplateItemType;
    // `null` (not undefined) is the canonical "no additional param" value:
    // it is what the parser emits, so both representations stay consistent.
    additionalParam: ObjectResumeInternationalizedString | null;
};
