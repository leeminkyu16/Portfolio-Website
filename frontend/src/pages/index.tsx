import React from "react";
import { Helmet } from "react-helmet";
import { AnimatedBackground } from "../components/AnimatedBackground/AnimatedBackground";
import { BackToTopButton } from "../components/BackToTopButton/BackToTopButton";
import { BackgroundSpacer } from "../components/BackgroundSpacer/BackgroundSpacer";
import { PrivacyPolicyModal } from "../components/PrivacyPolicyModal/PrivacyPolicyModal";
import { ResumeSection } from "../components/ResumeSection/ResumeSection";
import { SettingModal } from "../components/SettingModal/SettingModal";
import { SideMenu } from "../components/SideMenu/SideMenu";
import { WelcomeCard } from "../components/WelcomeCard/WelcomeCard";
import "./index.scss";

const HomePage: React.FunctionComponent = (): JSX.Element => {
	return (
		<>
			<Helmet>
				<title>Min-Kyu Lee</title>
			</Helmet>
			<AnimatedBackground />
			<SettingModal />
			<div className="main-content">
				<WelcomeCard />
				<ResumeSection />
			</div>
			<BackgroundSpacer />
			<SideMenu />
			<PrivacyPolicyModal />
			<BackToTopButton />
		</>
	);
};

export default HomePage;
