import React from 'react';
import Head from '../components/head';
import GlobalStyles from '../components/globalStyles';
import Cards from '../components/cards';

const Index = (props) => (
	<React.Fragment>
		<Head title="Home" />
		<GlobalStyles />
		<Cards projects={props.projects} />
	</React.Fragment>
);

Index.getInitialProps = async function() {
  const res = await fetch('https://api.github.com/users/kennedymj97/repos')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    projects: data
  }
}

export default Index;
