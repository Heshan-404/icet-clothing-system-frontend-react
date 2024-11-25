import { useEffect, useState } from "react";
import "./CartItemRow.css";
import axiosClient from "../../../../axiosConfig";

function CartItemRow(props: { item: CartItem | undefined }) {
  const [imageData, setImageData] = useState<string | null>(null);
  const [isItemVisible, setIdItemVisible] = useState(true);
  const [sizeName, setSizeName] = useState("");

  useEffect(() => {
    if (props.item) {
      fetchImage(props.item);
      switch (props.item.sizeId) {
        case 0:
          setSizeName("XS");
          break;
        case 1:
          setSizeName("S");
          break;
        case 2:
          setSizeName("M");
          break;
        case 3:
          setSizeName("L");
          break;
        case 4:
          setSizeName("XL");
          break;
        case 5:
          setSizeName("XXL");
          break;
        default:
          setSizeName("Unknown Size");
          break;
      }
    }
  }, [props.item]);

  async function fetchImage(item: CartItem) {
    try {
      if (item.imageId) {
        const response = await axiosClient.get(
          `/product/image/${item.imageId}`
        );
        setImageData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }

  function deleteItem() {
    const itemList: CartItem[] = JSON.parse(
      localStorage.getItem("cartItemList") || "[]"
    );
    const updatedList = itemList.filter(
      (cartItem) =>
        cartItem.productId !== props.item?.productId ||
        cartItem.sizeId !== props.item?.sizeId
    );

    localStorage.setItem("cartItemList", JSON.stringify(updatedList));
    setIdItemVisible(false);

    if (updatedList.length === 0) {
      window.location.reload();
    }
  }

  return (
    <div className="w-100">
      {isItemVisible && (
        <div className="cart-item-row-container ">
          <div className="d-flex justify-content-between align-items-center ">
            <div className="cart-item-row-item-img-container p-0 m-0 rounded-4">
              {imageData && (
                <div
                  className="cart-item-row-item-img"
                  style={{
                    backgroundImage: `url(data:image/png;base64,${imageData})`,
                  }}
                ></div>
              )}
              {!imageData && (
                <div className="cart-item-row-item-img d-flex justify-content-center align-items-center ">
                  <div
                    className="spinner-border "
                    style={{ width: "18px", height: "18px" }}
                    role="status"
                  ></div>
                </div>
              )}
            </div>
            <div className="cart-item-row-item-data d-flex flex-column ms-3 me-2">
              <div className="cart-item-row-item-data-name ">
                {props.item?.productName}
              </div>
              <div className="cart-item-row-item-data-price  ">
                LKR : {props.item?.price}.00 x{" "}
                <span className="text-success"> {props.item?.qty}</span>
              </div>
              <div className="cart-item-row-item-data-price  ">
                Size : {sizeName}
              </div>
            </div>
            <div className="cart-item-row-item-qty-container d-flex align-items-start ">
              <button
                className="material-symbols-outlined item-delete-btn rounded-5 "
                onClick={deleteItem}
              >
                delete
              </button>
            </div>
          </div>
          <center>
            <hr style={{ opacity: "20%" }} />
          </center>
        </div>
      )}
    </div>
  );
}

class CartItem {
  productId: number;
  sizeId: number;
  qty: number;
  imageId: number;
  productName: string;
  price: number;
  constructor(item: CartItem, qty: number, image: number, price: number) {
    this.productId = item.productId;
    this.qty = qty;
    this.productName = item.productName;
    this.imageId = image;
    this.price = price;
    this.sizeId = 0;
  }
}
export default CartItemRow;
