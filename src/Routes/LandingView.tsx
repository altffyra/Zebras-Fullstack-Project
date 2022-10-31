import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import "../styles/_landing.scss";
import { useEffect, useState, useRef } from "react";
import { Order } from "../models/types";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { actions as tempOrderActions } from "../features/tempOrderReducer";
import { actions as cartActions } from "../features/cartReducer";
import heroVideo from '../assets/hero-video.mp4';
import logoLight from "../assets/logoLight.svg";
import chefCooking from "../assets/chef-cooking.jpg"
import foodImg from "../assets/food.jpg"
import ourGoal from "../assets/our-goal.jpg"

const LandingView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [offset, setOffset] = useState<number>(0);
  const [navCSS, setNavCSS] = useState<boolean>(false)
  const setScroll = () => {
    setOffset(window.scrollY);
  };

  useEffect(() => {
    const navElem: HTMLElement | null = document.querySelector('header');
    const scrollHeight = window.pageYOffset;
    if(navElem) {
      let navHeight = navElem.getBoundingClientRect().height;
      if(scrollHeight < navHeight) {
        setNavCSS(true)
        videoRef.current && videoRef.current.play();
      } else {
        setNavCSS(false)
        videoRef.current && videoRef.current.pause();
      }
    }

    window.addEventListener("scroll", setScroll);
    return () => {
      window.removeEventListener("scroll", setScroll);
    };
  }, [offset]);

  const tempOrder: Order | undefined = useSelector(
    (state: RootState) => state.tempOrder
  )[0];
  
  useEffect(() => {
    const root:any = document.querySelector('#root');
    root.scrollIntoView({
    behavior: 'instant'
  });
    if (tempOrder) {
      dispatch(tempOrderActions.clearTempOrder());
      dispatch(cartActions.clearCart());
    }
  }, []);

  function goToMenu() {
    navigate("/Menu");
  }

  return (
    <main className="landing" onScroll={()=>console.log("Scrolled")}>
      <Nav scrollTop={navCSS} />
      <section className="hero" >
      <video className="video-container" ref={videoRef} muted playsInline autoPlay loop  >
            <source src={heroVideo} type="video/mp4"/> 
        </video>
        <div className="logo-container">
          <h2>Rocksalt</h2>
          <img src={logoLight} alt="rocksalt logo" className="logo" />
        </div>
        <button onClick={goToMenu}>Meny</button>
      </section>
      <section className="about-page">
        <section className="about-us" >
          <div className="border">
            <h3>Om oss</h3>
          </div>
          <p>
            Rocksalt grundades av Christian Johnsson år 2022 med idén om att
            personer ska kunna få god och vällagad restaurangmat utan besväret att
            behöva sitta på en restaurang.
          </p>
        </section>
        <figure className="about-us-img" style={{ backgroundImage: `url(${chefCooking})`}}></figure>

        <figure className="our-food-img" style={{ backgroundImage: `url(${foodImg})`}}></figure>
        <section className="our-food">
          <div className="border">
            <h3>Vår mat</h3>
          </div>
          <p>
            Alla våra råvaror är lokalproducerade. Vi samarbetar med ett gäng
            glada bönder i Värmland! Våra kockar arbetar ständigt med att
            komponera nya, spännande, smakrika rätter! Dagliga kontroller
            genomförs för att säkerställa att vår mat håller den allra högsta
            standarden.
          </p>
        </section>

        <section className="our-goal">
          <div className="border">
            <h3>Vårt mål</h3>
          </div>
          <p>
            Vår grundare Christian Johnsson har som mål att alla i hela världen
            ska få äta bra mat, även om man inte kan ta sig till en restaurang.
          </p>
        </section>
        <figure className="our-goal-img" style={{ backgroundImage: `url(${ourGoal})`}}></figure>


      <section className="map">
        <div className="info-where">
          <h4>Hitta till oss</h4>
          <p>Lambergskajen</p>
          <p>652 21 Karlstad</p>
        </div>
        

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8131.132788853451!2d13.520668944233146!3d59.369957206767886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465cb19d87d4c3c7%3A0x300ad4aa5764fa28!2sLambergskajen%2C%20652%2021%20Karlstad!5e0!3m2!1ssv!2sse!4v1665738091678!5m2!1ssv!2sse"
          loading="lazy"
        ></iframe>

      </section>
      </section>
    </main>
  );
};

export default LandingView;
