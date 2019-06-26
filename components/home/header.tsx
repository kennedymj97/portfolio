import React from 'react';
import WordSlider from './word-slider';

export default () => (
	<React.Fragment>
		<header className="header-container" id="header">
			<h1 className="title-1">Matthew Kennedy</h1>
			<h2 className="title-2">
				<WordSlider />
			</h2>
		</header>
		<style jsx>{`
			.header-container {
				max-width: 1024px;
				margin: 0 auto;
				display: block;
				text-align: center;
				text-rendering: optimizeLegibility;
				text-size-adjust: 100%;
				padding: 5rem 0 1rem 0;
				border-bottom: 1px groove black;
			}

			.title-1 {
				margin-top: 0;
				margin-bottom: 0;
				font-size: 2.4rem;
			}

			.title-2 {
				font-size: 2.887rem;
				margin-top: -2.8rem;
				margin-bottom: 0;
			}

			@media (max-width: 1260px) {
				.header-container {
					max-width: 85%;
				}
			}

			@media (max-width: 600px) {
				.title-1 {
					font-size: 1.7em;
					margin-bottom: 0.85rem;
				}

				.title-2 {
					font-size: 2.0em;
				}
			}

			@media (max-width: 370px) {
				.title-1 {
					font-size: 1.5rem;
				}

				.title-2 {
					font-size: 1.8rem;
				}
			}
		`}</style>
	</React.Fragment>
);
