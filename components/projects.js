import React from "react";
import Carousel from "./carousel/carousel";
import Button from "@material-ui/core/Button/Button";

const projects = props => (
  <React.Fragment>
    <section className="projects">
      <div className="projects-container">
        <h2>Projects</h2>
        <Carousel projects={props.projects} />
        <Button
          href="https://github.com/kennedymj97"
          style={{
            color: "white",
            background: "#0076ff",
            boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)"
          }}
        >
          View All Projects
        </Button>
      </div>
    </section>
    <style jsx>{`
      .projects {
        width: 100%;
        background: #f6f6f6;
      }

      .projects-container {
        max-width: 1024px;
        padding: 4rem 0;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </React.Fragment>
);

export default projects;
