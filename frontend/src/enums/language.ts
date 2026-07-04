// The four resume languages. The numeric value is the index into a
// ListResumeInternationalizedString tuple ([english, french, korean, japanese]),
// which is how ResumeCard selects the active-language value.
export enum Language {
	ENGLISH = "english",
	FRENCH = "french",
	KOREAN = "korean",
	JAPANESE = "japanese",
}

export const LANGUAGE_INDEX: Record<Language, number> = {
	[Language.ENGLISH]: 0,
	[Language.FRENCH]: 1,
	[Language.KOREAN]: 2,
	[Language.JAPANESE]: 3,
};

// Short label shown on the toggle, in each language's own script.
export const LANGUAGE_LABELS: Record<Language, string> = {
	[Language.ENGLISH]: "EN",
	[Language.KOREAN]: "한국어",
	[Language.FRENCH]: "FR",
	[Language.JAPANESE]: "日本語",
};

// Display order for the switcher: EN · 한국어 · Français · 日本語.
export const LANGUAGE_ORDER: Language[] = [
	Language.ENGLISH,
	Language.KOREAN,
	Language.FRENCH,
	Language.JAPANESE,
];
