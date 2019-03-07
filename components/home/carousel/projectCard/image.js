import React, { useState, useEffect } from 'react';
import Spinner from '../../../spinner';

const image = (props) => {
	return (
		<React.Fragment>
			<div
				style={{
					backgroundImage: `url(${props.url})`,
					backgroundSize: 'cover',
					width: '100%',
					height: '100%',
					borderRadius: '10px 10px 0 0'
				}}
			/>
			<style jsx>{`
				.image2 {
					object-fit: contain;
					flex-shrink: 1;
				}
			`}</style>
		</React.Fragment>
	);
};

export default image;
