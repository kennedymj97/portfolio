import React, { useState } from 'react';
import Button from '@material-ui/core/Button/Button';
import Card from './card';

const projects = [
	{
		id: 1,
		title: 'Portfolio Website',
		summary: 'Website used to give information about me and show off projects I have been working on.',
		imageUrl: '../../../../static/portfolioLogos.jpg',
		readmeUrl: 'https://raw.githubusercontent.com/kennedymj97/portfolio/master/README.md',
		repoUrl: 'https://github.com/kennedymj97/portfolio'
	},
	{
		id: 2,
		title: 'Bookshelf',
		summary:
			'I read a lot so am creating a web app to store the books I have read and some of my notes and thoughts about them.',
		imageUrl: '../../../../static/books.jpg',
		readmeUrl: 'https://raw.githubusercontent.com/kennedymj97/bookshelf/master/README.md',
		repoUrl: 'https://github.com/kennedymj97/bookshelf'
	},
	{
		id: 3,
		title: 'Detecting Smiles',
		summary: 'Project that used deep learning to predict if someone is smiling in real time',
		imageUrl: '../../../../static/smiling-faces.jpg',
		readmeUrl: 'https://raw.githubusercontent.com/kennedymj97/detecting-smiles/master/README.md',
		repoUrl: 'https://github.com/kennedymj97/detecting-smiles'
	},
	{
		id: 4,
		title: 'Detecting Smiles',
		summary: 'Project that used deep learning to predict if someone is smiling in real time',
		imageUrl: '../../../../static/smiling-faces.jpg',
		readmeUrl: 'https://raw.githubusercontent.com/kennedymj97/detecting-smiles/master/README.md',
		repoUrl: 'https://github.com/kennedymj97/detecting-smiles'
	},
	{
		id: 5,
		title: 'Detecting Smiles',
		summary: 'Project that used deep learning to predict if someone is smiling in real time',
		imageUrl: '../../../../static/smiling-faces.jpg',
		readmeUrl: 'https://raw.githubusercontent.com/kennedymj97/detecting-smiles/master/README.md',
		repoUrl: 'https://github.com/kennedymj97/detecting-smiles'
	},
	{
		id: 6,
		title: 'Detecting Smiles',
		summary: 'Project that used deep learning to predict if someone is smiling in real time',
		imageUrl: '../../../../static/smiling-faces.jpg',
		readmeUrl: 'https://raw.githubusercontent.com/kennedymj97/detecting-smiles/master/README.md',
		repoUrl: 'https://github.com/kennedymj97/detecting-smiles'
	},
	{
		id: 7,
		title: 'Detecting Smiles',
		summary: 'Project that used deep learning to predict if someone is smiling in real time',
		imageUrl: '../../../../static/smiling-faces.jpg',
		readmeUrl: 'https://raw.githubusercontent.com/kennedymj97/detecting-smiles/master/README.md',
		repoUrl: 'https://github.com/kennedymj97/detecting-smiles'
	}
];

export default () => {
	const [ items, setItems ] = useState<number>(3);

	const cards = projects.map((ele) => (
		<Card key={ele.id} title={ele.title} info={ele.summary} imageSrc={ele.imageUrl} github={ele.repoUrl} />
	));

	const slice = cards.slice(0, items);

	return (
		<React.Fragment>
			<section className="projects">
				<div className="projects-container">
					<h2>Projects</h2>
					<div className="cards-container">{slice}</div>
					<Button
						onClick={() => (items === cards.length ? setItems(3) : setItems(cards.length))}
						style={{
							color: 'white',
							background: '#0076ff',
							boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
							zIndex: 10
						}}
					>
						{items === cards.length ? 'Show less projects' : 'Show more projects'}
					</Button>
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
			`}</style>
		</React.Fragment>
	);
};
