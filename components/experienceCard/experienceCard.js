import React from 'react';

const experienceCard = (props) => (
	<React.Fragment>
		<div className="experience-card">
			<div className="experience-details">
				<span className="role">{props.role}</span>
				<span className="place-date">{props.placeDate}</span>
				<ul>{props.experiences.map((ele, idx) => <li key={idx}>{ele}</li>)}</ul>
			</div>
			<div className="experience-image" />
		</div>
		<style jsx>{`
			.experience-card {
				background: white;
				display: flex;
				flex-flow: row;
				justify-content: space-between;
				box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
				margin-bottom: 30px;
                border-radius: 10px;
                overflow: hidden;
			}

			.experience-details {
				display: flex;
				flex-flow: column wrap;
				padding: 13px;
				width: 70%;
			}

			.role,
			.place-date {
				margin-bottom: 10px;
			}

			.experiences {
			}

			.experience-image {
                background-image: url(${props.imgSource});
                background-size: cover;
                background-repeat: no-repeat;
                width: 25%;
			}
		`}</style>
	</React.Fragment>
);

export default experienceCard;
