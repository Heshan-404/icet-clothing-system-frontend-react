function DelayContainer() {
  return (
    <div>
      <div className="position-fixed w-100 h-100 bg-white">
        <div className="loader-style w-100 h-100 d-flex justify-content-center align-items-center position-absolute pb-5">
          <div
            className="spinner-grow"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="sr-only"> </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DelayContainer;
