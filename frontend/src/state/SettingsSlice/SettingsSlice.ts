import { PayloadAction, Reducer, Slice, createSlice } from "@reduxjs/toolkit";
import { BackgroundShape } from "../../enums/background-shape";
import {
	booleanToString,
	stringToBoolean,
} from "../../functions/StringBooleanAdapters";
import { SettingsSliceState } from "./SettingsSliceTypes";

const BACKGROUND_SHAPE_KEY = "BACKGROUND_SHAPE_KEY";
const BACKGROUND_AUTO_ROTATE_KEY = "BACKGROUND_AUTO_ROTATE_KEY";
const SECTIONS_FADE_KEY = "SECTIONS_FADE_KEY";

const initialState: SettingsSliceState =
	typeof window !== "undefined"
		? ({
				backgroundShape:
					localStorage.getItem(BACKGROUND_SHAPE_KEY) ??
					BackgroundShape.SPHERE,
				showSettingsModal: false,
				backgroundAutoRotate: stringToBoolean(
					localStorage.getItem(BACKGROUND_AUTO_ROTATE_KEY),
					true,
				),
				sectionsFade: stringToBoolean(
					localStorage.getItem(SECTIONS_FADE_KEY),
					true,
				),
		  } as SettingsSliceState)
		: ({
				backgroundShape: BackgroundShape.SPHERE,
				showSettingsModal: false,
				backgroundAutoRotate: true,
				sectionsFade: true,
		  } as SettingsSliceState);

const settingsSlice: Slice<SettingsSliceState> = createSlice({
	name: "settings",
	initialState: initialState,
	reducers: {
		setBackgroundShape: (
			state,
			action: PayloadAction<BackgroundShape>,
		): void => {
			localStorage.setItem(BACKGROUND_SHAPE_KEY, action.payload);
			state.backgroundShape = action.payload;
		},
		setShowSettingsModal: (state, action: PayloadAction<boolean>): void => {
			state.showSettingsModal = action.payload;
		},
		setBackgroundAutoRotate: (
			state,
			action: PayloadAction<boolean>,
		): void => {
			localStorage.setItem(
				BACKGROUND_AUTO_ROTATE_KEY,
				booleanToString(action.payload),
			);
			state.backgroundAutoRotate = action.payload;
		},
		setSectionsFade: (state, action: PayloadAction<boolean>): void => {
			localStorage.setItem(
				SECTIONS_FADE_KEY,
				booleanToString(action.payload),
			);
			state.sectionsFade = action.payload;
		},
	},
});

export const settingsSliceReducer: Reducer<SettingsSliceState> =
	settingsSlice.reducer;
export const settingsSliceActions = settingsSlice.actions;
