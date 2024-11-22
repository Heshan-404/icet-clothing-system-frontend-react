import "./AlertComponent.css";

function AlertComponent(props: { msg: string }) {
  return (
    <div className="alert-container z-3 position-fixed bottom-0 end-0 mb-5 me-5 rounded-3">
      {props.msg}
    </div>
  );
}

export default AlertComponent;
