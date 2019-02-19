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
			imgSource: '../../static/comp_vision.png'
		},
		{
			id: 1,
			role: 'Volunteer Sports Leader',
			placeDate: 'University of Nottingham | 2016 - 2018',
			experiences: [
				'Created and led sessions with a team of volunteers, using imaginative games to teach children important life skills.',
				'Assisted with the training of new volunteers.'
			],
			imgSource: '../../static/sports_leader.png'
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
					<a href="#header" className="back-to-top">
						<span className="back-to-top-text">Back To Top</span>
						<i className="fas fa-angle-up" />
					</a>
				</div>
			</section>
			<style jsx>{`
				.experience {
					width: 100%;
					background: #f6f6f6;
				}

				.experience-container {
					padding: 4rem 0 70px;
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

				.back-to-top {
					text-decoration: none;
					color: #0076ff;
					border-radius: 7px;
					transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
					padding: 0.25rem 0.5rem;
					margin: -0.25rem -0.5rem;
					cursor: pointer;
					margin-top: 30px;
				}

				.back-to-top:hover {
					background: rgba(0, 118, 255, 0.1);
				}

				.back-to-top-text {
					padding-right: 10px;
				}
			`}</style>
		</React.Fragment>
	);
};

export default experience;
