import React from "react";
import Page from "../components/page";
import Header from "../components/header";
import About from "../components/about";
import Projects from "../components/projects";
import Education from "../components/education";
import Experience from "../components/experience";
import Footer from "../components/footer";

const Index = (props) => (
  <Page>
    <Header />
    <About />
    <Projects projects={props.projects}/>
    <Education />
    <Experience />
    <Footer />
  </Page>
);

Index.getInitialProps = async function() {
  const res = await fetch("https://api.github.com/users/kennedymj97/repos");
  const data = await res.json();

  // console.log(`Show data fetched. Count: ${data.length}`);

  return {
    projects: data
  };
};

export default Index;
