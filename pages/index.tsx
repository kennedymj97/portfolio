import React from "react";

import Page from "../components/page";
import Header from "../components/home/header";
import About from "../components/home/about";
import Projects from "../components/home/projects/projects";
import Education from "../components/home/education";
import Experience from "../components/home/experience/experience";
import Footer from "../components/footer";

const Index = () => (
  <Page>
    <Header />
    <About />
    <Projects />
    <Education />
    <Experience />
    <Footer />
  </Page>
);

export default Index;
