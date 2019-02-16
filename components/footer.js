import React from 'react';

const footer = (props) => (
	<React.Fragment>
		<footer className="footer" />
		<style jsx>{`
			.footer {
				width: 100%;
				margin: 0 auto;
				padding: 0 0;
				background-image: linear-gradient(to bottom, #121212 0%, #323232 100%);
				color: #f1f1f1;
                overflow: hidden;
                padding: 2rem 0 4rem;
                min-height: 400px;
			}
		`}</style>
	</React.Fragment>
);

export default footer;
