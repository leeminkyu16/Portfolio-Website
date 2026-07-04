export type ObjectResumeInternationalizedString = {
    english: string;
    french: string;
    // Optional so the admin editor (which currently exposes only English and
    // French fields) still constructs valid objects; a missing translation
    // falls back to English on both write and render.
    korean?: string;
    japanese?: string;
};
