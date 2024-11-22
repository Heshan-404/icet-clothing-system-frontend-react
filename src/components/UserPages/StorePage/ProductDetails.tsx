import { useEffect, useState } from "react";
import "./ProductDetails.css";
import axiosClient from "../../../../axiosConfig";
import AlertComponent from "../alerts/AlertComponent";

function ProductDetailsPage(props: { item: Item }) {
  const [mainImage, setMainImage] = useState(null);
  const [qtyCount, setQtyCount] = useState(0);
  const [imageDataArray, setImageDataArray] = useState<String[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isInvalidQty, setIsInvalidQty] = useState(false);
  const [selectedSize, setSelectedSize] = useState<HTMLDivElement | null>(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(-1);
  const [cartList, setCartList] = useState<CartItem[]>([]); 
  const [selectedSizeString, setSelectedSizeString] = useState<string | null>(
    null
  );

  fetchMainImage();

  useEffect(() => {
    checkItemAlreadyInCart();
    setCartList(JSON.parse(localStorage.getItem("cartItemList") || "[]"));
    window.scrollTo(0, 0);
  }, [props.item]);

  async function checkItemAlreadyInCart() {
    cartList.forEach((cartItem) => {
      if (cartItem.productId == props.item.productId) {
        props.item.stockQty[cartItem.sizeId] -= cartItem.qty;
      }
    });
  }

  async function fetchMainImage() {
    if (mainImage == null) {
      if (props.item.imageIds[0]) {
        await axiosClient
          .get("/product/image/".concat(props.item.imageIds[0] + ""))
          .then((response) => {
            setMainImage(response.data.data);
          });
      }
    }
    if (mainImage) {
      const mainImageElement = document.getElementById("item-main-img");
      if (mainImageElement) {
        mainImageElement.style.backgroundImage = `url(data:image/png;base64,${mainImage})`;
      }
    }
  }

  const changeSelectedSize = (
    e: React.MouseEvent<HTMLDivElement>,
    size: string
  ) => {
    setQtyCount(0);
    if (selectedSize) {
      selectedSize.className = "item-size-btn"; 
    }
    e.currentTarget.className = "selected-size-btn";
    setSelectedSize(e.currentTarget as HTMLDivElement);
    setSelectedSizeString(size); 
  };

  useEffect(() => {
    if (selectedSizeString) {
      setSelectedSizeIndex(sizes.indexOf(selectedSizeString));
    }
  }, [selectedSizeString]);

  useEffect(() => {
    if (mainImage) {
      if (props.item.imageIds) {
        for (let i = 1; i < props.item.imageIds.length; i++) {
          axiosClient
            .get("/product/image/".concat(props.item.imageIds[i] + ""))
            .then((response) => {
              setImageDataArray((prev) => [...prev, response.data.data]);
            });
        }
      }
    }
  }, [mainImage]);

  function moveImageUp() {
    if (imageDataArray.length > imageIndex + 2) {
      setImageIndex((prevIndex) => prevIndex + 1);
    }
  }

  function moveImageDown() {
    if (imageIndex > 0) {
      setImageIndex((prevIndex) => prevIndex - 1);
    }
  }

  function addToCart() {
    if (qtyCount > 0) {
      if (selectedSize) {
        let itemsList: CartItem[] = JSON.parse(
          localStorage.getItem("cartItemList") || "[]"
        );
        let isAlreadyAdded = false;
        const newItem = new CartItem(
          props.item,
          selectedSizeString || "",
          qtyCount,
          props.item.imageIds[0],
          props.item.price
        );
        itemsList.forEach((item) => {
          if (
            item.productId === newItem.productId &&
            item.sizeId === newItem.sizeId
          ) {
            item.qty += newItem.qty;
            isAlreadyAdded = true;
          }
        });
        if (!isAlreadyAdded) {
          itemsList.push(newItem);
        }

        localStorage.setItem("cartItemList", JSON.stringify(itemsList));
        setIsAdded(true);
        setTimeout(() => {
          setIsAdded(false);
          window.location.reload();
        }, 2000);
      } else {
        showAlertInvalid();
      }
    } else {
      showAlertInvalidQTY();
    }
  }

  function showAlertInvalid() {
    setIsInvalid(true);
    setTimeout(() => setIsInvalid(false), 2000);
  }

  function showAlertInvalidQTY() {
    setIsInvalidQty(true);
    setTimeout(() => setIsInvalidQty(false), 2000);
  }

  function qtyIncrease() {
    if (selectedSize) {
      if (props.item.stockQty[selectedSizeIndex] > qtyCount) {
        setQtyCount(qtyCount + 1);
      } else {
        console.log("Max count reached");
      }
    } else {
      showAlertInvalid();
    }
  }

  function qtyDecrease() {
    if (selectedSize && qtyCount > 1) {
      setQtyCount(qtyCount - 1);
    } else {
      console.log("Min count reached");
    }
  }

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div>
      {isInvalid && <AlertComponent msg="Please select size" />}
      {isAdded && <AlertComponent msg="Item added to cart" />}
      {isInvalidQty && <AlertComponent msg="Invalid Quantity" />}
      <div className="ps-4 ps-md-5 ps-sm-4 ps-lg-5 product-details-container ps-2 pe-2 pt-4 ps-sm-2 pe-sm-2 ps-md-5 pe-md-5 d-flex flex-rows gap-3 gap-md-5 gap-lg-5 gap-sm-3 flex-wrap justify-content-start">
        <div className="main-img-container pt-4">
          <div className="item-main-img" id="item-main-img"></div>
          <div className="colthify text-black jaini-purva-regular p-0 m-0 z-0">
            Colothify
          </div>
        </div>
        <div className="d-flex flex-column small-images-conatiner gap-3">
          <div
            className="text-center moving-arrow fw-bold border-0  text-center"
            onClick={moveImageDown}
          >
            <button className="material-symbols-outlined text-black arrow-btn arrow-btn-up">
              arrow_drop_up
            </button>
          </div>
          <div
            style={{
              backgroundImage: `url(data:image/png;base64,${imageDataArray[imageIndex]})`,
            }}
            id="item-small-img-1"
            className="small-img-container"
          ></div>
          <div
            style={{
              backgroundImage: `url(data:image/png;base64,${
                imageDataArray[imageIndex + 1]
              })`,
            }}
            id="item-small-img-2"
            className="small-img-container"
          ></div>
          <div
            className="text-center moving-arrow fw-bold border-0  text-center"
            onClick={moveImageUp}
          >
            <button className="material-symbols-outlined text-black arrow-btn arrow-btn-down">
              arrow_drop_down
            </button>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="mt-md-5 mt-lg-5 mt-sm-0 mingzat-regular fw-bolder  item-name">
            {props.item.productName.toUpperCase()}
          </div>
          <div className="mingzat-regular item-desc">
            {props.item.description}
          </div>
          <div className="mingzat-regular  mt-4">
            <div className="item-stock">Available </div>

            <span>
              <table className=" stock-table text-start">
                <thead>
                  <tr>
                    {sizes.map((size) => (
                      <th key={size}>{size}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {sizes.map((size, index) => (
                      <td key={index}>{props.item?.stockQty?.[index] ?? 0}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </span>
          </div>
          <div className="mt-1 mingzat-regular fw-bold item-price">
            {`LKR : ${props.item.price}.00`}
          </div>
          <div className="mingzat-regular mt-3 fw-medium">Select Size</div>
          <div className="d-flex flex-rows gap-3 mt-2">
            {sizes.map((size, index) => (
              <div
                key={index}
                className="item-size-btn"
                onClick={(e) => changeSelectedSize(e, size)}
              >
                {size}
              </div>
            ))}
          </div>
          <div className="d-flex flex-rows qty-input-container mt-3">
            <div className="mingzat-regular fw-medium me-3">QTY :</div>

            <div className="qty-input-field-container d-flex flex-rows">
              <button
                className="me-2 qty-btn"
                onClick={() => {
                  qtyDecrease();
                }}
              >
                -
              </button>
              <input
                className="qty-input-field ps-1 rounded-1 text-center"
                disabled
                value={qtyCount}
              ></input>
              <button
                className="ms-2 qty-btn"
                onClick={() => {
                  qtyIncrease();
                }}
              >
                +
              </button>
            </div>
          </div>
          <div
            onClick={addToCart}
            id="btn-add-to-cart"
            className="add-to-cart-btn p-2 mt-3 mt-sm-3 mt-md-5 mt-lg-5 text-center rounded-2 mingzat-regular fw-bolder"
          >
            Add To Cart
          </div>
        </div>
      </div>
    </div>
  );
}

interface Item {
  description: string;
  categoryDescription: string;
  stockQty: number[];
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
        this.sizeId = 1;
        break;

      case "M":
        this.sizeId = 2;
        break;

      case "L":
        this.sizeId = 3;
        break;

      case "XL":
        this.sizeId = 4;
        break;

      case "XXL":
        this.sizeId = 5;
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
export default ProductDetailsPage;
