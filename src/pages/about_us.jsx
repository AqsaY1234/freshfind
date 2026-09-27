import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">About Us</li>
        </ol>
      </nav>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5" data-aos="fade-up">
            <h1 className="display-4 fw-bold mb-3">About FreshFind</h1>
            <p className="lead text-muted">
              Connecting communities with local growers for a fresher, healthier future.
            </p>
          </div>

          <div className="card card-custom p-4 p-md-5 mb-5 border-0 bg-white" data-aos="fade-up">
            <h3 className="mb-4">Our Mission</h3>
            <p className="fs-5">
              FreshFind was born out of a simple idea: making it easier for people to find and enjoy fresh, locally grown food. We believe that buying local is better for your health, better for the environment, and essential for supporting our local economy.
            </p>
            <p className="fs-5 mb-0">
              Our platform serves as a digital bridge between hardworking local farmers and residents who want to know where their food comes from.
            </p>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-4" data-aos="fade-up">
              <div className="feature-chip text-center">

                <h5>Discover Local</h5>
                <p className="text-muted small mb-0">Find markets right in your neighborhood with ease.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="80">
              <div className="feature-chip text-center">

                <h5>Plan Ahead</h5>
                <p className="text-muted small mb-0">Check operating hours and seasonal availability before you go.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="160">
              <div className="feature-chip text-center">

                <h5>Support Community</h5>
                <p className="text-muted small mb-0">Help local farmers thrive by buying directly from them.</p>
              </div>
            </div>
          </div>

          <div className="bg-light p-4 rounded text-center" data-aos="fade-up">
            <h4>Join the Movement</h4>
            <p className="mb-4">Ready to start discovering fresh, local produce?</p>
            <Link to="/markets" className="btn btn-custom btn-lg">Find a Market Today</Link>
          </div>

          <h3 className="text-center mt-5 mb-4">The Team</h3>
          <div className="row g-4">
            <div className="col-md-4" data-aos="fade-up">
              <div className="feature-chip text-center">
                <h5>Ayesha Khan</h5>
                <p className="text-muted small mb-0">Project lead. Connects growers with neighbourhoods.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="80">
              <div className="feature-chip text-center">
                <h5>Omar Sheikh</h5>
                <p className="text-muted small mb-0">Market research and seasonal produce updates.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="160">
              <div className="feature-chip text-center">
                <h5>Sara Ali</h5>
                <p className="text-muted small mb-0">Community outreach and resident support.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
