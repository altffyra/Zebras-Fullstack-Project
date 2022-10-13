import React from 'react';
import '../styles/_landing.scss';


type Props = {}

const LandingView = (props: Props) => {
  return (
    <main className='landing'>
      <section className='hero'>
        <button>FOOD</button>
      </section>

      <section className='about-us'>
        <h3>Om oss</h3>
        <p>Rocksalt grundades av Christian Johnsson år 2022 med idén om att personer ska kunna få god och vällagad restaurangmat utan besväret att behöva sitta på en restaurang.</p>
      </section>
      <img className='about-us-img' src="" alt="" />

      <img className='our-food-img' src="" alt="" />
      <section className='our-food'>
        <h3>Vår mat</h3>
        <p>Alla råvaror vi använder oss utav är lokalproducerade. Vi har dagliga kontroller för att hålla vår mat till högsta standarden.</p>
      </section>

      <section className='our-goal'>
        <h3>Vårt mål</h3>
        <p>Vår grundare Christian Johnsson har som målet att alla i hela världen ska få äta bra mat, även om man inte kan ta sig till en restaurang.</p>
      </section>
      <img className='our-goal-img' src="" alt="" />

    </main>
  )
}

export default LandingView