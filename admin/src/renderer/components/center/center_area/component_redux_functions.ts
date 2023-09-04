import { RootState } from "../../store/RootState";

export const mapStateToProps = (state: RootState) => ({
	centerViewState: state.centerViewState,
});

export const mapDispatchToProps = () => ({});
