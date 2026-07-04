import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ObjectResumeSection } from "portfolio-website-shared/src/types/object_resume/ObjectResumeSection";
import { ObjectResumeSubsection } from "portfolio-website-shared/src/types/object_resume/ObjectResumeSubsection";
import { LeftBarProps } from "./LeftBarProps";
import { RootState } from "../../store/RootState";
import { resumeActions } from "../../store/components/resume/resumeSlice";
import { centerViewActions } from "../../store/components/center_view/centerViewSlice";
import "./LeftBar.scss";

type StatusTone = "success" | "error";

const LeftBar: FunctionComponent<LeftBarProps> = (): JSX.Element => {
	const dispatch = useDispatch();
	const objectResume = useSelector((state: RootState) => state.resume.value);
	const centerViewState = useSelector((state: RootState) => state.centerViewState);

	const [status, setStatus] = useState<{ tone: StatusTone; message: string } | null>(null);

	const { ipcRenderer } = window.require("electron");

	const flashStatus = (tone: StatusTone, message: string): void => {
		setStatus({ tone, message });
	};

	const navigateTo = (
		sectionIndex: number,
		subsectionIndex: number,
		subsectionTemplateIndex: number,
	): void => {
		dispatch(
			centerViewActions.setCenterViewState({
				sectionIndex,
				subsectionIndex,
				subsectionTemplateIndex,
			}),
		);
	};

	const isResumeActive =
		centerViewState.sectionIndex < 0 &&
		centerViewState.subsectionIndex < 0 &&
		centerViewState.subsectionTemplateIndex < 0;

	return (
		<nav className="left-bar-main__div" aria-label="Resume navigation">
			<p className="left-bar-heading__p">Portfolio Admin</p>

			<button
				type="button"
				className={`resume-text__button${isResumeActive ? " is-active" : ""}`}
				aria-current={isResumeActive ? "page" : undefined}
				onClick={(): void => navigateTo(-1, -1, -1)}
			>
				Resume
			</button>

			{objectResume.map(
				(resumeSection: ObjectResumeSection, resumeSectionIndex: number): JSX.Element => {
					const isSectionActive =
						centerViewState.sectionIndex === resumeSectionIndex &&
						centerViewState.subsectionIndex < 0;

					return (
						<div key={`resume-${resumeSection.uniqueId}`}>
							<button
								type="button"
								className={`section-text__button${
									isSectionActive ? " is-active" : ""
								}${resumeSection.title.english ? "" : " is-untitled"}`}
								aria-current={isSectionActive ? "page" : undefined}
								onClick={(): void => navigateTo(resumeSectionIndex, -1, -1)}
							>
								{resumeSection.title.english || "(untitled section)"}
							</button>
							{resumeSection.data.map(
								(
									resumeSubsection: ObjectResumeSubsection,
									resumeSubsectionIndex: number,
								): JSX.Element => {
									const isSubsectionActive =
										centerViewState.sectionIndex === resumeSectionIndex &&
										centerViewState.subsectionIndex === resumeSubsectionIndex;

									return (
										<div
											key={`resume-${resumeSection.uniqueId}-${resumeSubsection.uniqueId}`}
										>
											<button
												type="button"
												className={`subsection-text__button${
													isSubsectionActive ? " is-active" : ""
												}${
													resumeSubsection.title.english
														? ""
														: " is-untitled"
												}`}
												aria-current={
													isSubsectionActive ? "page" : undefined
												}
												onClick={(): void =>
													navigateTo(
														resumeSectionIndex,
														resumeSubsectionIndex,
														-1,
													)
												}
											>
												{resumeSubsection.title.english ||
													"(untitled subsection)"}
											</button>
										</div>
									);
								},
							)}
						</div>
					);
				},
			)}

			<div className="left-bar-actions__div">
				<button
					type="button"
					className="common__button common__button--primary"
					onClick={(): void => {
						ipcRenderer.once(
							"create-list-resume-files-reply",
							(_: unknown, result: { success: boolean; error?: string }): void => {
								if (result.success) {
									flashStatus("success", "Resume exported.");
								} else {
									flashStatus(
										"error",
										`Export failed: ${result.error ?? "Unknown error"}`,
									);
								}
							},
						);
						ipcRenderer.send("create-list-resume-files", objectResume);
					}}
				>
					Export Resume
				</button>

				<button
					type="button"
					className="common__button"
					onClick={(): void => {
						ipcRenderer.send("save-resume-json", objectResume);
						ipcRenderer.once(
							"save-resume-json-reply",
							(_: unknown, result: { success: boolean; error?: string }): void => {
								if (result.success) {
									flashStatus("success", "Saved JSON.");
								} else {
									flashStatus(
										"error",
										`Save failed: ${result.error ?? "Unknown error"}`,
									);
								}
							},
						);
					}}
				>
					Save JSON
				</button>

				<button
					type="button"
					className="common__button"
					onClick={(): void => {
						ipcRenderer.send("load-resume-json");
						ipcRenderer.once(
							"load-resume-json-reply",
							(
								_: unknown,
								result: { success: boolean; data?: unknown; error?: string },
							): void => {
								if (result.success) {
									dispatch(
										resumeActions.setResume(
											result.data as Parameters<
												typeof resumeActions.setResume
											>[0],
										),
									);
									// Reset navigation to root so the open view can't point
									// past the end of the newly loaded resume.
									dispatch(
										centerViewActions.setCenterViewState({
											sectionIndex: -1,
											subsectionIndex: -1,
											subsectionTemplateIndex: -1,
										}),
									);
									flashStatus("success", "Loaded JSON.");
								} else {
									flashStatus(
										"error",
										`Load failed: ${result.error ?? "Unknown error"}`,
									);
								}
							},
						);
					}}
				>
					Load JSON
				</button>

				{status !== null && (
					<p
						className={`left-bar-status__p left-bar-status--${status.tone}`}
						role="status"
					>
						{status.message}
					</p>
				)}
			</div>
		</nav>
	);
};

export default LeftBar;
