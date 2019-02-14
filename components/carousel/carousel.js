import React, { useState, useEffect } from 'react';
import Card from './card/card';
import NavDot from './navDot/navDot';

const carousel = (props) => {
	const [ currentIndex, setCurrentIndex ] = useState(0);
	const [ indexTransitionFactor, setIndexTransitionFactor ] = useState(0);
	const [ translateValue, setTranslateValue ] = useState(0);
	const [ windowWidth, setWindowWidth ] = useState(process.browser ? window.innerWidth : undefined);

	useEffect(() => {
		if (process.browser) {
			window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
		}
		setTranslateValue(getCardWidth() * indexTransitionFactor);
	});

	const projects = [
		{ id: 1, title: 'Test 1', summary: 'Summary 1' },
		{ id: 2, title: 'Test 2', summary: 'Summary 2' },
		{ id: 3, title: 'Test 3', summary: 'Summary 3' },
		{ id: 4, title: 'Test 4', summary: 'Summary 4' },
		{ id: 5, title: 'Test 5', summary: 'Summary 5' }
	];

	const getCardWidth = () => {
		if (process.browser) {
			return document.querySelector('.card').clientWidth + 16;
		}
	};

	const nextCardHandler = () => {
		if (currentIndex === projects.length - 2) {
			return;
		}

		setCurrentIndex(currentIndex + 1);
		setIndexTransitionFactor(indexTransitionFactor - 1);
	};

	const prevCardHandler = () => {
		if (currentIndex === 0) {
			return;
		}

		setCurrentIndex(currentIndex - 1);
		setIndexTransitionFactor(indexTransitionFactor + 1);
	};

	const goToIndexHandler = (index) => {
		setCurrentIndex(index);
		setIndexTransitionFactor(-index);
	};

	let cards = projects.map((ele, idx) => (
		<Card
			key={ele.id}
			active={idx === currentIndex || idx === currentIndex + 1}
			title={ele.title}
			summary={ele.summary}
			translate={translateValue}
		/>
	));

	let navDots = [];
	for (let i = 0; i < projects.length - 1; i++) {
		navDots = [ ...navDots, <NavDot key={i} active={i === currentIndex} clicked={() => goToIndexHandler(i)} /> ];
	}

	return (
		<React.Fragment>
			<div className="carousel">
				<div className="slider">
					<i className="arrow arrow-left fas fa-chevron-circle-left" onClick={prevCardHandler} />
					{cards}
					<i className="arrow arrow-right fas fa-chevron-circle-right" onClick={nextCardHandler} />
				</div>
				<div className="navDots">{navDots}</div>
			</div>
			<style jsx>{`
				.carousel {
					grid-column: 1/13;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
					// overflow: hidden;
					position: relative;
				}

				.slider {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					overflow: hidden;
					width: 100%;
					padding: 13px;
					// box-sizing: border-box;
					// margin-left: 50px;
					// margin: 0 150px 0 150px;
					// position: relative;
				}

				.carousel-button {
					grid-column: 6;
				}

				.navDots {
					display: flex;
					margin: 20px;
				}

				.arrow {
					z-index: 100;
					font-size: 40px;
					color: #333333;
					text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
					transition: opacity 0.3s ease-in, visibility 0.3s;
					cursor: pointer;
					position: absolute;
				}

				.arrow-left {
					left: -60px;
					visibility: ${currentIndex === 0 ? 'hidden' : 'visible'};
					opacity: ${currentIndex === 0 ? '0' : '1'};
				}

				.arrow-right {
					right: 9%;
					visibility: ${currentIndex === projects.length - 2 ? 'hidden' : 'visible'};
					opacity: ${currentIndex === projects.length - 2 ? '0' : '1'};
				}
			`}</style>
		</React.Fragment>
	);
};

export default carousel;
