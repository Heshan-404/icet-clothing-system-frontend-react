import "./Footer.css";
function FooterComponent() {
  return (
    <div>
      <div className="footer-container start-0 bottom-0 w-100 bg-black">
        <div className="row">
          <div className="text-white jaini-purva-regular fs-3">Cloothify</div>
        </div>
        <div className="row mt-3 text-white">
          <div className="col">
            <h4>SHOP</h4>
            <div>WOMEN</div>
            <div>MEN</div>
            <div>KIDS</div>
          </div>
          <div className="col">
            <h4>COMPANY</h4>
            <div>About Us</div>
            <div>Contact Us</div>
            <div>Our Branches</div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-xl-6 col-xxl-6 mt-sm-3 mt-4 mt-md-0 mt-xl-0 mt-xxl-0 text-start text-sm-start text-md-end text-xl-end text-xxl-end">
            <h4>SUBSCRIBE</h4>
            <div>Email</div>
            <div>
              <input
                type="text"
                placeholder="Enter your email"
                className="email-input-box"
              />
            </div>
            <div className="mt-1">
              <div className="subscribe-btn-container d-flex justify-content-start justify-content-sm-start justify-content-md-end">
                <div className="border-white ">
                  <div className="subscribe-btn rounded text-center p-1 ps-2 pe-2">
                    Subsribe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
