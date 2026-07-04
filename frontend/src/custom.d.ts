// Gatsby's default loader imports .svg files as URL strings (used via
// `<img src={icon} />`), not as React components, so the export is a string.
declare module "*.svg" {
	const content: string;
	export default content;
}

// Side-effect imports of SCSS are handled by Gatsby's build pipeline; TypeScript
// only needs a module stub so `import "./Foo.scss"` type-checks (TS 6 errors on
// side-effect imports of otherwise-undeclared modules).
declare module "*.scss";
