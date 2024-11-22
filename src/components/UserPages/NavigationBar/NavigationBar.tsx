import "./NavigationBar.css";

function NavigationBar() {
  return (
   <div className="mb-5 nv-bar-container">
     <div className="w-100 position-fixed top-0 z-3 nav-bar-container">
      <div className="d-flex align-items-center nav-bar-middle-line-container ms-3 me-3">
        <div className="col-4 ">
          <div className="nav-bar-home-btn text-white fs-4 d-none d-sm-block">
            HOME
          </div>
        </div>
        <div className="col-4  d-flex flex-row justify-content-center gap-2">
          <div
            className="text-center nav-bar-middle-btn fs-4  p-1 ps-3 pe-3 rounded-5"
            onClick={() => {
              window.location.href = "/category/women";
            }}
          >
            WOMEN
          </div>
          <div
            className="text-center nav-bar-middle-btn fs-4  p-1 ps-3 pe-3 rounded-5"
            onClick={() => {
              window.location.href = "/category/men";
            }}
          >
            MEN
          </div>
          <div
            className="text-center nav-bar-middle-btn   fs-5  p-1 ps-3 pe-3 rounded-5"
            onClick={() => {
              window.location.href = "/category/kids";
            }}
          >
            KIDS
          </div>
        </div>
        <div className="col-4  text-end">
          <div className="nav-bar-home-btn text-white fs-4 d-none d-sm-block">
            <div className="  ">Cloothify</div>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
}

export default NavigationBar;
