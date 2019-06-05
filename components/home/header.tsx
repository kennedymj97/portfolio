import React from 'react';
import WordSlider from './word-slider';

const header = () => (
	<React.Fragment>
		<header className="header" id='header'>
			<div className="header-container">
				<h1 className="title-1">Matthew Kennedy</h1>
				<h2 className="title-2">
					<div className="animation">
						<WordSlider duration={2000}>
							<span>Artificial Intelligence</span>
							<span>Web Development</span>
							<span>Always Learning</span>
						</WordSlider>
					</div>
				</h2>
			</div>
		</header>
		<style jsx>{`
			.header {
				// background: #0076ff;
				// color: white;
				// padding: 3rem 0;
			}

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
				font-size: 2.4rem;
			}

			.title-2 {
				font-size: 2.887rem;
				margin-top: -2.8rem;
				margin-bottom: 0;
			}

			@media (max-width: 600px) {
				.header-container {
					max-width: 85%;
				}

				.title-1 {
					font-size: 1.7em;
				}

				.title-2 {
					font-size: 2.0em;
				}
			}

			.animation {
				width: 100%;
				height: 3.4em;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 1rem;
				margin-bottom: 2rem;
			}
		`}</style>
	</React.Fragment>
);

export default header;
