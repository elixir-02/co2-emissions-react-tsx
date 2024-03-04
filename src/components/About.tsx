import React from 'react';
import Footer from './Footer';
import co2 from '../co2.svg'

const About: React.FC = () => {
  return (
    <>
    
    <div>
      <h2>CO2 Emissions Worldwide</h2>
      <p>
        CO2 emissions are a significant concern globally, contributing to climate change and environmental degradation.
        Worldwide efforts are underway to monitor and reduce carbon dioxide emissions, with a focus on sustainable
        practices and alternative energy sources.
      </p>
      <p>
        This About page provides information about the DataTable and Chart components, showcasing data related to
        vulnerability and offering insights into the impact of CO2 emissions on the environment.
      </p>
      <img src={co2} alt={co2}/>
    </div>
    <div style={{marginTop:'8.8rem'}}>

    <Footer />
    </div>

    </>
  );
};

export default About;
