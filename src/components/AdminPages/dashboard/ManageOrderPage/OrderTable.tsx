import { useEffect, useState } from "react";
import axiosClient from "../../../../../axiosConfig";
import "./OrderTable.css";
import AlertComponent from "../../../UserPages/alerts/AlertComponent";

function OrderTable() {
  const [orderList, setOrderList] = useState<OrderDetails[]>([]);
 
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    fetchOrderList();
  }, []);

  function showAlertMsg(msg: string) {
    setAlertMsg(msg);
    setShowAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  async function fetchOrderList() {
    await axiosClient.get("/order/all").then((res) => {
      setOrderList(res.data);
    });
  }

  const getRowClass = (status: string) => {
    switch (status) {
      case "PENDING":
        return "table-warning";
      case "COMPLETED":
        return "table-success";
      case "CANCELLED":
        return "table-danger";
      default:
        return "";
    }
  };

  async function changeStatusIntoComplete(id: string) {
    await axiosClient
      .post(
        "/order/complete/".concat(id),
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        showAlertMsg("Order Completed");
      });
  }
  async function changeStatusIntoCancel(id: string) {
    await axiosClient
      .post(
        "/order/cancel/".concat(id),
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        showAlertMsg("Order Canceled");
      });
  }

  return (
    <div>
      {showAlert && <AlertComponent msg={alertMsg} />}
      <div className="m-2">
        <div className="border table-responsive">
          <table className="table table-hover text-center">
            <thead>
              <tr className="table-dark">
                <th scope="col" className="ps-5 pe-5" style={{}}>
                  ID
                </th>
                <th
                  scope="col"
                  className="ps-5 pe-5"
                  style={{ width: "content-fit" }}
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="ps-5 pe-5"
                  style={{ width: "content-fit" }}
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="ps-5 pe-5"
                  style={{ width: "content-fit" }}
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="ps-5 pe-5"
                  style={{ width: "content-fit" }}
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="ps-5 pe-5"
                  style={{ width: "content-fit" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orderList &&
                orderList.map((order) => (
                  <tr className={getRowClass(order.status)} key={order.id}>
                    <td scope="row">{order.id}</td>
                    <td>{order.status.toUpperCase()}</td>
                    <td>
                      {new Date(order.createDate)
                        .toLocaleString("en-GB", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })
                        .replace(",", "")}
                    </td>
                    <td>{order.userEmail}</td>
                    <td>LKR: {order.totalCost}.00</td>
                    <td>
                      <div className="d-flex justify-content-between gap-3">
                        <button
                          className="btn btn-primary "
                          onClick={() => {
                            window.open("/admin/order/".concat(order.id + ""));
                          }}
                        >
                          VIEW
                        </button>
                        {order.status == "PENDING" && (
                          <div>
                            <button
                              className="btn btn-success"
                              onClick={() => {
                                changeStatusIntoComplete(order.id);
                              }}
                            >
                              COMPLETE
                            </button>
                          </div>
                        )}
                        {order.status == "PENDING" && (
                          <div>
                            <button
                              className="btn btn-warning"
                              onClick={() => {
                                changeStatusIntoCancel(order.id);
                              }}
                            >
                              CANCEL
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface OrderDetails {
  id: string;
  status: string;
  totalCost: number;
  userEmail: string;
  createDate: string;
  orderItems: Array<OrderDetailsItem>;
}

interface OrderDetailsItem {
  qty: number;
  price: number;
  product: {
    id: string;
  };
}

export default OrderTable;
