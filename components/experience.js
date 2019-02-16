import React from 'react';
import ExperienceCard from './experienceCard/experienceCard';

const experience = (props) => {
	const experienceInfo = [
		{
			id: 0,
			role: 'Computer Vision Intern',
			placeDate: 'Rolls-Royce | June 2018 - Present',
			experiences: [
				'Researching and developing deep learning applications. Currently have 2 patents being produced based on my work.',
				'Designing, testing and implementing IoT vision systems.',
				'Learning; have gone from having never written a line of python code to having 2 patents based on deep learning in 6 months.',
				'Gained experience with Python (PyTorch, Fastai, Django Rest Framework, OpenCV), Javascript (React) and HTML and CSS.'
			],
			imgSource: '../../static/lorem.jpg'
		},
		{
			id: 1,
			role: 'Volunteer Sports Leader',
			placeDate: 'University of Nottingham | 2016 - 2018',
			experiences: [
				'Created and led sessions with a team of volunteers, using imaginative games to teach children important life skills.',
				'Assisted with the training of new volunteers.'
			],
			imgSource: '../../static/lorem.jpg'
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
			imgSource: '../../static/lorem.jpg'
		}
	];

	const experienceCards = experienceInfo.map((ele, idx) => (
		<ExperienceCard
			key={ele.id}
			role={ele.role}
			placeDate={ele.placeDate}
			experiences={ele.experiences}
			imgSource={ele.imgSource}
		/>
	));

	return (
		<React.Fragment>
			<section className="experience">
				<div className="experience-container">
					<h2>Experience</h2>
					<div className="experience-cards">{experienceCards}</div>
				</div>
			</section>
			<style jsx>{`
				.experience {
          width: 100%;
          background: #f6f6f6;
				}

				.experience-container {
          padding: 2rem 0;
					align-items: center;
					justify-content: center;
					max-width: 1024px;
					margin: 0 auto;
					display: flex;
					flex-direction: column;
				}

				.experience-cards {
          width: 100%;
				}
			`}</style>
		</React.Fragment>
	);
};

export default experience;
