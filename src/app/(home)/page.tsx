import About from "../components/About";
import Experience from "../components/Experience";
import Hero from "../components/Hero";
import Tech from "../components/Tech";
import Works from "../components/worksection/Works";
import Blogs from "../components/blogsection/Blogs";


export default async function Home() {


  return (
    <div>
      <div className="container mx-auto md:px-0 px-5">
        <Hero/>
        <About/>
        <Experience/>
        <Tech/>
        <Works/>
        <Blogs/>
      </div>
    </div>
  );
}
