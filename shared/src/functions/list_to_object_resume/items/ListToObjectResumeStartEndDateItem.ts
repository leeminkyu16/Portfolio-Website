import { ListResumeStartEndDateItem } from "./../../../types/list_resume/items/ListResumeStartEndDateItem";
import { ObjectResumeStartEndDateItem } from "./../../../types/object_resume/items/ObjectResumeStartEndDateItem";
import { listToObjectResumeInternationalizedString } from "./../general/ListToObjectInternationalizedString";
export const listToObjectResumeStartEndDateItem = (
    input: ListResumeStartEndDateItem,
): ObjectResumeStartEndDateItem => {
    const output: ObjectResumeStartEndDateItem = {
        startDate: listToObjectResumeInternationalizedString(input[0]),
        endDate: listToObjectResumeInternationalizedString(input[1]),
    };

    return output;
};
