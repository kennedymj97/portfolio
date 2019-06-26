import React from 'react';

import ExperienceCard from './card';
import MinimalButton from '../../UI/button-minimal';

type Props = {
	experiences: Experience[];
};

export default (props: Props) => {
	const experienceCards = props.experiences.map((ele) => (
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
					<h2 style={{ marginBottom: '2rem' }}>Experience</h2>
					<div className="experience-cards">{experienceCards}</div>
					<MinimalButton clicked={() => window.scrollTo(0, 0)} newTab={false}>
						<span className="back-to-top-text">Back to top</span>
						<i className="fas fa-angle-up" />
					</MinimalButton>
				</div>
			</section>
			<style jsx>{`
				.experience {
					width: 100%;
					background: #f6f6f6;
				}

				.experience-container {
					padding: 2rem 0 55px;
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

				@media (max-width: 1260px) {
					.experience-container {
						max-width: 85%;
					}
				}

				.back-to-top-text {
					padding-right: 10px;
				}
			`}</style>
		</React.Fragment>
	);
};
