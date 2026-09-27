import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const AboutUs = () => {
  return (
    <div>
      <PageBanner
        title="About FreshFind"
        subtitle="Built in Karachi, for people tired of guessing which market is open today."
        image="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80"
      />
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
            <p className="lead text-muted">
              Built in Karachi, for people tired of guessing which market is open today.
            </p>
          </div>

          <div className="card card-custom p-4 p-md-5 mb-5 border-0 bg-white" data-aos="fade-up">
            <h3 className="mb-4">Why FreshFind Exists</h3>
            <p className="fs-5">
              This started with a familiar problem: driving to a favorite market in Saddar or Clifton only to find it closed, or not knowing that strawberries were finally in season until a neighbor mentioned it. Market timings, produce seasons and locations were scattered across word of mouth and outdated flyers &mdash; nowhere written down in one place.
            </p>
            <p className="fs-5 mb-0">
              FreshFind puts that information in one searchable directory: which markets are open right now, what days they run, and what's actually fresh this week &mdash; so a trip across town isn't a gamble.
            </p>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-4" data-aos="fade-up">
              <div className="feature-chip text-center">

                <h5>Know Before You Go</h5>
                <p className="text-muted small mb-0">Real open/closed status based on each market's actual weekly hours, not a guess.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="80">
              <div className="feature-chip text-center">

                <h5>What's In Season</h5>
                <p className="text-muted small mb-0">See which produce is worth the trip this week before you leave the house.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="160">
              <div className="feature-chip text-center">

                <h5>Your Own Shortlist</h5>
                <p className="text-muted small mb-0">Bookmark the stalls and produce you keep coming back to.</p>
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
    </div>
  );
};

export default AboutUs;
