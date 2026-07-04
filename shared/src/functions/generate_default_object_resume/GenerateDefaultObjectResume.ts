import { ObjectResume } from "../../types/object_resume/ObjectResume";

// Monotonic floor so successive calls never repeat an id, even without any
// supplied context. Callers that already hold a resume should pass its ids via
// `existingIds` so generated ids sit above them and cannot collide.
let generateDefaultObjectResumeCounter = 0;

const generateDefaultObjectResume = (
    existingIds: number[] = [],
): ObjectResume => {
    const existingFloor =
        existingIds.length > 0 ? Math.max(...existingIds) + 1 : 0;
    const base = Math.max(existingFloor, generateDefaultObjectResumeCounter);

    const sectionId = base;
    const subsectionId = base + 1;
    generateDefaultObjectResumeCounter = base + 2;

    return [
        {
            uniqueId: sectionId,
            title: {
                english: "New Section",
                french: "Nouvelle Section",
                korean: "새 섹션",
                japanese: "新しいセクション",
            },
            data: [
                {
                    uniqueId: subsectionId,
                    title: {
                        english: "New Subsection",
                        french: "Nouvelle Sous-section",
                        korean: "새 하위 섹션",
                        japanese: "新しいサブセクション",
                    },
                    cardSize: "large",
                    template: [],
                    data: [],
                },
            ],
        },
    ];
};

export { generateDefaultObjectResume };
