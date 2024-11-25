import { useEffect, useState } from "react";
import "./CartFloatButton.css";
import CartItemRow from "./CartItemRow";
import { Item } from "react-bootstrap/lib/Breadcrumb";
import axiosClient from "../../../../axiosConfig";

function CartFloatButton() {
  const [cartIsOpened, setCartIsOpened] = useState(false);
  const [isCartIconVisible, setIsCartIconVisible] = useState(false);
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [totalItemPrice, setTotalItemPrice] = useState(0);
  const [isOrderPlacing, setIsOrderPlacing] = useState(false);

  useEffect(() => {
    setTotalItemPrice(0);
    setCartList(JSON.parse(localStorage.getItem("cartItemList") || "[]"));

    if (cartList.length > 0) {
      setIsCartIconVisible(true);
    }
    const totalPrice = cartList.reduce((sum, item) => {
      return sum + item.price * item.qty;
    }, 0);
    setTotalItemPrice(totalPrice);
  }, [cartIsOpened, cartList.length]);

  function changeCartVisibility() {
    setCartIsOpened(!cartIsOpened);
  }

  function checkOutProcess() {
    if (cartList.length < 0) {
    } else {
      setIsOrderPlacing(true);
      const orderItems: OrderItem[] = [];
      cartList.forEach((item) => {
        const product: Product = new Product(item.productId);
        const orderItem: OrderItem = new OrderItem(
          item.sizeId,
          item.qty,
          item.price,
          product
        );
        orderItems.push(orderItem);
      });
      const cartResult: CartResult = new CartResult(totalItemPrice, orderItems);
      if (cartResult) {
        axiosClient
          .post("/order", cartResult, { withCredentials: true })
          .then((response) => {
            if (response.status === 200) {
              setIsOrderPlacing(false);
              localStorage.removeItem("cartItemList");
              window.location.href = "/order-success";
            }
          })
          .catch(() => {
            setIsOrderPlacing(false);
            location.href = "/user-login";
          });
      }
    }
  }
  return (
    <div>
      {isCartIconVisible && (
        <div
          className="cart-float-btn-container  position-fixed bottom-0 start-0 ms-3 mb-3"
          id="cart-float-btn-container"
          onClick={changeCartVisibility}
        >
          <span className="material-symbols-outlined">shopping_cart</span>
        </div>
      )}
      {cartIsOpened && (
        <div className="blur-bg z-3 cart-menu-super-container">
          <div className=" cart-menu-container ms-3 w-100 top-0 position-fixed z-3">
            <div className="cart-menu-sub-container p-3 rounded-4">
              <div
                className="d-flex justify-content-center align-items-center rounded-5 fw-bold cart-menu-close-btn position-absolute"
                onClick={changeCartVisibility}
              >
                X
              </div>
              <div className="cart-menu-header text-center fw-bold">
                My Cart
              </div>
              <div className=" text-center cart-item-count-header p-2 mt-3 rounded-4 fw-bold">
                You have {cartList.length} items in your cart
              </div>
              <div id="cart-items-container" className="cart-items-container">
                {cartList.map((item, index) => (
                  <div key={index} className="d-flex w-100 mt-4">
                    <CartItemRow item={item} />
                  </div>
                ))}
              </div>
              <div className="cart-checkout-container rounded-2 fw-medium">
                <div className="d-flex flex-column m-3">
                  <div className="d-flex justify-content-between pt-2 ">
                    <div className="items-total">Items :</div>
                    <div className="items-total">LKR : {totalItemPrice}.00</div>
                  </div>
                  <div className="d-flex justify-content-between  pb-1">
                    <div className="items-total">Discount :</div>
                    <div className="items-total"></div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between pt-1 pb-3">
                    <div className="items-total">Total :</div>
                    <div className="items-total">LKR : {totalItemPrice}.00</div>
                  </div>
                  <button
                    className="mb-3 p-2 bg-black text-white rounded-5"
                    onClick={checkOutProcess}
                  >
                    {!isOrderPlacing && <div>Checkout</div>}
                    {isOrderPlacing && (
                      <div>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface Item {
  description: string;
  categoryDescription: string;
  stock: number;
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

class CartItem {
  productId: number;
  sizeId: number;
  qty: number;
  imageId: number;
  productName: string;
  price: number;
  constructor(
    item: Item,
    size: string,
    qty: number,
    image: number,
    price: number
  ) {
    this.productId = item.productId;
    switch (size) {
      case "XS":
        this.sizeId = 0;
        break;

      case "S":
        this.sizeId = 0;
        break;

      case "M":
        this.sizeId = 0;
        break;

      case "L":
        this.sizeId = 0;
        break;

      case "XL":
        this.sizeId = 0;
        break;

      case "XXL":
        this.sizeId = 0;
        break;
      default:
        this.sizeId = 0;
        break;
    }
    this.qty = qty;
    this.productName = item.productName;
    this.imageId = image;
    this.price = price;
  }
}

class Product {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

class OrderItem {
  sizeId: number;
  qty: number;
  price: number;
  product: Product;
  constructor(sizeId: number, qty: number, price: number, product: Product) {
    this.sizeId = sizeId;
    this.qty = qty;
    this.product = product;
    this.price = price;
  }
}

class CartResult {
  totalCost: number;
  orderItems: OrderItem[];
  constructor(totalCost: number, orderItems: OrderItem[]) {
    this.totalCost = totalCost;
    this.orderItems = orderItems;
  }
}

export default CartFloatButton;
