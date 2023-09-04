import { ObjectResumeUniqueId } from "./general/ObjectResumeUniqueId";
import { ObjectResumeItem } from "./items/ObjectResumeItem";

export type ObjectResumeItemBundle = {
    uniqueId: ObjectResumeUniqueId;
    resumeItems: ObjectResumeItem[];
};
