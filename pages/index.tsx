import React, { useState } from 'react';

import Page from '../components/home/page';
import Header from '../components/home/header';
import About from '../components/home/about';
import Projects from '../components/home/projects/projects';
import Education from '../components/home/education';
import Experience from '../components/home/experience/experience';
import Footer from '../components/home/footer';

const projects: Project[] = [
	{
		id: 1,
		title: 'Todo App (Backend)',
		summary: 'Http api built using golang for the todo app. Deployed on an AWS EC2 instance.',
		imageUrl: '../../../../static/golang.jpg',
		repoUrl: 'https://github.com/kennedymj97/todo-api',
		appUrl: 'https://www.mattkennedy.io/todo'
	},
	{
		id: 2,
		title: 'Todo App (Frontend)',
		summary: 'React/Typescript todo app frontend. Interacts with the golang todo api. Inspired by TodoMVC.',
		imageUrl: '../../../../static/todo.jpg',
		repoUrl: 'https://github.com/kennedymj97/todo-frontend',
		appUrl: 'https://www.mattkennedy.io/todo'
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

const experienceInfo: Experience[] = [
	{
		id: 0,
		role: 'Computer Vision Intern',
		placeDate: 'Rolls-Royce | June 2018 - Present',
		experiences: [
			'Researching and developing deep learning applications. Currently have 2 patents being produced based on my work.',
			'Designing, testing and implementing IoT vision systems.',
			'Gained experience with Python (PyTorch, Fastai, Django Rest Framework, OpenCV), Javascript (React, Next.js), HTML and CSS.'
		],
		imgSource: '../../static/code.jpg'
	},
	{
		id: 1,
		role: 'Volunteer Sports Leader',
		placeDate: 'University of Nottingham | 2016 - 2018',
		experiences: [
			'Created and led sessions with a team of volunteers, using imaginative games to teach children important life skills.',
			'Assisted with the training of new volunteers.'
		],
		imgSource: '../../static/sports_leader.jpg'
	},
	{
		id: 2,
		role: 'Volunteer Conservationist',
		placeDate: 'Projects Abroad | June - August 2017',
		experiences: [
			'Planted hundreds of mangrove trees in an effort to revive habitats and reduce coastal erosion.',
			'Carred out fish surveys and coral propagation projects to monitor and preserve coral reefs.',
			'Educated young people in the local population on conservation'
		],
		imgSource: '../../static/conservation.jpg'
	}
];

export default () => {
	const [ numOfProjects, setNumOfProjects ] = useState<number>(3);

	const projectCards = projects.slice(0, numOfProjects);

	const toggleProjects = () => {
		numOfProjects === projects.length ? setNumOfProjects(3) : setNumOfProjects(projects.length);
	};

	return (
		<Page>
			<Header />
			<About />
			<Projects
				projects={projectCards}
				toggle={() => toggleProjects()}
				toggled={numOfProjects === projects.length}
			/>
			<Education />
			<Experience experiences={experienceInfo} />
			<Footer />
		</Page>
	);
};
