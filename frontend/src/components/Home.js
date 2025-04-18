import React from "react";
  
  // ✅ Home page component inside App
  const Home = () =>
    {
        return (
    <div className="master-layout">
      <div className="quote-container">
        <div className="quote-box">
          <p className="quote">“At my lowest point, I was blessed to have found Maple Grove Apartments
            for my family. The best home at the best prices for people like us!”</p>
          <p className="customer">- Satisfied customer #1</p>
        </div>
        <div className="quote-box">
          <p className="quote">“I guess good landlords do exist! I’d recommend Maple Grove Apartments
            to anyone!”</p>
          <p className="customer">- Satisfied customer #2</p>
        </div>
        <div className="quote-box">
          <p className="quote">“My friends were SOOO jealous to hear I got a room at MG Apartments!”</p>
          <p className="customer">- Satisfied customer #3</p>
        </div>
      </div>

      <div className="welcome-container">
        <div className="welcome-card">
          <p className="welcome-message">
            At MG Apartments, we strive to provide the best, most affordable,
            and seamless experience for renters looking for their next home.
            Whether a family of five or single, we have the right room for you!
            Feel free to browse our expansive list of available rooms, or contact us with any questions!
          </p>
        </div>
      </div>

      <div className="quote-container">
        <div className="quote-box">
          <p className="quote">“Prompt responses, great customer service, and a real dedication to their
            tenants. Honestly wish I didn’t have to leave.”</p>
          <p className="customer">- Satisfied customer #4</p>
        </div>
        <div className="quote-box">
          <p className="quote">“Very happy with my choice of apartment. Always felt like home, with the
            friendliest neighbors!”</p>
          <p className="customer">- Satisfied customer #5</p>
        </div>
        <div className="quote-box">
          <p className="quote">“Always felt like I was taken care of. Every concern was promptly
            responded to, and always followed up with.”</p>
          <p className="customer">- Satisfied customer #6</p>
        </div>
      </div>
    </div>
        );
};

  export default Home;