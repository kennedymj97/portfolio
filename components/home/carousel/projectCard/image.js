import React from 'react';

const image = (props) => {
	return (
		<React.Fragment>
			<div className='image' />
			<style jsx>{`
				.image {
					background-image: url(${props.url});
					background-size: cover;
					width: 100%;
					height: 100%;
					border-radius: 10px 10px 0 0;
				}
			`}</style>
		</React.Fragment>
	);
};

export default image;
