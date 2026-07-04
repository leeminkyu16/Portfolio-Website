import resumeArray from "../../src/assets/resume/index";
import { listToObjectResume } from "../../src/functions/list_to_object_resume/ListToObjectResume";
import { objectToListResume } from "../../src/functions/object_to_list_resume/ObjectToListResume";
import { ListResume } from "../../src/types/list_resume/ListResume";

// Pure-value identity round-trip: parsing a ListResume into an ObjectResume and
// converting it straight back must reproduce the original value exactly. Unlike
// the golden file test this needs no Prettier and no disk I/O, so it isolates
// the data conversion logic from formatting concerns.
describe("objectToListResume / listToObjectResume identity round-trip", () => {
    it("round-trips the real checked-in resume data", () => {
        const original = resumeArray as ListResume;
        expect(objectToListResume(listToObjectResume(original))).toEqual(
            original,
        );
    });

    it("round-trips a synthetic resume exercising every item type", () => {
        // Template columns cover all nine item types; the single data row holds
        // one item per column in the same order.
        const synthetic: ListResume = [
            [
                7,
                ["Everything", "Tout"],
                [
                    [
                        9,
                        ["All Items", "Tous"],
                        "large",
                        [
                            [0, "Heading1"],
                            [1, "Heading1WithLink"],
                            [2, "Heading2"],
                            [3, "StartEndDate"],
                            [4, "Text"],
                            [5, "HTMLText"],
                            [6, "TextTitlePair", ["Label", "Étiquette"]],
                            [7, "List"],
                            [8, "HTMLList"],
                        ],
                        [
                            [
                                ["H1 en", "H1 fr"],
                                [["Link en", "Link fr"], "https://example.com"],
                                ["H2 en", "H2 fr"],
                                [
                                    ["2020", "2020"],
                                    ["2024", "2024"],
                                ],
                                ['Text with "quotes" \\ ${x}', "Texte"],
                                ["<b>html</b>", "<b>html fr</b>"],
                                ["Pair en", "Pair fr"],
                                [
                                    [0, ["Item A", "Article A"]],
                                    [1, ["Item B", "Article B"]],
                                ],
                                [[0, ["<i>x</i>", "<i>y</i>"]]],
                            ],
                        ],
                    ],
                ],
            ],
        ];

        expect(objectToListResume(listToObjectResume(synthetic))).toEqual(
            synthetic,
        );
    });
});
