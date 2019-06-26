import React from 'react';

import Card from './card';
import MinimalButton from '../../UI/button-minimal';

type Props = {
	projects: Project[];
	toggle: () => void;
	toggled: boolean;
};

export default (props: Props) => {
	const cards = props.projects.map((ele) => (
		<Card
			key={ele.id}
			title={ele.title}
			info={ele.summary}
			imageSrc={ele.imageUrl}
			github={ele.repoUrl}
			url={ele.appUrl}
		/>
	));

	return (
		<React.Fragment>
			<section className="projects">
				<div className="projects-container">
					<h2>Projects</h2>
					<div className="cards-container">{cards}</div>
					<MinimalButton clicked={props.toggle} newTab={false}>
						{props.toggled ? (
							<React.Fragment>
								<span className="show-button-text">Show less projects</span>
								<i className="fas fa-angle-up" />
							</React.Fragment>
						) : (
							<React.Fragment>
								<span className="show-button-text">Show more projects</span>
								<i className="fas fa-angle-down" />
							</React.Fragment>
						)}
					</MinimalButton>
				</div>
			</section>
			<style jsx>{`
				.projects {
					width: 100%;
					background: #f6f6f6;
				}

				.projects-container {
					max-width: 1024px;
					padding: 4rem 0;
					margin: 0 auto;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				.projects-button-text {
					margin-right: 8px;
				}

				.cards-container {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					grid-gap: 3vh;
					margin-bottom: 2rem;
				}

				.show-button-text {
					padding-right: 10px;
				}

				@media (max-width: 1260px) {
					.cards-container {
						grid-template-columns: repeat(2, 1fr);
						max-width: 85%;
					}
				}

				@media (max-width: 800px) {
					.cards-container {
						grid-template-columns: 1fr;
					}
				}
			`}</style>
		</React.Fragment>
	);
};
