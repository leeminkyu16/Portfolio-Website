import React, { ChangeEvent, ChangeEventHandler } from "react";
import { BackgroundShape } from "../../enums/background-shape";
import { RootState } from "../../state";
import { settingsSliceActions } from "../../state/SettingsSlice/SettingsSlice";
import { SettingsSliceState } from "../../state/SettingsSlice/SettingsSliceTypes";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { LanguageToggle } from "../LanguageToggle/LanguageToggle";
import "./SettingModal.scss";

const SettingModal: React.FunctionComponent = (): JSX.Element => {
	const settingsState: SettingsSliceState = useAppSelector(
		(storeState: RootState): SettingsSliceState => {
			return storeState.settings;
		},
	);
	const dispatch = useAppDispatch();

	const onBackgroundShapeChange =
		(shape: BackgroundShape): (() => void) =>
		(): void => {
			dispatch(settingsSliceActions.setBackgroundShape(shape));
		};

	const backgroundShapeLabels = {
		sphere: "Sphere",
		helix: "Helix",
		grid: "Grid",
		constellation: "奎 Constellation",
	};

	const backgroundShapeGlyphs = {
		sphere: "◍",
		helix: "𖣘",
		grid: "▦",
		constellation: "✦",
	};

	const onCloseClick = (): void => {
		dispatch(settingsSliceActions.setShowSettingsModal(false));
	};

	const onBackgroundAutoRotateChange = (
		event: ChangeEvent<HTMLInputElement>,
	): void => {
		dispatch(
			settingsSliceActions.setBackgroundAutoRotate(event.target.checked),
		);
	};

	const onSectionsFadeChange = (
		event: ChangeEvent<HTMLInputElement>,
	): void => {
		dispatch(settingsSliceActions.setSectionsFade(event.target.checked));
	};

	const renderToggleRow = (
		label: string,
		onChange: ChangeEventHandler<HTMLInputElement> | undefined,
		defaultChecked: boolean,
	): JSX.Element => {
		return (
			<label className="setting-row">
				<span className="setting-row__label">{label}</span>
				<input
					type="checkbox"
					className="setting-panel__checkbox"
					onChange={onChange}
					defaultChecked={defaultChecked}
				/>
			</label>
		);
	};

	return (
		<>
			{settingsState.showSettingsModal && (
				<div
					className="setting-panel__background"
					role="button"
					onClick={onCloseClick}
				>
					<div
						className="setting-panel"
						role="dialog"
						aria-label="Settings"
						onClick={(event): void => event.stopPropagation()}
					>
						<div className="setting-panel__header">
							<h1 className="setting-panel__title">Settings</h1>
							<button
								type="button"
								className="setting-panel__close-x"
								aria-label="Close settings"
								onClick={onCloseClick}
							>
								×
							</button>
						</div>

						<section className="setting-panel__group">
							{renderToggleRow(
								"Sections Fade In",
								onSectionsFadeChange,
								settingsState.sectionsFade,
							)}
							{renderToggleRow(
								"Background Auto Rotate",
								onBackgroundAutoRotateChange,
								settingsState.backgroundAutoRotate,
							)}
						</section>

						<h2 className="setting-panel__subtitle">Language</h2>
						<LanguageToggle className="setting-panel__language" />

						<h2 className="setting-panel__subtitle">
							Background Card Layout
						</h2>
						<div
							className="setting-panel__options"
							role="radiogroup"
							aria-label="Background Card Layout"
						>
							{[
								BackgroundShape.SPHERE,
								BackgroundShape.HELIX,
								BackgroundShape.GRID,
								BackgroundShape.CONSTELLATION,
							].map(
								(
									backgroundShape: BackgroundShape,
								): JSX.Element => {
									const isActive =
										settingsState.backgroundShape ===
										backgroundShape;
									return (
										<button
											key={backgroundShape}
											type="button"
											role="radio"
											aria-checked={isActive}
											className={`setting-option${
												isActive
													? " setting-option--active"
													: ""
											}`}
											onClick={onBackgroundShapeChange(
												backgroundShape,
											)}
										>
											<span className="setting-option__glyph">
												{
													backgroundShapeGlyphs[
														backgroundShape
													]
												}
											</span>
											<span className="setting-option__label">
												{
													backgroundShapeLabels[
														backgroundShape
													]
												}
											</span>
										</button>
									);
								},
							)}
						</div>

						<button
							type="button"
							onClick={onCloseClick}
							className="setting-panel__button"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export { SettingModal };
