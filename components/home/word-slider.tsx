import React from 'react';

const words = [ 'Artificial Intelligence', 'Web Development', 'Always Learning' ];

export default () => {
	const animationDuration = 1.8;
	const animationLength = animationDuration * words.length;
	const endOfAnimation = 100 / words.length;
	const animationOverlap = 0.1;

	return (
		<React.Fragment>
			<div className="slider-container">
				<div className="words">
					{words.map((word, index) => (
						<span
							key={word}
							style={{
								animationDelay: index === 0 ? '1ms' : `${animationDuration * index}s`
							}}
						>
							{word}
						</span>
					))}
				</div>
			</div>
			<style jsx>{`
				.slider-container {
					margin: auto;
					margin-top: -1rem;
					margin-bottom: -1rem;
					line-height: 1.4em;
					white-space: nowrap;
					position: relative;
				}
				.words {
					width: 100%;
					height: 3.4em;
					display: block;
					margin-top: 0rem;
					margin-bottom: 2rem;
				}
				.words span {
					position: absolute;
					opacity: 0;
					overflow: hidden;
					animation: slide-word ${animationLength}s linear infinite 0s;
					animation-timing-function: cubic-bezier(0.19, 0.82, 0.84, 1.06);
				}
				@keyframes slide-word {
					0% {
						opacity: 0;
						transform: translate3d(-50%, 25%, 0px);
						visibility: visible;
					}
					${1 - 1 * animationOverlap}% {
						opacity: 1;
						transform: translate3d(-50%, 75%, 0px);
					}
					${endOfAnimation}% {
						opacity: 1;
						transform: translate3d(-50%, 75%, 0px);
						visibility: visible;
					}
					${endOfAnimation + endOfAnimation * animationOverlap}% {
						opacity: 0;
						transform: translate3d(-50%, 135%, 0px);
						visibility: hidden;
					}
					100% {
						opacity: 0;
						visibility: visible;
					}
				}
			`}</style>
		</React.Fragment>
	);
};
