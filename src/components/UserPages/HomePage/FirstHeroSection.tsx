import redImage from "../../../assets/maleRedShirtModal.png";
import "./FirstHeroSection.css";

function FirstHeroSection() {
  return (
    <>
      <div className=" mt-5 pt-2 w-100 ">
        <div className="container-hero-section w-100">
          <div className="row">
            <div className="col">
              <img
                src={redImage}
                alt=""
                className="position-relative hero-img-1 z-1 fade-right"
              />
            </div>
            <div className="col  d-flex flex-column align-items-center hero-tittle-container justify-content-center z-0 ">
              <div className="row hero-first-row">
                <div className="hero-fisrt-text just-another-hand-regular fade-down">
                  MEN'S
                </div>
              </div>
              <div className="row hero-second-row ">
                <div className="hero-second-text mingzat-regular fw-bolder fade-up">
                  SLIM FIT
                </div>
                <div className="hero-second-text mingzat-regular fw-bolder fade-up-slow">
                  SHIRTS
                </div>
              </div>
            </div>
            <div className="col d-none d-sm-block pe-5 z-2 d-flex text-end">
              <img
                src={redImage}
                alt=""
                className="position-relative hero-img-1 z-1 d-none d-sm-block fade-left"
   
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstHeroSection;
