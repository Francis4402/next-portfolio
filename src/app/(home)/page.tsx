import About from "../components/About";
import Experience from "../components/Experience";
import Hero from "../components/Hero";
import Tech from "../components/Tech";
import Works from "../components/worksection/Works";
import Contact from "../components/Contact";
import Courses from "../components/Courses";
import Education from "../components/Education";



export default async function Home() {


  return (
    <div>
      <div className="container mx-auto md:px-0 px-5">
        <Hero/>
        <About/>
        <Education/>
        <Courses/>
        <Experience/>
        <Tech/>
        <Works/>
        <Contact />
      </div>
    </div>
  );
}
