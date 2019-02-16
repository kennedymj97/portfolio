import React from 'react';
import Page from '../components/page';
import Header from '../components/header';
import About from '../components/about';
import Projects from '../components/projects';
import Education from '../components/education';
import Experience from '../components/experience';
import Footer from '../components/footer';

const Home = () => (
	<Page>
		<Header />
		<About />
		<Projects />
		<Education />
		<Experience />
		<Footer />
	</Page>
);

export default Home;
