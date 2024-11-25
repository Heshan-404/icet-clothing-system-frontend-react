import { useParams } from "react-router-dom";
import axiosClient from "../../../../../axiosConfig";
import { useEffect, useState } from "react";
import { Item } from "react-bootstrap/lib/Breadcrumb";

function ViewOrderPage() {
  const { orderID } = useParams();
  const [order, setOrder] = useState<OrderDetails>();
  const [productList, setProductList] = useState<Array<Item>>([]);
   const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function showAlertMsg(msg: string) {
    setAlertMsg(msg);
    setShowAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  useEffect(() => {
    fetchOrderDetailsByID();
  }, []);
  

  function fetchOrderProducts() {
    if (order) {
      order.orderItems.forEach((item) => {
        fetchProductDetails(
          item.product.id,
          item.product.qty,
          item.price,
          item.product.sizeId
        );
      });
    }
  }

  async function fetchProductDetails(
    id: string,
    qty: number,
    price: number,
    sizeId: number
  ) {
    const productExists = productList.some(
      (product) => product.productId+"" === id
    );
    if (!productExists) {
      await axiosClient
        .get("/product/".concat(id))
        .then((res) => {
          let product: Item = res.data;
          product.price = price;
          product.qty = qty;
          product.sizeId = sizeId;
          setProductList((prevProductList) => [...prevProductList, product]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  useEffect(() => {
    fetchOrderProducts();
  }, [order]);

  async function fetchOrderDetailsByID() {
    await axiosClient
      .get("/order/".concat(orderID + ""))
      .then((res) => {
        setOrder(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

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

  return (
    <div>
      {order && (
        <div className="container mt-5">
          <div>
            <div className=" d-flex">
              <div className="mb-3" style={{ width: "80px" }}>
                Order ID :
              </div>
              <div className="ms-5"> {order.id}</div>
            </div>
            <div className=" d-flex">
              <div className="mb-3" style={{ width: "80px" }}>
                Email :
              </div>
              <div className="ms-5"> {order.userEmail}</div>
            </div>
            <div className=" d-flex">
              <div className="mb-3" style={{ width: "80px" }}>
                Status :
              </div>
              <div className="ms-5"> {order.status.toUpperCase()}</div>
            </div>
            <div className=" d-flex">
              <div className="mb-3" style={{ width: "80px" }}>
                Date :
              </div>
              <div className="ms-5">
                {order.createDate
                  ? new Date(order.createDate).toLocaleString("en-CA", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                  : "N/A"}
              </div>
            </div>
            <div className=" d-flex">
              <div className="mb-3" style={{ width: "80px" }}>
                Total Cost :
              </div>
              <div className="ms-5"> LKR : {order.totalCost}.00</div>
            </div>
            <div className=" d-flex">
              <div className="mb-3">Order Items</div>
            </div>
            {productList && (
              <div className=" d-flex flex-wrap justify-content-evenly ">
                {productList.map((item, index) => (
                  <div
                    key={index}
                    className="card p-3 m-2 shadow-sm"
                    id={`card-index-${index}`}
                    style={{ width: "220px", borderRadius: "10px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-center fw-bold text-primary">
                        {item.productName}
                      </h5>
                      <div className="mt-3">
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">ID:</span>
                          <span>{item.productId}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">Name:</span>
                          <span>{item.productName}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <span className="fw-bold">Category:</span>
                          <span>{item.categoryName}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <span className="fw-bold">Size:</span>
                          <span>
                            {(item.sizeId == 0 && "XS") ||
                              (item.sizeId == 1 && "S") ||
                              (item.sizeId == 2 && "M") ||
                              (item.sizeId == 3 && "L") ||
                              (item.sizeId == 4 && "XL") ||
                              (item.sizeId == 5 && "XXL") ||
                              (item.sizeId == 6 && "XS")}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <span className="fw-bold">QTY:</span>
                          <span>{item.qty}</span>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                          <button
                            className="btn btn-dark rounded-2"
                            onClick={() => {
                              const element = document.getElementById(
                                `card-index-${index}`
                              );
                              if (element) {
                                element.style.backgroundColor = "#C9E8C6";
                              }
                            }}
                          >
                            Added
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {order.status == "pending" && (
            <div className="d-flex justify-content-center mt-4">
              <div className="w-50 d-flex justify-content-center">
                <button
                  className="btn btn-success w-100 rounded-5"
                  onClick={() => {
                    changeStatusIntoComplete(order.id);
                  }}
                >
                  COMPLETE
                </button>
              </div>
            </div>
          )}
        </div>
      )}
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
  price: number;
  product: {
    id: string;
    qty: number;
    sizeId: number;
  };
}

interface Item {
  description: string;
  categoryDescription: string;
  qty: number;
  sizeId: number;
  price: number;
  discount: number;
  updateDate: Date;
  createDate: Date;
  categoryName: string;
  imageIds: Array<number>;
  productName: string;
  productId: number;
  categoryId: number;
}
export default ViewOrderPage;
