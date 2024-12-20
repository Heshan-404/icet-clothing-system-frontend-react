import "./OrderSuccessPage.css";
import succesGif from "../../../assets/success.gif";
function OrderSuccessAlert() {
  setTimeout(() => history.back(),2600);
  return (
    <div className="order-success-container">
      <div className="text-center">
        <img src={succesGif} alt="" className="img-styles mt-5" />
      </div>
      <div className="success-text fs-1 text-center">Success</div>
    </div>
  );
}

export default OrderSuccessAlert;
