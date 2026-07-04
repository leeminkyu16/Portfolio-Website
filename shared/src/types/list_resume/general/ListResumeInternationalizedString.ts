// [english, french, korean, japanese]. Korean and Japanese are optional so
// existing 2-tuple data still type-checks; a missing translation falls back to
// English at conversion/render time.
export type ListResumeInternationalizedString =
    | [string, string]
    | [string, string, string]
    | [string, string, string, string];
