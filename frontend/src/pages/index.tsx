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

// Schema.org Person — lets search engines resolve the site to a real entity
// (name, role, profiles), which drives knowledge-panel / rich-result eligibility.
// `url` and `image` are added once the production domain is wired in.
const personSchema = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Min-Kyu Lee",
	alternateName: ["이민규", "李旻奎"],
	jobTitle: "Android Engineer",
	address: {
		"@type": "PostalAddress",
		addressLocality: "New York",
		addressRegion: "NY",
		addressCountry: "US",
	},
	alumniOf: [
		{ "@type": "CollegeOrUniversity", name: "University of Waterloo" },
		{ "@type": "CollegeOrUniversity", name: "Wilfrid Laurier University" },
	],
	knowsLanguage: ["English", "Korean", "French", "Japanese"],
	sameAs: [
		"https://www.linkedin.com/in/leeminkyu16/",
		"https://github.com/leeminkyu16",
	],
};

const HomePage: React.FunctionComponent = (): JSX.Element => {
	return (
		<>
			<Helmet>
				<title>Min-Kyu Lee</title>
				<meta
					name="description"
					content="Min-Kyu Lee (이민규 / 李旻奎) — Android Engineer based in New York. Waterloo/Laurier Double Degree in Computer Science & Business Administration. Born in Seoul; speaks English, Korean, French, and Japanese."
				/>
				<meta
					property="og:title"
					content="Min-Kyu Lee — Android Engineer"
				/>
				<meta
					property="og:description"
					content="Android Engineer in NYC. Waterloo/Laurier Double Degree (CS & Business). Seoul → Waterloo → New York. EN · KO · FR · JA."
				/>
				<meta
					property="og:type"
					content="website"
				/>
				<meta
					name="twitter:card"
					content="summary_large_image"
				/>
				<meta
					name="twitter:title"
					content="Min-Kyu Lee — Android Engineer"
				/>
				<meta
					name="twitter:description"
					content="Android Engineer in NYC. Waterloo/Laurier Double Degree (CS & Business). Seoul → Waterloo → New York. EN · KO · FR · JA."
				/>
				<script type="application/ld+json">
					{JSON.stringify(personSchema)}
				</script>
			</Helmet>
			<AnimatedBackground />
			<div className="classic-view-links">
				<a
					href="/galaxy"
					className="classic-galaxy-link"
				>
					✦ Galaxy View →
				</a>
				<a
					href="/stars"
					className="classic-galaxy-link classic-stars-link"
				>
					✧ Star Sky →
				</a>
			</div>
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
