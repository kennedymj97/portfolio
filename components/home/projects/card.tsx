import React from 'react';

import MinimalButton from '../../UI/button-minimal';

type Props = {
	title: string;
	imageSrc: string;
	info: string;
	github?: string;
	url?: string;
};

export default (props: Props) => {
	return (
		<React.Fragment>
			<div className="card">
				<div className="head-container">
					<h3 className="title">{props.title}</h3>
					<div className="image" />
				</div>
				<div className="body-container">
					<span className="info">{props.info}</span>
					<div className="buttons-container">
						{props.github ? (
							<MinimalButton url={props.github} newTab>
								<span className="github-text">Github</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="13"
									height="13"
									viewBox="0 0 24 24"
									fill="#0076ff"
								>
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
								</svg>
							</MinimalButton>
						) : null}
						{props.url ? (
							<MinimalButton url={props.url} newTab>
								View project
							</MinimalButton>
						) : null}
					</div>
				</div>
			</div>
			<style jsx>{`
				.card {
					height: 400px;
					// min-width: 42.5%;
					max-width: 318px;
					border-radius: 10px;
					box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					position: relative;
					align-content: flex-start;
					background: white;
					transition: opacity 0.6s;
					will-change: opacity;
					position: relative;
				}

				.head-container {
					display: flex;
					flex-direction: column;
					width: 100%;
					height: 70%;
					box-sizing: border-box;
				}

				.body-container {
					display: flex;
					flex-direction: column;
					width: 100%;
					padding: 10px;
					justify-content: space-between;
					flex-grow: 1;
					box-sizing: border-box;
				}

				.title {
					margin: 0;
					padding: 10px;
					font-weight: 500;
				}

				.image {
					background-image: url(${props.imageSrc});
					background-size: cover;
					width: 100%;
					flex-grow: 1;
					border-bottom: 1px solid rgba(0, 0, 0, 0.12);
					border-top: 1px solid rgba(0, 0, 0, 0.12);
				}

				.info {
					font-weight: 400;
					line-height: 1.43;
					letter-spacing: 0.01071em;
					font-size: 0.875rem;
				}

				.buttons-container {
					display: flex;
				}

				.buttons {
					text-decoration: none;
					color: #0076ff;
					border-radius: 7px;
					transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
					padding: 0.25rem 0.5rem;
					cursor: pointer;
				}

				.buttons:hover {
					background: rgba(0, 118, 255, 0.1);
				}

				.github-text {
					padding-right: 5px;
				}
			`}</style>
		</React.Fragment>
	);
};
