import React, { ChangeEvent, ChangeEventHandler } from "react";
import { BackgroundShape } from "../../enums/background-shape";
import { RootState } from "../../state";
import { settingsSliceActions } from "../../state/SettingsSlice/SettingsSlice";
import { SettingsSliceState } from "../../state/SettingsSlice/SettingsSliceTypes";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
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

	const renderCheckbox = (
		label: string,
		onChange: ChangeEventHandler<HTMLInputElement> | undefined,
		defaultChecked: boolean,
	): JSX.Element => {
		return (
			<>
				<p className="setting-panel__label">{label}</p>
				<input
					type="checkbox"
					className="setting-panel__checkbox"
					onChange={onChange}
					defaultChecked={defaultChecked}
				></input>
			</>
		);
	};

	return (
		<>
			{settingsState.showSettingsModal && (
				<div
					className="setting-panel__background"
					role="button"
				>
					<div className="setting-panel">
						<h1 className="setting-panel__title">Settings</h1>
						{renderCheckbox(
							"Sections Fade In",
							onSectionsFadeChange,
							settingsState.sectionsFade,
						)}
						{renderCheckbox(
							"Background Auto Rotate",
							onBackgroundAutoRotateChange,
							settingsState.backgroundAutoRotate,
						)}
						<h2 className="setting-panel__subtitle">
							Background Card Layout
						</h2>
						{[
							BackgroundShape.SPHERE,
							BackgroundShape.HELIX,
							BackgroundShape.GRID,
						].map(
							(backgroundShape: BackgroundShape): JSX.Element => {
								return (
									<React.Fragment key={backgroundShape}>
										<p className="setting-panel__label">
											{
												backgroundShapeLabels[
													backgroundShape
												]
											}
										</p>
										<input
											type="radio"
											className="setting-panel__checkbox"
											name="background-shape"
											onChange={onBackgroundShapeChange(
												backgroundShape,
											)}
											defaultChecked={
												settingsState.backgroundShape ===
												backgroundShape
											}
										></input>
									</React.Fragment>
								);
							},
						)}
						<input
							onClick={onCloseClick}
							type="button"
							value="Close"
							className="setting-panel__button"
						/>
					</div>
				</div>
			)}
		</>
	);
};

export { SettingModal };
