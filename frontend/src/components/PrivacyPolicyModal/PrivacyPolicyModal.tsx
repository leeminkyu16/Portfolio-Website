import React, { RefObject, createRef } from "react";
import { RootState } from "../../state";
import { privacyModalSliceActions } from "../../state/PrivacyModalSlice/PrivacyModalSlice";
import { PrivacyModalSliceState } from "../../state/PrivacyModalSlice/PrivacyModalSliceTypes";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import "./PrivacyPolicyModal.scss";

const PrivacyPolicyModal: React.FunctionComponent = (): JSX.Element => {
	const mainDiv: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

	const privacyModalSliceState: PrivacyModalSliceState = useAppSelector(
		(storeState: RootState): PrivacyModalSliceState => {
			return storeState.privacyModal;
		},
	);

	const dispatch = useAppDispatch();

	const onButtonClick = (): void => {
		dispatch(privacyModalSliceActions.setShowPrivacyPolicyModal(false));
	};

	return (
		<div
			className={`privacy-policy-modal__div ${
				privacyModalSliceState.showPrivacyPolicyModal
					? ""
					: "privacy-policy-modal__div-hidden"
			}`}
			ref={mainDiv}
		>
			<h1 className="title-text">Privacy Policy</h1>
			<p className="main-text">
				This website enables script (including local storage) that is
				able to read and write information on your browser. The
				information stored is used for settings and other essential
				functions of the website.
			</p>
			<button
				className="main-button"
				onClick={onButtonClick}
			>
				Accept and Close
			</button>
		</div>
	);
};

export { PrivacyPolicyModal };
