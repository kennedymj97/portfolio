import React from 'react';

const education = (props) => (
	<React.Fragment>
		<section className="education">
			<h2>Education</h2>
			<div className="education-info-container">
				<div className="education-info education-info-left">
					<h3>BEng Mechanical Engineeing Including an Industrial Year</h3>
					<h4>Univeristy of Nottingham</h4>
					<p>First Class Honours</p>
					<img src="../static/icons8-robot-96.png" className="education-info-icon" />
				</div>
				<div className="education-info education-info-right">
					<h3>A Levels</h3>
					<div className="education-info-icons">
						<div className="education-info-alevel">
							<h4>Maths</h4>
							<p>A*</p>
							<img src="../static/icons8-math-96.png" className="education-info-icon"/>
						</div>
						<div className="education-info-alevel">
							<h4>Physics</h4>
							<p>A*</p>
							<img src="../static/icons8-physics-96.png" className="education-info-icon"/>
						</div>
						<div className="education-info-alevel">
							<h4>Further Maths</h4>
							<p>A</p>
							<img src="../static/icons8-formula-fx-96.png" className="education-info-icon" />
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
				margin: 2rem auto;
			}

			.education-info-container {
				display: flex;
				width: 100%;
				justify-content: space-between;
				padding: 0 7%;
			}

			.education-info {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
			}

			.education-info-right {
				margin-left: 2%;
			}

			.education-info-left {
				margin-right: 2%;
			}

			.education-info p, h3, h4 {
				margin: 0;
			}

			.education-info-icons {
				display: flex;
			}

			.education-info-icon {
				width: 72px;
			}

			.education-info-alevel {
				padding: 0 10px 10px 10px;
			}
		`}</style>
	</React.Fragment>
);

export default education;
