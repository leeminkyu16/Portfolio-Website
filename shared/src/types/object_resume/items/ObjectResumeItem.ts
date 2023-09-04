import { ObjectResumeHeading1Item } from "./ObjectResumeHeading1Item";
import { ObjectResumeHeading1WithLinkItem } from "./ObjectResumeHeading1WithLinkItem";
import { ObjectResumeHeading2Item } from "./ObjectResumeHeading2Item";
import { ObjectResumeHtmlListItem } from "./ObjectResumeHtmlListItem";
import { ObjectResumeHtmlTextItem } from "./ObjectResumeHtmlTextItem";
import { ObjectResumeListItem } from "./ObjectResumeListItem";
import { ObjectResumeStartEndDateItem } from "./ObjectResumeStartEndDateItem";
import { ObjectResumeTextItem } from "./ObjectResumeTextItem";
import { ObjectResumeTextTitlePairItem } from "./ObjectResumeTextTitlePairItem";

export type ObjectResumeItem =
    | ObjectResumeHeading1Item
    | ObjectResumeHeading1WithLinkItem
    | ObjectResumeHeading2Item
    | ObjectResumeStartEndDateItem
    | ObjectResumeTextItem
    | ObjectResumeListItem
    | ObjectResumeHtmlTextItem
    | ObjectResumeHtmlListItem
    | ObjectResumeTextTitlePairItem;
