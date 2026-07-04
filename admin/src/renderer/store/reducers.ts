import { combineReducers } from "@reduxjs/toolkit";
import { resumeReducer } from "./components/resume/resumeSlice";
import { centerViewReducer } from "./components/center_view/centerViewSlice";

export const rootReducer = combineReducers({
	resume: resumeReducer,
	centerViewState: centerViewReducer,
});
