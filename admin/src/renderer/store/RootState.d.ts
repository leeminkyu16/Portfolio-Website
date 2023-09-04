import { CenterViewState } from "./components/center_view/center_view_types";
import { ResumeState } from "./components/resume/resume_reducer";

export interface RootState {
	resume: ResumeState;
	centerViewState: CenterViewState;
}
