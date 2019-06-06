import React from 'react';

export default () => (
	<React.Fragment>
		<section className="education">
			<h2>Education</h2>
			<div className="education-info-container">
				<div className="education-info">
					<h3>BEng Mechanical Engineering Including an Industrial Year</h3>
					<h4>University of Nottingham | 2015 - 2019</h4>
					<p>First Class Honours</p>
				</div>
				<div className="education-info">
					<h3>A Levels</h3>
					<div className="education-info-icons">
						<div className="education-info-alevel">
							<h4>Maths</h4>
							<p>A*</p>
						</div>
						<div className="education-info-alevel">
							<h4>Further Maths</h4>
							<p>A</p>
						</div>
						<div className="education-info-alevel">
							<h4>Physics</h4>
							<p>A*</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<style jsx>{`
			.education {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				max-width: 1024px;
				margin: 4rem auto;
			}

			.education-info-container {
				display: flex;
				flex-direction: column;
				width: 100%;
				justify-content: space-between;
				padding: 0 7%;
			}

			.education-info {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				margin-bottom: 1rem;
			}

			@media(max-width: 600px) {
				.education {
					max-width: 85%;
					margin: 2rem auto;
				}
			}

			.education-info p,
			h3,
			h4 {
				margin: 0 0 8px 0;
			}

			.education-info-icons {
				display: flex;
			}

			.education-info-alevel {
				padding: 0 20px;
			}
		`}</style>
	</React.Fragment>
);
