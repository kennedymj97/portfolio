import React from 'react';

const image = (props) => (
	<React.Fragment>
		<div className="card-image" />
		<style jsx>{`
			.card-image {
				flex-grow: 1;
				overflow: hidden;
				background-image: url('../../../../static/lorem.jpg');
				background-size: cover;
				background-repeat: no-repeat;
			}
		`}</style>
	</React.Fragment>
);

export default image;
