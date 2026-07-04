import * as fs from "fs";
import * as path from "path";
import resumeArray from "../../src/assets/resume/index";
import { listToObjectResume } from "../../src/functions/list_to_object_resume/ListToObjectResume";
import { objectToListFileResume } from "../../src/functions/object_to_list_file_resume/ObjectToListFileResume";
import { ListResume } from "../../src/types/list_resume/ListResume";

// Golden round-trip: regenerating the checked-in resume source from the real
// data must reproduce exactly what is on disk. The committed files were run
// through Prettier (import sorting, array collapsing), so both sides are
// normalized through Prettier before comparison — this ignores pure formatting
// while catching any semantic change in the generated output. Serves as the
// safety net for refactors of the object -> file printer.
// Prettier v3's `format` is async and ships its own types.
import * as prettier from "prettier";

const SHARED_ROOT = path.resolve(__dirname, "../..");
const BASE_PATH = "src/assets/resume";

const format = (source: string): Promise<string> =>
    prettier.format(source, {
        parser: "typescript",
        // Referenced by module name so the checked-in files' organized import
        // order is reproduced without importing the untyped plugin directly.
        plugins: ["prettier-plugin-organize-imports"],
    });

describe("objectToListFileResume golden round-trip against real resume data", () => {
    const objectResume = listToObjectResume(resumeArray as ListResume);
    const generated = new Map<string, string>();
    objectToListFileResume(generated, objectResume, BASE_PATH, {
        indentSize: 4,
    });

    it("generates at least one file", () => {
        expect(generated.size).toBeGreaterThan(0);
    });

    it("reproduces every checked-in resume source file", async () => {
        const mismatches: string[] = [];

        for (const [relativePath, content] of generated) {
            const diskPath = path.join(SHARED_ROOT, relativePath);
            if (!fs.existsSync(diskPath)) {
                mismatches.push(`missing on disk: ${relativePath}`);
                continue;
            }
            const onDisk = fs.readFileSync(diskPath, "utf8");
            if ((await format(content)) !== (await format(onDisk))) {
                mismatches.push(`content differs: ${relativePath}`);
            }
        }

        expect(mismatches).toEqual([]);
    });
});
