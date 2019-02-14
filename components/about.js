import React from 'react';

const about = (props) => (
	<React.Fragment>
		<section className="about">
			<img src="../static/snowden1.jpg" />
			<blockquote>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
				fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
				deserunt mollit anim id est laborum.
			</blockquote>
		</section>
		<style jsx>{`
			.about {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .about img {
                border-radius: 50%;
                height: 300px;
            }
		`}</style>
	</React.Fragment>
);

export default about;
