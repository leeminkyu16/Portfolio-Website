import { PayloadAction, Reducer, Slice, createSlice } from "@reduxjs/toolkit";
import {
	booleanToString,
	stringToBoolean,
} from "./../../functions/StringBooleanAdapters";
import { PrivacyModalSliceState } from "./PrivacyModalSliceTypes";

const SHOW_PRIVACY_MODAL_KEY = "SHOW_PRIVACY_MODAL_KEY";

const initialState: PrivacyModalSliceState =
	typeof window !== "undefined"
		? ({
				showPrivacyPolicyModal: stringToBoolean(
					localStorage.getItem(SHOW_PRIVACY_MODAL_KEY),
					true,
				),
		  } as PrivacyModalSliceState)
		: ({
				showPrivacyPolicyModal: true,
		  } as PrivacyModalSliceState);

const privacyModalSlice: Slice<PrivacyModalSliceState> = createSlice({
	name: "privacyModal",
	initialState: initialState,
	reducers: {
		setShowPrivacyPolicyModal: (
			state,
			action: PayloadAction<boolean>,
		): void => {
			localStorage.setItem(
				SHOW_PRIVACY_MODAL_KEY,
				booleanToString(action.payload),
			);
			state.showPrivacyPolicyModal = action.payload;
		},
	},
});

export const privacyModalSliceReducer: Reducer<PrivacyModalSliceState> =
	privacyModalSlice.reducer;
export const privacyModalSliceActions = privacyModalSlice.actions;
