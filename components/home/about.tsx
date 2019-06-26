import React from 'react';

export default () => (
	<React.Fragment>
		<section className="about">
			{/* <img className='about-img' src="../static/snowden1.jpg" /> */}
			<blockquote className="about-quote">
				Passionate about software; love building products, solving complex problems and learning every day.
			</blockquote>
		</section>
		<style jsx>{`
			.about {
				display: flex;
				justify-content: space-between;
				align-items: center;
				max-width: 1024px;
				margin: 5rem auto;
			}

			.about-img {
				border-radius: 50%;
				height: 250px;
			}

			.about-quote {
				font-size: 1.5rem;
				text-align: center;
				color: rgba(0, 0, 0, 0.7);
			}

			@media (max-width: 600px) {
				.about {
					max-width: 85%;
					margin: 3rem auto;
				}

				.about-quote {
					font-size: 1.2em;
				}
			}
		`}</style>
	</React.Fragment>
);
