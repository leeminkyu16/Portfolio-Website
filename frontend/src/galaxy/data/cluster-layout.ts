const ACCENT_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#f43f5e"] as const;

export function getClusterColor(sectionIndex: number): string {
	return ACCENT_COLORS[sectionIndex % ACCENT_COLORS.length];
}

export function getClusterPositions(
	count: number,
	radius: number,
): Array<{ x: number; y: number; z: number }> {
	const goldenAngle = Math.PI * (3 - Math.sqrt(5));
	return Array.from({ length: count }, (_, i) => {
		const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
		const phi = i * goldenAngle;
		return {
			x: radius * Math.sin(theta) * Math.cos(phi),
			y: radius * Math.sin(theta) * Math.sin(phi),
			z: radius * Math.cos(theta),
		};
	});
}

export function getCardLabel(
	data: Array<unknown>,
	template: Array<[number, string, ...unknown[]]>,
): string {
	for (let i = 0; i < template.length; i++) {
		const type = template[i][1];
		if (type === "Heading1") {
			const item = data[i] as [string, string];
			return item[0] ?? "Card";
		}
		if (type === "Heading1WithLink") {
			const item = data[i] as [[string, string], string];
			return item[0][0] ?? "Card";
		}
	}
	return "Card";
}

export function getCardMeta(
	data: Array<unknown>,
	template: Array<[number, string, ...unknown[]]>,
): string {
	const parts: string[] = [];
	for (let i = 0; i < template.length; i++) {
		const type = template[i][1];
		if (type === "Heading2") {
			const item = data[i] as [string, string];
			if (item?.[0]) parts.push(item[0]);
		} else if (type === "StartEndDate") {
			const item = data[i] as [[string, string], [string, string]];
			const start = item?.[0]?.[0];
			const end = item?.[1]?.[0];
			if (start || end) parts.push(`${start ?? "?"} – ${end ?? "?"}`);
		} else if (type === "TextTitlePair") {
			const item = data[i] as [string, string];
			const title = template[i][2] as [string, string] | undefined;
			if (item?.[0] && title?.[0]) parts.push(`${title[0]} ${item[0]}`);
		}
	}
	return parts.join(" · ");
}

function stripHtml(html: string): string {
	return html.replace(/<[^>]*>/g, "");
}

function truncate(text: string, maxLength: number): string {
	const trimmed = text.trim();
	if (trimmed.length <= maxLength) return trimmed;
	return `${trimmed.slice(0, maxLength).trimEnd()}…`;
}

export function getCardDescription(
	data: Array<unknown>,
	template: Array<[number, string, ...unknown[]]>,
	maxLength = 100,
): string {
	for (let i = 0; i < template.length; i++) {
		const type = template[i][1];
		if (type === "Text") {
			const item = data[i] as [string, string];
			if (item?.[0]) return truncate(item[0], maxLength);
		}
		if (type === "HTMLText") {
			const item = data[i] as [string, string];
			if (item?.[0]) return truncate(stripHtml(item[0]), maxLength);
		}
		if (type === "HTMLList") {
			const item = data[i] as Array<[number, [string, string]]>;
			const first = item?.[0]?.[1]?.[0];
			if (first) return truncate(stripHtml(first), maxLength);
		}
	}
	return "";
}
