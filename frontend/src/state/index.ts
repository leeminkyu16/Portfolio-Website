import { configureStore } from "@reduxjs/toolkit";
import { privacyModalSliceReducer } from "./PrivacyModalSlice/PrivacyModalSlice";
import { settingsSliceReducer } from "./SettingsSlice/SettingsSlice";

const store = configureStore({
	reducer: {
		settings: settingsSliceReducer,
		privacyModal: privacyModalSliceReducer,
	},
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
