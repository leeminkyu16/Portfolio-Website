import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";

// State is only ever updated immutably (controlled inputs dispatch new objects),
// so Immer's default auto-freeze and RTK's immutable/serializable checks are left
// enabled — they now guard against accidental in-place mutation.
const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

if (typeof module.hot !== "undefined") {
	module.hot.accept("./reducers", (): void =>
		store.replaceReducer(require("./reducers").rootReducer),
	);
}

export default store;
