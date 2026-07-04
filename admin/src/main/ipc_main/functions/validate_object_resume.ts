import {
	ObjectResume,
	ObjectResumeSection,
	ObjectResumeSubsection,
	ObjectResumeSubsectionTemplateItem,
} from "portfolio-website-shared";

// The item types the file generator knows how to serialize. Kept in sync with
// ObjectResumeSubsectionTemplateItemType in shared; an unknown type would make
// the generator throw mid-export, so it is caught here with a clear message.
export const VALID_ITEM_TYPES = [
	"Heading1",
	"Heading1WithLink",
	"Heading2",
	"StartEndDate",
	"Text",
	"HTMLText",
	"TextTitlePair",
	"List",
	"HTMLList",
];

// Returns the first non-null result of `check` over `items`, or null if all pass.
// `??` short-circuits, so `check` stops being called once an error is found.
const firstError = <T>(items: T[], check: (item: T) => string | null): string | null =>
	items.reduce<string | null>((found, item): string | null => found ?? check(item), null);

// uniqueId of 0 is valid, so a plain falsy check is not enough.
const hasUniqueId = (id: unknown): boolean => typeof id === "number";

const validateTemplateItem = (
	item: ObjectResumeSubsectionTemplateItem,
	label: string,
): string | null => {
	if (!VALID_ITEM_TYPES.includes(item.itemType)) {
		return `${label}: unknown item type "${item.itemType}"`;
	}
	return null;
};

const validateSubsection = (
	subsection: ObjectResumeSubsection,
	sectionTitle: string,
): string | null => {
	const english = subsection.title?.english ?? "";
	const label = `Section "${sectionTitle}" subsection "${english}"`;

	if (!hasUniqueId(subsection.uniqueId)) return `${label}: missing uniqueId`;
	if (!subsection.title) return `${label}: missing title`;
	// An empty title is valid — it maps to the "proper" bundle. A title that is
	// non-empty but only whitespace has no such mapping and would produce empty
	// directory and variable names, so it is rejected.
	if (english.length > 0 && english.trim().length === 0) {
		return `${label}: title is only whitespace`;
	}
	if (!Array.isArray(subsection.template)) {
		return `${label}: template must be an array`;
	}
	if (!Array.isArray(subsection.data)) {
		return `${label}: data must be an array`;
	}

	const templateError = firstError(subsection.template, (item) =>
		validateTemplateItem(item, label),
	);
	if (templateError) return templateError;

	// Each data row is serialized column-by-column against the template, so a
	// row must carry exactly one item per template column.
	const misaligned = subsection.data.find(
		(bundle) =>
			!Array.isArray(bundle.resumeItems) ||
			bundle.resumeItems.length !== subsection.template.length,
	);
	if (misaligned) {
		return `${label}: a data row has ${
			Array.isArray(misaligned.resumeItems) ? misaligned.resumeItems.length : 0
		} item(s) but the template defines ${subsection.template.length} column(s)`;
	}

	return null;
};

const validateSection = (section: ObjectResumeSection): string | null => {
	if (!hasUniqueId(section.uniqueId)) return "Section missing uniqueId";
	if (!section.title?.english?.trim()) return "Section missing English title";
	return firstError(section.data, (subsection) =>
		validateSubsection(subsection, section.title.english),
	);
};

export const validateObjectResume = (resume: ObjectResume): string | null =>
	firstError(resume, validateSection);
