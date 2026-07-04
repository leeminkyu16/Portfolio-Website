import React from "react";
import { GitHubIcon, LinkedInIcon } from "../../assets/icons";
import "./WelcomeCard.scss";

const WelcomeCard: React.FunctionComponent = (): JSX.Element => {
	// Desktop reveals the back face (social links) on hover. Touch devices have
	// no hover, so the flip is also driven by a tap/keypress here — otherwise
	// the LinkedIn/GitHub links would be unreachable on mobile.
	const [flipped, setFlipped] = React.useState(false);

	const toggleFlip = (): void => setFlipped((prev) => !prev);

	const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			toggleFlip();
		}
	};

	return (
		<div className="welcome-content">
			<div
				className={
					flipped
						? "welcome-card welcome-card--flipped"
						: "welcome-card"
				}
				onClick={toggleFlip}
				onKeyDown={onKeyDown}
				role="button"
				tabIndex={0}
				aria-label="Business card. Activate to show social profile links."
			>
				<div className="welcome-card__side welcome-card__side--front">
					<div className="welcome-card__container--front">
						<span className="welcome-card__greeting">
							Hi, I&apos;m Min-Kyu.
						</span>
						<span
							className="welcome-card__name-native"
							lang="ko"
						>
							이민규{" "}
							<span className="welcome-card__seal">李旻奎</span>
						</span>
						<span className="welcome-card__tagline">
							Android Engineer
						</span>
						<span className="welcome-card__subtitle">
							Seoul → Waterloo → NYC · EN · KO · FR · JA
						</span>
					</div>
				</div>
				<div className="welcome-card__side welcome-card__side--back">
					<div className="welcome-card__container--back">
						<span>Visit my other profiles</span>
						<div className="icon-container">
							<a
								href="https://www.linkedin.com/in/leeminkyu16/"
								className="welcome-card__button"
								aria-label="LinkedIn profile"
								tabIndex={flipped ? 0 : -1}
							>
								<img
									src={LinkedInIcon}
									alt="LinkedIn Icon"
								/>
							</a>
							<a
								href="https://github.com/leeminkyu16"
								className="welcome-card__button"
								aria-label="GitHub profile"
								tabIndex={flipped ? 0 : -1}
							>
								<img
									src={GitHubIcon}
									alt="GitHub Icon"
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { WelcomeCard };
