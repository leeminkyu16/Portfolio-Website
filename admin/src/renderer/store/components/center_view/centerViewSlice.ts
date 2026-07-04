import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CenterViewState {
	readonly sectionIndex: number;
	readonly subsectionIndex: number;
	readonly subsectionTemplateIndex: number;
}

const initialState: CenterViewState = {
	sectionIndex: -1,
	subsectionIndex: -1,
	subsectionTemplateIndex: -1,
};

const centerViewSlice = createSlice({
	name: "centerViewState",
	initialState,
	reducers: {
		setCenterViewState: (_state, action: PayloadAction<CenterViewState>): CenterViewState =>
			action.payload,
		setSectionIndex: (state, action: PayloadAction<number>): CenterViewState => ({
			...state,
			sectionIndex: action.payload,
		}),
		setSubsectionIndex: (state, action: PayloadAction<number>): CenterViewState => ({
			...state,
			subsectionIndex: action.payload,
		}),
		setSubsectionTemplateIndex: (state, action: PayloadAction<number>): CenterViewState => ({
			...state,
			subsectionTemplateIndex: action.payload,
		}),
	},
});

export const centerViewActions = centerViewSlice.actions;
export const centerViewReducer = centerViewSlice.reducer;
