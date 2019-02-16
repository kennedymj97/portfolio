import React from 'react';
import Carousel from './carousel/carousel';

const projects = (props) => (
	<React.Fragment>
		<section className="projects">
			<div className="projects-container">
				<h2>Projects</h2>
				<Carousel />
			</div>
		</section>
		<style jsx>{`
			.projects {
				width: 100%;
        background: #f6f6f6;
			}

			.projects-container {
        max-width: 1024px;
        padding: 2rem 0;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		`}</style>
	</React.Fragment>
);

export default projects;
