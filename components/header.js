import React from 'react';
import WordSlider from './wordSlider';

const header = (props) => (
	<React.Fragment>
		<header className="header">
			<h1>Matthew Kennedy</h1>
			<h2 className="title-2">
				<div className="animation">
					<WordSlider duration={2000}>
						<span>Artificial Intelligence</span>
						<span>Web Development</span>
						<span>Always Learning</span>
					</WordSlider>
				</div>
			</h2>
		</header>
		<style jsx>{`
			.header {
				display: block;
				text-align: center;
				text-rendering: optimizeLegibility;
				text-size-adjust: 100%;
			}

			.title-2 {
				font-size: 2.887rem;
				margin-top: -4.2rem;
				margin-bottom: 0;
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
