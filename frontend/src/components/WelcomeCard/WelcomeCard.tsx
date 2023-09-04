import React from "react";
import { GitHubIcon, LinkedInIcon } from "../../assets/icons";
import "./WelcomeCard.scss";

const WelcomeCard: React.FunctionComponent = (): JSX.Element => {
	return (
		<div className="welcome-content">
			<div className="welcome-card">
				<div className="welcome-card__side welcome-card__side--front">
					<div className="welcome-card__container--front">
						<span>Hi, I&apos;m Min-Kyu.</span>
						<span>Welcome to my website!</span>
					</div>
				</div>
				<div className="welcome-card__side welcome-card__side--back">
					<div className="welcome-card__container--back">
						<span>Visit my other profiles</span>
						<div className="icon-container">
							<a
								href="https://www.linkedin.com/in/leeminkyu16/"
								className="welcome-card__button"
							>
								<img
									src={LinkedInIcon}
									alt="LinkedIn Icon"
								/>
							</a>
							<a
								href="https://github.com/leeminkyu16"
								className="welcome-card__button"
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
