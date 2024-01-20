
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import econsensusLogo from './Econsensus.png'; // Adjust the path
import "./App.css"

const About = () => {
  return (
    <>
      <h1>Econsensus</h1>
      {/* Your content for the About page */}
      <section>
  <h2>Revolutionizing Businesses at Econsensus</h2>

  <p>
    At Econsensus, we pride ourselves on being revolutionary. We employ proven methodologies while seamlessly integrating them with the future, ensuring that businesses stay at the forefront of new technology. Our approach is a harmonious blend of time-tested practices and cutting-edge innovation that consistently delivers results.
  </p>

  <p>
    Our Econometrics division is spearheaded by seasoned economists with expertise in model formulation and empirical studies. We leverage these studies, aligning them with current trends, to gain a profound understanding of businesses and their related environments. This strategic insight empowers our clients to make optimal choices every time.
  </p>

  <p>
    Embracing blockchain technology is at the core of our mission. We firmly believe that blockchain is a transformative tool for businesses, offering solutions to reduce transaction costs, verification costs, and fostering trust within communities. Econsensus is dedicated to unlocking the full potential of blockchain, turning it into a competitive advantage for our clients across various scenarios.
  </p>

  <p>
    The blockchain holds numerous underutilized use cases, and Econsensus is your guide to exploit all the synergies it offers for your business. This strategic utilization of blockchain becomes a distinctive advantage in most business scenarios, positioning you ahead of the curve.
  </p>

  <p>
    Complementing our services is a robust digital marketing team that excels in SEO, content marketing, SMM, and mobile development. We assist businesses in expanding their reach, boosting sales, and efficiently engaging with both existing customers and potential clients.
  </p>
</section>

    </>
  );
};

const Service = () => {
  return <> <h1>
    this is the what we can do
    </h1>
  <section>
  Elevate Decision-Making with Econometric Analysis: Harness the power of
  econometric models, including regression, multivariate regression,
  cross-section, and time series analysis, to address critical business
  queries and forecast potential risks. Our adept team also tailors micro
  and macro reports, providing data-driven insights customized for
  effective management decision-making.
</section>
<br />
<section>
  Blockchain Solutions Tailored for Your Business: Explore the potential
  of blockchain with our feasibility and use case studies, identifying
  specific applications for your business. Following the study, our
  experts can develop custom DAOs, DApps, tokens, or NFTs, enabling your
  business to leverage the transformative capabilities of smart contracts
  and blockchain technology.
</section>
<br />
<section>
  Holistic Business Development Services: Propel your business forward
  with our comprehensive web development, SEO, social media management
  (SMM), and content marketing solutions. From building a strong online
  presence to executing successful marketing campaigns, our business
  development offerings are designed to enhance your brand visibility and
  drive growth.
</section>
  </>;
};

const Help = () => {
  const [formData,setFormData] = useState({
    name:"",
    phone:"",
    email:"",
    industry:"",
    bproblem:""
  });

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/help",{
        method:"POST",
        headers:{"Content-type":"Application/json"},
        body:JSON.stringify(formData)
      })
        if (response.ok) {
      // Handle success, e.g., show a success message or redirect
      console.log('Form submitted successfully');
      alert("we will get back with you shortly")
    } else {
      // Handle errors, e.g., show an error message
      console.error('Form submission failed');
    }
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    setFormData({
      name:"",
    phone:"",
    email:"",
    industry:"",
    bproblem:""
    })
    
    
  };

  return <>
  <h1>
      Econsensus helps by ...
    </h1>
  <div className="help-container">

  
  
    <section>
  <h2>Unlocking Growth and Innovation with Econsensus Services</h2>
 
  <p>
    In the rapidly evolving landscape of modern business, partnering with Econsensus can provide your company with a competitive edge and unlock various growth opportunities. Our tailored services at the intersection of blockchain and econometrics offer unique advantages:
  </p>

  <h3>Elevated Decision-Making through Data-Driven Insights</h3>
  <p>
    Harness the power of advanced econometric models, including regression, multivariate regression, cross-section, and time series analysis. Our adept team tailors micro and macro reports, providing your management with data-driven insights for informed decision-making.
  </p>

  <h3>Blockchain Solutions Tailored for Your Business</h3>
  <p>
    Explore the potential of blockchain with our feasibility and use case studies. Identify specific applications for your business, and let our experts develop custom DAOs, DApps, tokens, or NFTs. Leverage the transformative capabilities of smart contracts and blockchain technology to enhance operational efficiency and security.
  </p>

  <h3>Holistic Business Development Services</h3>
  <p>
    Propel your business forward with our comprehensive web development, SEO, social media management (SMM), and content marketing solutions. From building a strong online presence to executing successful marketing campaigns, our business development offerings are designed to enhance your brand visibility and drive growth.
  </p>

  <p>
    At Econsensus, we pride ourselves on bridging the gap between traditional business practices and cutting-edge technologies. Our services are designed to empower your company, fostering innovation, efficiency, and sustained success in today's dynamic market.
  </p>
</section>

    
       <form action="http://localhost:5000:/help" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="industry">Industry:</label>
          <input
            type="text"
            name="industry"
            id="industry"
            value={formData.industry}
            onChange={handleInputChange}
            placeholder="Industry"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bproblem">Business Problem:</label>
          <textarea
            type="text"
            name="bproblem"
            id="bproblem"
            value={formData.bproblem}
            onChange={handleInputChange}
            placeholder="Business Problem"
            rows={4}
          />
        </div>
        <button type="submit" id="btn">
          Submit
        </button>
      </form>
      </div>
    </>

};

const Contacts = () => {
  return <><ul>
        <li>twitter</li>
        <li>linkedin</li>
        <li>Tiktok</li>
    </ul></>;
};

const Home = () => {
  return (
    <>
      <h1>Econsensus</h1>
      <p>
        Welcome to Econsensus, your boutique consultancy bridging blockchain and
        econometrics. Our unique approach combines these realms to deliver
        tailored solutions. Specializing in Econometric services,
        blockchain-enhanced business processes, DApp development, and
        comprehensive content marketing, Econsensus is where innovation meets
        expertise.
      </p>
    </>
  );
};

const Nav = () => {
  return (
    <nav>
      <img   src={econsensusLogo} alt="smasg" className="logo"/>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About us</Link>
        </li>
        <li>
          <Link to="/services">What we do</Link>
        </li>
        <li>
          <Link to="/help">How we can help</Link>
        </li>
        <li>
          <Link to="/contacts">Contacts</Link>
        </li>
      </ul>
    </nav>
  );
};

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;