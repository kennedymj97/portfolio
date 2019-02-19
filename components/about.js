import React from 'react';

const about = (props) => (
	<React.Fragment>
		<section className="about">
			<img className='about-img' src="../static/snowden1.jpg" />
			<blockquote className='about-quote'>
				I want to work at the forefront of technology; building products, solving complex problems and learning every day.
			</blockquote>
		</section>
		<style jsx>{`
			.about {
				display: flex;
				justify-content: space-between;
				align-items: center;
				max-width: 1024px;
				margin: 7rem auto;
			}

			.about-img {
				border-radius: 50%;
				height: 300px;
			}

			.about-quote {
				font-size: 1.2rem;
			}
		`}</style>
	</React.Fragment>
);

export default about;
