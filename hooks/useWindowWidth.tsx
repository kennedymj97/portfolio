import { useEffect, useState } from 'react';

const useWindowWidth = () => {
	const isClient = typeof window === 'object';

	const getWidth = () => {
		return isClient ? window.innerWidth : undefined;
	};

	const [ windowWidth, setWindowWidth ] = useState(getWidth);

	useEffect(() => {
		if (!isClient) {
			return;
		}

		const handleResize = () => {
			setWindowWidth(getWidth());
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowWidth;
};

export default useWindowWidth;
