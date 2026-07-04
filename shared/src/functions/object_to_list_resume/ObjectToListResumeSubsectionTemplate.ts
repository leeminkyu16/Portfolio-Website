import { ListResumeSubsectionTemplate } from "../../types/list_resume/ListResumeSubsectionTemplate";
import { ObjectResumeSubsectionTemplate } from "../../types/object_resume/ObjectResumeSubsectionTemplate";
import { objectToListInternationalizedString } from "./general/ObjectToListResumeInternationalizedString";

// Inverse of listToObjectResumeSubsectionTemplate: produces the ListResume
// tuple value for a template. The optional additionalParam slot is only
// emitted when present, matching the source format.
export const objectToListResumeSubsectionTemplate = (
    input: ObjectResumeSubsectionTemplate,
): ListResumeSubsectionTemplate => {
    return input.map((item) =>
        item.additionalParam
            ? [
                  item.uniqueId,
                  item.itemType,
                  objectToListInternationalizedString(item.additionalParam),
              ]
            : [item.uniqueId, item.itemType],
    ) as ListResumeSubsectionTemplate;
};
