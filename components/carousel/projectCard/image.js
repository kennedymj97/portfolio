import React, { useState, useEffect } from 'react';
import Spinner from '../../spinner';

const image = (props) => {
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		const imageLoader = new Image();
		imageLoader.src = props.url;
		imageLoader.onload = () => {
			setLoading(false);
		};
	});

	// console.log(loading)

	let image = <Spinner />;
	if (!loading) {
		image = <img src={props.url} style={{objectFit: 'cover', flex: '1'}} />;
	}

	return (
		<React.Fragment>
			{image}
			<style jsx>{`
                .image2 {
                    object-fit: cover;
                    flex-shrink: 1;
                }
            `}</style>
		</React.Fragment>
	);
};

export default image;
