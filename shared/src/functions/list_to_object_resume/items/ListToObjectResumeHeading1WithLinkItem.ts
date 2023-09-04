import { ListResumeHeading1WithLinkItem } from "./../../../types/list_resume/items/ListResumeHeading1WithLinkItem";
import { ObjectResumeHeading1WithLinkItem } from "./../../../types/object_resume/items/ObjectResumeHeading1WithLinkItem";
import { listToObjectResumeInternationalizedString } from "./../general/ListToObjectInternationalizedString";

export const listToObjectResumeHeading1WithLinkItem = (
    input: ListResumeHeading1WithLinkItem,
): ObjectResumeHeading1WithLinkItem => {
    const output: ObjectResumeHeading1WithLinkItem = {
        text: listToObjectResumeInternationalizedString(input[0]),
        link: input[1],
    };

    return output;
};
