import { ListResumeHeading1Item } from "./ListResumeHeading1Item";
import { ListResumeHeading1WithLinkItem } from "./ListResumeHeading1WithLinkItem";
import { ListResumeHeading2Item } from "./ListResumeHeading2Item";
import { ListResumeHtmlListItem } from "./ListResumeHtmlListItem";
import { ListResumeHtmlTextItem } from "./ListResumeHtmlTextItem";
import { ListResumeListItem } from "./ListResumeListItem";
import { ListResumeStartEndDateItem } from "./ListResumeStartEndDateItem";
import { ListResumeTextItem } from "./ListResumeTextItem";
import { ListResumeTextTitlePairItem } from "./ListResumeTextTitlePairItem";

export type ListResumeItem =
    | ListResumeHeading1Item
    | ListResumeHeading1WithLinkItem
    | ListResumeHeading2Item
    | ListResumeStartEndDateItem
    | ListResumeTextItem
    | ListResumeListItem
    | ListResumeHtmlTextItem
    | ListResumeHtmlListItem
    | ListResumeTextTitlePairItem;
