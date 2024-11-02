import redImage from "../../assets/maleRedShirtModal.png";
import greenImage from "../../assets/maleGreenShirtModal.png";
import "./FirstHeroSection.css";
function FirstHeroSection() {
  return (
    <div className="container mt-5 w-100">
      <div className="row w-100">
        <div className="col-4 ">
          <img src={redImage} alt="red" className="first-hero-img-one " />
        </div>
        <div className="col-4 pt-4">
          <div className="row">
            <h1 className="text-center hero-first-text">MEN's</h1>
          </div>
          <div className="row  hero-second-text-container">
            <h1 className="hero-second-text">SLIM FIT SHIRTS</h1>
          </div>
        </div>
        <div className="col-4 ">
          <img src={redImage} alt="red" className="first-hero-img-two" />
        </div>
      </div>
    </div>
  );
}

export default FirstHeroSection;
