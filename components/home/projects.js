import React from 'react';
import Carousel from './carousel/carousel';
import Button from '@material-ui/core/Button/Button';

const projects = (props) => {
  // The mui button isn't rendering with the styles???
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
		}
	];

	return (
		<React.Fragment>
			<section className="projects">
				<div className="projects-container">
					<h2>Projects</h2>
					<Carousel projects={projects} />
					<Button
						href="https://github.com/kennedymj97"
						style={{
							color: 'white',
							background: '#0076ff',
							boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
						}}
					>
						<span className="projects-button-text">View All Projects</span>
						<i className="fab fa-github fa-2x" />
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
			`}</style>
		</React.Fragment>
	);
};

export default projects;
