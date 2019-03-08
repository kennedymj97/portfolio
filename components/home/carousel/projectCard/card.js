import React, { useEffect } from 'react';
import Image from './image';
import About from './info';

const card = (props) => {
	return (
		<React.Fragment>
			<div className="card">
				<Image url={props.imageUrl} />
				<About title={props.title} info={props.summary} repo={props.repoUrl} />
			</div>
			<style jsx>{`
				.card {
					height: 400px;
					min-width: 42.5%;
					border-radius: 10px;
					box-shadow: ${props.active
						? null
						: '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)'};
					// overflow: hidden;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					position: relative;
					align-content: flex-end;
					justify-content: flex-end;
					opacity: ${props.active ? '1' : '0.3'};
					margin-right: 16px;
					background: white;
					transition: opacity 0.6s;
					will-change: opacity;
					position: relative;
				}

				.card::before {
					content: " ";
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					border-radius: 10px;
					box-shadow: 0 3px 6px 0 rgba(60, 64, 67, 0.3), 0 3px 9px 3px rgba(60, 64, 67, 0.15);
					opacity: ${props.active ? '1' : '0'};
					will-change: opacity;
					transition: opacity 0.6s;
				}

				@media (max-width: 900px) {
					.card {
						min-width: 85%;
					}
				}
			`}</style>
		</React.Fragment>
	);
};

export default card;
