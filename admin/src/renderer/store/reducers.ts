import { combineReducers } from "redux";
import { centerViewReducer } from "./components/center_view/center_view_reducer";
import { resumeReducer } from "./components/resume/resume_reducer";

import { RootState } from "./RootState";

export const rootReducer = combineReducers<RootState | undefined>({
	resume: resumeReducer,
	centerViewState: centerViewReducer,
});
