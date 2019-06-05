import React from "react";
import Page from "../components/page";
import Header from "../components/home/header";
import About from "../components/home/about";
import Projects from "../components/home/projects";
import Education from "../components/home/education";
import Experience from "../components/home/experience";
import Footer from "../components/footer";

type Props = {
  projects: [];
}

const Index = (props: Props) => (
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
