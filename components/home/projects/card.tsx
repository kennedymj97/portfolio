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
						{props.github ? <MinimalButton url={props.github} newTab>Github</MinimalButton> : null}
						{props.url ? <MinimalButton url={props.url} newTab>View project</MinimalButton> : null}
					</div>
				</div>
			</div>
			<style jsx>{`
				.card {
					height: 400px;
					min-width: 42.5%;
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
			`}</style>
		</React.Fragment>
	);
};
