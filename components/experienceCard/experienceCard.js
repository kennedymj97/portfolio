import React from 'react';

const experienceCard = (props) => (
	<React.Fragment>
		<div className="experience-card">
			<div className="experience-details">
				<h3 className="role">{props.role}</h3>
				<h4 className="place-date">{props.placeDate}</h4>
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
				box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24), 0 1px 3px 1px rgba(0, 0, 0, 0.12);
				margin-bottom: 30px;
                border-radius: 10px;
                overflow: hidden;
			}

			.experience-details {
				display: flex;
				flex-flow: column wrap;
				padding: 13px;
				width: 60%;
				box-shadow: 1px 0 2px 0 rgba(0, 0, 0, 0.24), 1px 0 3px 1px rgba(0, 0, 0, 0.12);
				z-index: 5;
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
				width: 40%;
			}
		`}</style>
	</React.Fragment>
);

export default experienceCard;
