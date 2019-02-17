import React from 'react';
import Card from './card';
import Spinner from './spinner';

const cards = (props) => {
	let cards = <Spinner />;
	cards = props.projects.map((project) => <Card key={project.id} name={project.name}/>);

	return (
		<React.Fragment>
			<div className="page">
				<div className="cards">{cards}</div>
			</div>
			<style jsx>{`
				.page {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100vh;
				}
				.cards {
                    display: flex;
                    flex-flow: row wrap;
				}
			`}</style>
		</React.Fragment>
	);
};

export default cards;
