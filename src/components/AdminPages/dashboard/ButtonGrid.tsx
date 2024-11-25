import AdminNavBar from "../AdminNavbar/AdminNavBar";
import "./ButtonGrid.css";

function ButtonGrid() {
  return (
    <div>
      <AdminNavBar />
      <div className="d-flex flex-column dashboard-container">
        <div className="d-flex w-100 flex-wrap justify-content-evenly">
          <div className=" m-3 ">
            <button
              onClick={() => {
                window.location.href = "/store";
              }}
              className="dashboard-button p-2"
            >
              Manage Products
            </button>
          </div>

          <div className=" m-3 ">
            <button
              className="dashboard-button p-2"
              onClick={() => {
                window.location.href = "/admin/dashboard/admin";
              }}
            >
              Manage Admins
            </button>
          </div>
          <div className=" m-3 ">
            <button
              className="dashboard-button p-2"
              onClick={() => {
                window.location.href = "/admin/dashboard/order";
              }}
            >
              Manage Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonGrid;
