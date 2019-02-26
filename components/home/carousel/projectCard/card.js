import React, { useState, useEffect } from 'react';
import Image from './image';
import About from './info';
import fetch from 'isomorphic-unfetch';
import Spinner from '../../../spinner';

const card = (props) => {
	const [ projectInfo, setProjectInfo ] = useState(null);

	const fetchData = async () => {
		try {
			const res = await fetch(
				`https://raw.githubusercontent.com/kennedymj97/${props.name}/master/project-info.json`
			);
			const data = await res.json();
			setProjectInfo(data.data);
		} catch (err) {
			console.log('Error: failed to retrieve project info', err);
			setProjectInfo('ERROR');
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	let information = <Spinner />;
	if (projectInfo) {
		information = (
			<React.Fragment>
				<Image url={projectInfo.imageUrl} />
				<About title={projectInfo.title} info={projectInfo.summary} repo={projectInfo.repoUrl} />
			</React.Fragment>
		);
	}

	// box-shadow: ${props.active
	//   ? "0 4px 8px 0 rgba(60, 64, 67, 0.3), 0 4px 12px 4px rgba(60, 64, 67, 0.15)"
	//   : "0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)"};

	return (
		<React.Fragment>
			<div className="card">{projectInfo === 'ERROR' ? 'Error loading project information' : information}</div>
			<style jsx>{`
				.card {
					height: ${props.active ? '400px' : '360px'};
					min-width: 42.5%;
					border-radius: 10px;
					box-shadow: ${props.active ? null : '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)'};
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
					will-change: transform, opacity, height;
					transform: translateX(${props.translate}px);
					transition: opacity 0.6s ease-out, transform 0.6s ease-out, height 0.6s ease-out;
          position: relative;
				}
        
        .card::before {
          content: ' ';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(60, 64, 67, 0.3), 0 3px 9px 3px rgba(60, 64, 67, 0.15);
          opacity: ${props.active ? '1' : '0'};
          transition: opacity 0.6s ease-out;
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
