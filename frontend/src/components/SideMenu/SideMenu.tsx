import { ListResumeSection, resumeArray } from "portfolio-website-shared";
import { ListResumeSubsection } from "portfolio-website-shared/src/types/list_resume/ListResumeSubsection";
import React, { RefObject, useRef } from "react";
import { settingsSliceActions } from "../../state/SettingsSlice/SettingsSlice";
import { useAppDispatch } from "../../state/hooks";
import "./SideMenu.scss";

const SideMenu: React.FunctionComponent = (): JSX.Element => {
	const mainDiv: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
	const mainButton: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

	const dispatch = useAppDispatch();

	const onMenuButtonClick = (): void => {
		mainDiv.current?.classList.toggle("side-menu-main-div-hidden");
		mainButton.current?.classList.toggle("is-active");
	};

	const scrollToTop = (): void => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const scrollToBottom = (): void => {
		window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
	};

	const scrollToResumeSection =
		(suffix: string): (() => void) =>
		(): void => {
			document.getElementById(`resume${suffix}`)?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		};

	const showSettingsModal = (): void => {
		dispatch(settingsSliceActions.setShowSettingsModal(true));
	};

	const renderItem = (
		liClassName: string,
		onClick: React.MouseEventHandler<HTMLButtonElement>,
		text: string,
		key = "",
	): JSX.Element => {
		return (
			<li
				key={key}
				id={key}
				className={liClassName}
			>
				<button
					onClick={onClick}
					className="side-menu-item-button"
				>
					{text}
				</button>
			</li>
		);
	};

	const renderResumeItems = (): JSX.Element => {
		const languageIndex = 0;

		return (
			<>
				{resumeArray &&
					resumeArray.map(
						(resumeSection: ListResumeSection): JSX.Element => {
							return (
								<div
									key={`side-menu-item-resume-div-${resumeSection[0]}`}
								>
									{renderItem(
										"side-menu-item-2",
										scrollToResumeSection(
											`-${resumeSection[0]}`,
										),
										resumeSection[1][languageIndex],
										`side-menu-item-resume-${resumeSection[0]}}`,
									)}
									{resumeSection[2] &&
										resumeSection[2].map(
											(
												resumeSubsection: ListResumeSubsection,
											): JSX.Element | null => {
												if (
													resumeSubsection[1][
														languageIndex
													] !== ""
												) {
													return renderItem(
														"side-menu-item-3",
														scrollToResumeSection(
															`-${resumeSection[0]}-${resumeSubsection[0]}`,
														),
														resumeSubsection[1][
															languageIndex
														],
														`side-menu-item-resume-${resumeSection[0]}-${resumeSubsection[0]}`,
													);
												} else {
													return null;
												}
											},
										)}
								</div>
							);
						},
					)}
			</>
		);
	};

	return (
		<>
			<button
				onClick={onMenuButtonClick}
				className="side-menu-button"
			>
				<div
					ref={mainButton}
					className="side-menu-button-hamburger"
				>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</button>
			<div
				ref={mainDiv}
				className="side-menu-main-div side-menu-main-div-hidden"
			>
				<h1>Min-Kyu Lee</h1>
				<ul className="side-menu-items">
					{renderItem(
						"side-menu-item",
						scrollToTop,
						"Top of Page",
						"side-menu-item-resume-top",
					)}
					{renderResumeItems()}
					{renderItem(
						"side-menu-item",
						scrollToBottom,
						"Bottom of Page",
						"side-menu-item-resume-bottom",
					)}
					{renderItem(
						"side-menu-item-top-double-border",
						showSettingsModal,
						"Settings",
					)}
				</ul>
			</div>
		</>
	);
};

export { SideMenu };
