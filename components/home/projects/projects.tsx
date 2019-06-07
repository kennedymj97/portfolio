import React, { useState } from 'react';

import Card from './card';
import MinimalButton from '../../UI/button-minimal';

const projects = [
	{
		id: 1,
		title: 'Todo App (Backend)',
		summary: 'Http api built using golang for the todo app. Deployed on an AWS EC2 instance.',
		imageUrl: '../../../../static/golang.jpg',
		repoUrl: 'https://github.com/kennedymj97/todo-api',
		appUrl: 'http://localhost:3000/todo'
	},
	{
		id: 2,
		title: 'Todo App (Frontend)',
		summary: 'React/Typescript todo app frontend. Interacts with the golang todo api. Inspired by TodoMVC.',
		imageUrl: '../../../../static/todo.jpg',
		repoUrl: 'https://github.com/kennedymj97/todo-frontend',
		appUrl: 'http://localhost:3000/todo'
	},
	{
		id: 3,
		title: 'Portfolio Website',
		summary: 'Website used to give information about me and show off projects I have been working on.',
		imageUrl: '../../../../static/portfolioLogos.jpg',
		repoUrl: 'https://github.com/kennedymj97/portfolio',
		appUrl: undefined
	},
	{
		id: 4,
		title: 'Detecting Smiles',
		summary: 'Project that used deep learning to predict if someone is smiling in real time',
		imageUrl: '../../../../static/happy.jpg',
		repoUrl: 'https://github.com/kennedymj97/detecting-smiles',
		appUrl: undefined
	}
];

export default () => {
	const [ items, setItems ] = useState<number>(3);

	const cards = projects.map((ele) => (
		<Card
			key={ele.id}
			title={ele.title}
			info={ele.summary}
			imageSrc={ele.imageUrl}
			github={ele.repoUrl}
			url={ele.appUrl}
		/>
	));

	const slice = cards.slice(0, items);

	return (
		<React.Fragment>
			<section className="projects">
				<div className="projects-container">
					<h2>Projects</h2>
					<div className="cards-container">{slice}</div>
					<MinimalButton
						clicked={() => (items === cards.length ? setItems(3) : setItems(cards.length))}
						newTab={false}
					>
						{items === cards.length ? (
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
					width: 100%;
					grid-template-columns: repeat(3, 1fr);
					grid-gap: 3vh;
					margin-bottom: 2rem;
				}

				.show-button-text {
					padding-right: 10px;
				}
			`}</style>
		</React.Fragment>
	);
};
