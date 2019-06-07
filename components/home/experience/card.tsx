import React from 'react';

type Props = {
	role: string;
	placeDate: string;
	imgSource: string;
	experiences: string[];
};

export default (props: Props) => (
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
				justify-content: space-between;
				box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24), 0 1px 3px 1px rgba(0, 0, 0, 0.12);
				margin-bottom: 2rem;
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

			.role {
				margin: 0 0 10px 0;
			}

			.place-date {
				margin: 0;
			}

			.experience-image {
				background-image: url(${props.imgSource});
				background-size: cover;
				background-repeat: no-repeat;
				width: 40%;
			}

			@media (max-width: 600px) {
				.experience-card {
					flex-direction: column;
				}

				.experience-details {
					width: 100%;
					box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24), 0 1px 3px 1px rgba(0, 0, 0, 0.12);
				}

				.experience-image {
					width: 100%;
					height: 200px;
				}

				.role,
				.place-date {
					text-align: center;
				}
			}
		`}</style>
	</React.Fragment>
);
