import "./AlertComponent.css";

function AlertComponent(props: { msg: string }) {
  return (
    <div className="alert-container position-fixed bottom-0 end-0 mb-5 me-5 rounded-3">
      <div
        className="alert alert-primary alert-dismissible fade show"
        role="alert"
      >
        <strong>{props.msg}</strong>
      </div>
    </div>
  );
}

export default AlertComponent;
