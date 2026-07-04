// Central place for the "should we do the expensive / motion-heavy thing?"
// decisions so bloom cost, star count, and idle animation all agree on what
// counts as a constrained or motion-averse device.

export function prefersReducedMotion(): boolean {
	return (
		typeof window !== "undefined" &&
		typeof window.matchMedia === "function" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches
	);
}

// Coarse "small / likely mobile" check. Used to scale down particle counts
// and bloom resolution where fill-rate, not logic, is the bottleneck.
export function isCompactViewport(): boolean {
	return (
		typeof window !== "undefined" &&
		typeof window.matchMedia === "function" &&
		window.matchMedia("(max-width: 768px)").matches
	);
}
