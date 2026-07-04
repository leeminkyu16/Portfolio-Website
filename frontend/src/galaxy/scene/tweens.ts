import { Group } from "@tweenjs/tween.js";

// tween.js v25 removed the working global TWEEN group: `new TWEEN.Tween(obj)`
// no longer registers with the group that `TWEEN.update()` ticks, so tweens
// created that way silently never advance (this is what broke the camera
// dolly-in). The supported path is an explicit Group. Every tween in the
// galaxy is created with this group and it is the only thing the render loop
// ticks — see GalaxyScene.start().
export const tweenGroup = new Group();
