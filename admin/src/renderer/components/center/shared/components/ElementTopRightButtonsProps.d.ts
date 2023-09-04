import { ReactNode } from "react";

export interface ElementTopRightButtonsProps<T> {
	listState: T[];
	setListState: (newListState: T[]) => void;
	elementIndex: number;
	children?: ReactNode;
}
