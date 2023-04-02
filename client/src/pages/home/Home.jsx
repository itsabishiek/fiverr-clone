import React from "react";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import Explore from "../../components/explore/Explore";
import Featured from "../../components/featured/Featured";
import Features from "../../components/features/Features";
import ProjectCard from "../../components/projectCard/ProjectCard";
import Slide from "../../components/slide/Slide";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import { cards, projects } from "../../utils/data";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CategoryCard key={card.id} card={card} />
        ))}
      </Slide>

      <Features />

      <Explore />

      <Features dark />

      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;
