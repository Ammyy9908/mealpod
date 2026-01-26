import Image from "next/image";
import Header from "../components/header/index.jsx";
import Footer from "../components/footer/index.jsx";
import Carousel from "../components/carousel/index.jsx";
import LocationsImpact from "../components/locations-impact/index.jsx";
import WhoWeServe from "../components/who-we-serve/index.jsx";
import ReasonsToLove from "../components/reasons-to-love/index.jsx";
import FlexibleMealPlans from "../components/flexible-meal-plans/index.jsx";

export default function Home() {
  return (
    <>
     <Header />
     <Carousel />
     <LocationsImpact />
     <WhoWeServe />
     {/* <ReasonsToLove /> */}
     <FlexibleMealPlans />
     <section>
      <h1>Welcome to Mealawe</h1>
      <p>We are a meal delivery service that delivers healthy meals to your doorstep.</p>
     </section>
     <Footer />
    </>
  );
}
