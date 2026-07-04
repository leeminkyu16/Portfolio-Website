import React from "react";
import {
	LANGUAGE_LABELS,
	LANGUAGE_ORDER,
	Language,
} from "../../enums/language";
import { RootState } from "../../state";
import { settingsSliceActions } from "../../state/SettingsSlice/SettingsSlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import "./LanguageToggle.scss";

interface LanguageToggleProps {
	// Extra class so each view can theme the control (galaxy / stars / classic).
	className?: string;
}

// EN · 한국어 · Français · 日本語 switcher. Dispatches the shared
// SettingsSlice.language so every ResumeCard across Classic, Galaxy, and Stars
// re-renders in the chosen language at once.
const LanguageToggle: React.FunctionComponent<LanguageToggleProps> = ({
	className = "",
}: LanguageToggleProps): JSX.Element => {
	const active = useAppSelector(
		(state: RootState): Language => state.settings.language,
	);
	const dispatch = useAppDispatch();

	return (
		<div
			className={`language-toggle ${className}`.trim()}
			role="radiogroup"
			aria-label="Content language"
		>
			{LANGUAGE_ORDER.map((language: Language): JSX.Element => {
				const isActive = language === active;
				return (
					<button
						key={language}
						type="button"
						role="radio"
						aria-checked={isActive}
						lang={
							language === Language.KOREAN
								? "ko"
								: language === Language.JAPANESE
									? "ja"
									: undefined
						}
						className={`language-toggle__option${
							isActive ? " language-toggle__option--active" : ""
						}`}
						onClick={(): void => {
							dispatch(
								settingsSliceActions.setLanguage(language),
							);
						}}
					>
						{LANGUAGE_LABELS[language]}
					</button>
				);
			})}
		</div>
	);
};

export { LanguageToggle };
