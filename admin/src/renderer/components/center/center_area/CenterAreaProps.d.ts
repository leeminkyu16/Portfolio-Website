import { ReactNode } from "react";
import { CenterViewState } from "../../store/components/center_view/centerViewReducer";

export interface CenterAreaProps {
	centerViewState: CenterViewState;
	children?: ReactNode;
}
