import { ListResume } from "../../types/list_resume/ListResume";
import { ObjectResume } from "../../types/object_resume/ObjectResume";
import { objectToListResumeSection } from "./ObjectToListResumeSection";

// Inverse of listToObjectResume: converts a runtime ObjectResume back into the
// ListResume value. This is the pure-value counterpart to objectToListFileResume
// (which additionally splits the value across module files); together with
// listToObjectResume it forms an identity round-trip.
export const objectToListResume = (input: ObjectResume): ListResume => {
    return input.map(objectToListResumeSection);
};
