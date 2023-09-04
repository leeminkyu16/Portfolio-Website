import { ObjectResume } from "portfolio-website-shared";
import { ReactNode } from "react";
import { SetCenterViewStateAction } from "../../store/components/center_view/center_view_actions_types";
import { CenterViewState } from "../../store/components/center_view/center_view_types";

export interface LeftBarProps {
	objectResume: ObjectResume;
	syncResume: (() => void) | null;
	setCenterViewStateAction: (centerViewStateParam: CenterViewState) => SetCenterViewStateAction;
	children?: ReactNode;
}
