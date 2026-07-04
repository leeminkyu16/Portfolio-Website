import { ListResumeSubsectionData } from "../../types/list_resume/ListResumeSubsectionData";
import { ObjectResumeSubsection } from "../../types/object_resume/ObjectResumeSubsection";
import { objectToListResumeItem } from "./items/ObjectToListResumeItem";

// Inverse of listToObjectResumeSubsectionData: produces the ListResume tuple
// value for a subsection's data. Each item is converted using the item type at
// its column position in the subsection template.
export const objectToListResumeSubsectionData = (
    input: ObjectResumeSubsection,
): ListResumeSubsectionData => {
    return input.data.map((bundle) =>
        bundle.resumeItems.map((item, index) =>
            objectToListResumeItem(item, input.template[index].itemType),
        ),
    ) as ListResumeSubsectionData;
};
