import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import Card from './projectCard/card';
import NavDot from './navDot/navDot';

const carousel = (props) => {
	const [ currentIndex, setCurrentIndex ] = useState(0);
	const [ cardWidth, setCardWidth ] = useState(0);
	const [ windowWidth, setWindowWidth ] = useState(process.browser ? window.innerWidth : undefined);
	const test = useSpring({ transform: `translateX(${cardWidth * -currentIndex}px)`, config: {mass: 2, tension: 170, friction: 26}})
	// const test = useSpring({ transform: currentIndex % 2 === 1 ? 'translateX(100px)' : 'translateX(0px)'})
	const test2 = useSpring({ opacity: 1 })

	let cards;
	let navDots = [];
	let responsiveCarousel;

	useEffect(() => {
		const logWindowWidth = () => {
			setWindowWidth(window.innerWidth);
		};

		// set({ transform: `translateX(${cardWidth * -currentIndex}px)`})

		if (process.browser) {
			window.addEventListener('resize', logWindowWidth);
			// cardWidth = document.querySelector('.card').clientWidth + 16;
			setCardWidth(document.querySelector('.card').clientWidth + 16);
			return () => window.removeEventListener('resize', logWindowWidth);
		}
	});

	const projects = props.projects;

	// console.log(projects)

	let arrowRightStyles =
		(windowWidth > 900 && currentIndex === projects.length - 2) || currentIndex === projects.length - 1
			? { visibility: 'hidden', opacity: '0' }
			: { visibility: 'visible', opacity: '1' };

	const nextCardHandler = () => {
		if ((windowWidth > 900 && currentIndex === projects.length - 2) || currentIndex === projects.length - 1) {
			return;
		}
		setCurrentIndex(currentIndex + 1);
	};

	const prevCardHandler = () => {
		if (currentIndex === 0) {
			return;
		}
		setCurrentIndex(currentIndex - 1);
	};

	const goToIndexHandler = (index) => {
		setCurrentIndex(index);
	};

	if (windowWidth !== undefined) {
		if (windowWidth < 900) {
			cards = projects.map((ele, idx) => (
				<Card
					key={ele.id}
					active={idx === currentIndex}
					title={ele.title}
					summary={ele.summary}
					name={ele.name}
				/>
			));

			if (currentIndex === projects.legnth - 1) {
				arrowRightVisibilty = 'hidden';
				arrowRightOpacity = '0';
			}

			if (projects.length > 2) {
				for (let i = 0; i < projects.length; i++) {
					navDots = [
						...navDots,
						<NavDot key={i} active={i === currentIndex} clicked={() => goToIndexHandler(i)} />
					];
				}
			}

			responsiveCarousel = (
				<React.Fragment>
					<div className="slider">
						<animated.div className="cards" style={ test }>
							{cards}
						</animated.div>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							margin: '15px 0'
						}}
					>
						<i className="arrow arrow-left fas fa-chevron-circle-left" onClick={prevCardHandler} />
						<div className="navDots">{navDots}</div>
						<i className="arrow arrow-right fas fa-chevron-circle-right" onClick={nextCardHandler} />
					</div>
				</React.Fragment>
			);
		} else {
			cards = projects.map((ele, idx) => (
				<Card
					key={ele.id}
					active={idx === currentIndex || idx === currentIndex + 1}
					title={ele.title}
					summary={ele.summary}
					name={ele.name}
				/>
			));

			if (projects.length > 2) {
				for (let i = 0; i < projects.length - 1; i++) {
					navDots = [
						...navDots,
						<NavDot key={i} active={i === currentIndex} clicked={() => goToIndexHandler(i)} />
					];
				}
			}

			responsiveCarousel = (
				<React.Fragment>
					<div className="slider">
						<i className="arrow arrow-left fas fa-chevron-circle-left" onClick={prevCardHandler} />
						<animated.div className="cards" style={ test }>
							{cards}
						</animated.div>
						<i className="arrow arrow-right fas fa-chevron-circle-right" onClick={nextCardHandler} />
					</div>
					<div className="navDots">{navDots}</div>
				</React.Fragment>
			);
		}
	}

	console.log(cardWidth);

	return (
		<React.Fragment>
			<div className="carousel">{responsiveCarousel}</div>
			<style jsx>{`
				.carousel {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
					position: relative;
					width: 100%;
				}
				:global(.slider) {
					display: flex;
					justify-content: space-between;
					align-items: center;
					overflow: hidden;
					width: 100%;
					padding: 13px;
					padding-left: 12.5%;
					min-height: 426px;
					position: relative;
				}
				:global(.cards) {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					min-height: 426px;
					// transform: translate3d(${cardWidth * -currentIndex}px, 0, 0);
					transition: transform 0.6s ease-out;
				}
				:global(.navDots) {
					display: flex;
					margin: 20px;
				}
				:global(.arrow) {
					z-index: 100;
					font-size: 40px;
					color: #0076ff;
					text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
					transition: opacity 0.3s ease-in, visibility 0.3s;
					cursor: pointer;
					position: absolute;
				}
				:global(.arrow-left) {
					left: 7%;
					visibility: ${currentIndex === 0 ? 'hidden' : 'visible'};
					opacity: ${currentIndex === 0 ? '0' : '1'};
				}
				:global(.arrow-right) {
					right: 7%;
					visibility: ${arrowRightStyles.visibility};
					opacity: ${arrowRightStyles.opacity};
				}
				@media (max-width: 900px) {
					.slider {
						padding-left: 14.2%;
					}
					:global(.arrow) {
						position: static;
					}
				}
			`}</style>
		</React.Fragment>
	);
};

export default carousel;
