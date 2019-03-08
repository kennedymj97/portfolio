import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import Card from './projectCard/card';
import NavDot from './navDot/navDot';

const carousel = (props) => {
	const [ currentIndex, setCurrentIndex ] = useState(0);

	// THIS WAY OF GETTING WIDTH IS EXTREMELY SLOW AND UNPERFORMANT
	// MAYBE USE FIXED WIDTHS FOR THE CARDS AND CHANGE THEM USING MEDIA QUERIES
	// AS CARDS ARE NO LONGER LINKED DYNAMICALLY THE TRANSLATE VALUE DOES NOT UPDATE BASED ON WINDOW WIDTH ACCURACTELY
	// DOES ABOVE MATTER IF USING SET CARD WIDTHS
	// const [ cardWidth, setCardWidth ] = useState(0);

	// Create a hook to use to retrieve the window dimensions?
	// This way don't have to set up the event listener on every rerender

	// const [ windowWidth, setWindowWidth ] = useState(process.browser ? window.innerWidth : undefined);
	const test = useSpring({
		transform: `translate3d(${391 * -currentIndex}px, 0px, 0px)`,
		config: { mass: 1, tension: 170, friction: 26 }
	});

	let cards;
	let navDots = [];
	let responsiveCarousel;
	const windowWidth = process.browser ? window.innerWidth : undefined

	// useEffect(() => {
	// 	const logWindowWidth = () => {
	// 		setWindowWidth(window.innerWidth);
	// 	};

	// 	if (process.browser) {
	// 		window.addEventListener('resize', logWindowWidth);
	// 		// setCardWidth(document.querySelector('.card').clientWidth + 16);
	// 		return () => window.removeEventListener('resize', logWindowWidth);
	// 	}
	// });

	const projects = props.projects;

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
					imageUrl={ele.imageUrl}
					repoUrl={ele.repoUrl}
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
						<animated.div className="cards" style={test}>
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
					imageUrl={ele.imageUrl}
					repoUrl={ele.repoUrl}
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
						<animated.div className="cards" style={test}>
							{cards}
						</animated.div>
						<i className="arrow arrow-right fas fa-chevron-circle-right" onClick={nextCardHandler} />
					</div>
					<div className="navDots">{navDots}</div>
				</React.Fragment>
			);
		}
	}

	console.log(windowWidth);
	console.log(currentIndex);

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
					will-change: transform;
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
