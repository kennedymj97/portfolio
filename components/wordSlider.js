import React, { useState, useEffect } from 'react';
import { animated, useTransition } from 'react-spring';

const wordSlider = (props) => {
	const [ index, setIndex ] = useState(0);
	const [ children, setChildren ] = useState(React.Children.toArray(props.children));
	const transitions = useTransition(children[index], (item) => item.key, {
		from: { opacity: 0, transform: 'translate3d(0, -50%, 0)' },
		enter: { opacity: 1, transform: 'translate3d(0, 0%, 0)' },
		leave: { opacity: 0, transform: 'translate3d(0, 60%, 0)' }
	});
	let animation;

	useEffect(() => {
		animation = setInterval(() => setIndex((index) => (index + 1) % children.length), props.duration || 1500);

		return () => clearInterval(animation);
	}, []);

	return transitions.map(({ item, props, key }) => (
		<animated.div key={key} style={{ ...props, position: 'absolute' }}>
			{item}
		</animated.div>
	));
};

export default wordSlider;
