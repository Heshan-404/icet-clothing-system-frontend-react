import { useEffect, useRef, useState } from "react";
import "./ProductDetails.css";
import axiosClient from "../../../../axiosConfig";
import AlertComponent from "../alerts/AlertComponent";
import dropDownIcon from "../../../assets/arrow-down.png";

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
  const [role, setRole] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newDiscount, setNewDiscount] = useState(0);
  const [newStockQTY, setNewStockQTY] = useState<Array<number>>([
    0, 0, 0, 0, 0, 0,
  ]);
  const [maleCategoryList, setMaleCategoryList] = useState<Category[]>([]);
  const [kidsCategoryList, setKidsCategoryList] = useState<Category[]>([]);
  const [femaleCategoryList, setFemaleCategoryList] = useState<Category[]>([]);
  const refFilterCategoryItems = useRef<HTMLDivElement>(null);
  const refFilterCategoryDownArrowImg = useRef<HTMLImageElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [catId, setCatId] = useState(props.item.categoryId);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    setRole(getCookieByName("role"));
  }, [role]);

  function getCookieByName(name: string) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  useEffect(() => {
    const imgOneElement = document.getElementById("item-small-img-1");

    if (imgOneElement) {
      setHeight(imgOneElement.offsetWidth);
    }
  }, []);
  fetchMainImage();

  useEffect(() => {
    setNewName(props.item.productName);
    setNewDesc(props.item.description);
    setNewDiscount(props.item.discount);
    setNewPrice(props.item.price);
    setNewStockQTY(props.item.stockQty);
  }, [props.item]);

  useEffect(() => {
    setCartList(JSON.parse(localStorage.getItem("cartItemList") || "[]"));
    window.scrollTo(0, 0);
  }, [props.item]);

  useEffect(() => {
    checkItemAlreadyInCart();
  }, [cartList]);

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

  function deleteImageById(id: number) {
    if (id) {
      axiosClient
        .delete(`/product/image/${id}`, {
          withCredentials: true,
        })
        .then(() => {
          showAlertMsg("Image Deleted");
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
        });
    }
  }
  async function showAlertMsg(msg: string) {
    setAlertMsg(msg);
    setShowAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  async function deleteAllImages() {
    axiosClient
      .delete("/product/image/product/".concat(props.item.productId + ""), {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          showAlertMsg("Deleted");
        }
      });
  }
  async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const list = Array.from(e.target.files);
      list.forEach((file) => {
        const formData = new FormData();
        formData.append("image", file);
        axiosClient
          .post(`/product/image/product/${props.item.productId}`, formData, {
            withCredentials: true,
          })
          .then(() => {
            showAlertMsg("image uploaded");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }

  async function updateProduct() {
    let newProduct: updateItem = new updateItem(
      props.item.productId,
      newName,
      newDesc,
      newPrice,
      newDiscount,
      newStockQTY
    );
    await axiosClient
      .put(
        `/product/category/product/${props.item.productId}/category/${catId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          axiosClient
            .put("/product", newProduct, {
              withCredentials: true,
            })
            .then((res) => {
              if (res.status === 200) {
                showAlertMsg("updated");
              }
            })
            .catch((e) => {
              showAlertMsg(e);
            });
        }
      })
      .catch((e) => {
        showAlertMsg(e);
      });
  }
  function hoverCatEvent() {
    if (
      refFilterCategoryItems.current &&
      refFilterCategoryDownArrowImg.current
    ) {
      refFilterCategoryItems.current.style.display = "block";
      refFilterCategoryDownArrowImg.current.style.transform = "scale(-1)";
    }
  }
  function hoverOutCatEvent() {
    if (
      refFilterCategoryItems.current &&
      refFilterCategoryDownArrowImg.current
    ) {
      refFilterCategoryItems.current.style.display = "none";
      refFilterCategoryDownArrowImg.current.style.transform = "scale(1)";
    }
  }
  async function updateCategory(id: number) {
    setCatId(id);
  }
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    fetchCategoryList();
  }, [catId]);

  function fetchCategoryList() {
    axiosClient.get("/product/category/all/F").then((result) => {
      setFemaleCategoryList(result.data);
    });
    axiosClient.get("/product/category/all/M").then((result) => {
      setMaleCategoryList(result.data);
    });
    axiosClient.get("/product/category/all/K").then((result) => {
      setKidsCategoryList(result.data);
    });
    if (catId) {
      axiosClient.get("/product/category/".concat(catId + "")).then((res) => {
        if (res.data.mainCategory == "M") {
          setSelectedCategory("Male : " + res.data.name);
        } else if (res.data.mainCategory == "F") {
          setSelectedCategory("Female : ".concat(res.data.name));
        } else {
          setSelectedCategory("Kids : ".concat(res.data.name));
        }
      });
    }
  }
  async function deleteProductById() {
    await axiosClient
      .delete("/product/".concat(props.item.productId + ""), {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 200) {
          showAlertMsg("Product Deleted");
          setTimeout(() => {
            history.back();
          }, 2000);
        }
      })
      .catch((e) => {
        showAlertMsg(e.message);
      });
  }
  return (
    <div>
      {isInvalid && <AlertComponent msg="Please select size" />}
      {isAdded && <AlertComponent msg="Item added to cart" />}
      {showAlert && <AlertComponent msg={alertMsg} />}

      {isInvalidQty && <AlertComponent msg="Invalid Quantity" />}

      <div className="ps-4 ps-md-5 ps-sm-4 ps-lg-5 product-details-container ps-2 pe-2 pt-4 ps-sm-2 pe-sm-2 ps-md-5 pe-md-5 d-flex flex-rows gap-3 gap-md-5 gap-lg-5 gap-sm-3 flex-wrap justify-content-start">
        <div className="main-img-container ">
          <div className="item-main-img" id="item-main-img">
            {role == "ADMIN" && (
              <div className="">
                <button
                  className="material-symbols-outlined item-delete-btn rounded-5 "
                  onClick={() => {
                    deleteImageById(props.item.imageIds[0]);
                  }}
                >
                  delete
                </button>
              </div>
            )}
          </div>
          <div className="colthify text-black jaini-purva-regular p-0 m-0 z-0">
            Colothify
          </div>
        </div>
        <div className="d-flex flex-column small-images-conatiner gap-3">
          <div
            className="text-center moving-arrow fw-bold border-0 "
            onClick={moveImageDown}
          >
            <button className="material-symbols-outlined text-black arrow-btn arrow-btn-up">
              arrow_drop_up
            </button>
          </div>
          <div
            style={{
              backgroundImage: `url(data:image/png;base64,${imageDataArray[imageIndex]})`,
              height: `${height}`,
            }}
            id="item-small-img-1"
            className="small-img-container"
          >
            {role == "ADMIN" && (
              <div className="">
                <button
                  className="material-symbols-outlined item-delete-btn rounded-5 "
                  onClick={() => {
                    deleteImageById(props.item.imageIds[imageIndex + 1]);
                  }}
                >
                  delete
                </button>
              </div>
            )}
          </div>
          <div
            style={{
              backgroundImage: `url(data:image/png;base64,${
                imageDataArray[imageIndex + 1]
              })`,
            }}
            id="item-small-img-2"
            className="small-img-container"
          >
            {role == "ADMIN" && (
              <div className="">
                <button
                  className="material-symbols-outlined item-delete-btn rounded-5 "
                  onClick={() => {
                    deleteImageById(props.item.imageIds[imageIndex + 2]);
                  }}
                >
                  delete
                </button>
              </div>
            )}
          </div>
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
          {role == "ADMIN" && (
            <div className="d-flex gap-4 mt-3 mb-3 flex-wrap">
              <div>
                <button className="btn btn-primary align-items-center d-flex">
                  <label
                    htmlFor="fileInput"
                    style={{ cursor: "pointer", padding: "2px" }}
                    className="d-flex align-items-center"
                  >
                    <span className="material-symbols-outlined">add</span>
                    Add Imgs
                  </label>
                </button>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  style={{ display: "none" }}
                  multiple
                  onChange={(e) => {
                    uploadImages(e);
                  }}
                />
              </div>
              <div>
                <button
                  className="btn btn-danger p-2 align-items-center d-flex"
                  onClick={deleteAllImages}
                >
                  <span className="material-symbols-outlined pe-2">delete</span>
                  All Imgs
                </button>
              </div>
              <div>
                <button
                  disabled
                  className="btn btn-dark p-2 align-items-center d-flex"
                  onClick={deleteProductById}
                >
                  Hide
                </button>
              </div>
            </div>
          )}
          <div className="mt-md-5 mt-lg-5 mt-sm-0 mingzat-regular fw-bolder  item-name">
            {role != "ADMIN" && (
              <div>{props.item.productName.toUpperCase()}</div>
            )}
            {role == "ADMIN" && (
              <input
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
                className="form-control"
                defaultValue={props.item.productName}
              ></input>
            )}
          </div>
          <div className="mingzat-regular item-desc">
            {role != "ADMIN" && <div>{props.item.description}</div>}
            {role == "ADMIN" && (
              <div className="mt-3">
                <textarea
                  onChange={(e) => {
                    setNewDesc(e.target.value);
                  }}
                  className="form-control"
                  style={{ height: "200px" }}
                  defaultValue={props.item.description}
                ></textarea>
              </div>
            )}
          </div>
          {role == "ADMIN" && (
            <div>
              <div className="filter-option-tittle mt-3">
                <div className="filter-drop-down   ">
                  <div className="d-flex">
                    <div
                      onMouseOver={hoverCatEvent}
                      onMouseOut={hoverOutCatEvent}
                      className="p-1 ps-2 pe-2 border just-another-hand-regular fs-2 ps-3 pe-3"
                    >
                      {selectedCategory}
                      <img
                        ref={refFilterCategoryDownArrowImg}
                        src={dropDownIcon}
                        alt=""
                        width={"10px"}
                        className="ms-2 drop-down-arrow "
                      />
                    </div>
                  </div>
                  <div className="d-flex">
                    <div
                      ref={refFilterCategoryItems}
                      className="filter-items fs-4 just-another-hand-regular"
                      onMouseOver={hoverCatEvent}
                      onMouseOut={hoverOutCatEvent}
                    >
                      <button className="filter-item border p-1 ps-2 pe-2">
                        <div className="d-flex align-items-center justify-content-between male-main-category">
                          MALE
                          <span className="material-symbols-outlined right-arrow">
                            chevron_right
                          </span>
                        </div>
                        <div className="position-absolute sub-filter-menu-container top-0 sub-filter-menu-male">
                          {maleCategoryList.map((maleCategory, index) => (
                            <div
                              key={maleCategory.id}
                              className="filter-item sub-filter-item border p-1 d-flex align-items-center justify-content-between"
                              onClick={() => {
                                updateCategory(maleCategory.id);
                              }}
                              style={{ animationDelay: `${index * 0.3}s` }}
                            >
                              <div>{maleCategory.name}</div>
                              <span className="material-symbols-outlined right-sub-arrow">
                                chevron_right
                              </span>
                            </div>
                          ))}
                        </div>
                      </button>
                      <button className="filter-item border p-1 ps-2 pe-2 female-main-category">
                        <div className="d-flex align-items-center justify-content-between">
                          FEMALE
                          <span className="material-symbols-outlined right-arrow">
                            chevron_right
                          </span>
                        </div>
                        <div className="position-absolute sub-filter-menu-container sub-filter-menu-female">
                          {femaleCategoryList.map((femaleCategory, index) => (
                            <div
                              key={index}
                              className=" filter-item sub-filter-item border p-1 d-flex align-items-center justify-content-between"
                              onClick={() => {
                                updateCategory(femaleCategory.id);
                              }}
                              style={{ animationDelay: `${index * 0.3}s` }}
                            >
                              <div className="" key={femaleCategory.id}>
                                {femaleCategory.name}
                              </div>
                              <span className="material-symbols-outlined right-sub-arrow">
                                chevron_right
                              </span>
                            </div>
                          ))}
                        </div>
                      </button>
                      <button className="filter-item border p-1 ps-2 pe-2 kids-main-category">
                        <div className="d-flex align-items-center justify-content-between">
                          KIDS
                          <span className="material-symbols-outlined right-arrow">
                            chevron_right
                          </span>
                        </div>
                        <div className="position-absolute sub-filter-menu-container sub-filter-menu-kids">
                          {kidsCategoryList.map((kidsCategory, index) => (
                            <div
                              key={index}
                              className=" filter-item sub-filter-item border p-1 d-flex align-items-center justify-content-between"
                              onClick={() => {
                                updateCategory(kidsCategory.id);
                              }}
                              style={{ animationDelay: `${index * 0.3}s` }}
                            >
                              <div className="" key={kidsCategory.id}>
                                {kidsCategory.name}
                              </div>
                              <span className="material-symbols-outlined right-sub-arrow">
                                chevron_right
                              </span>
                            </div>
                          ))}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="mingzat-regular mt-4">
            {role != "ADMIN" && <div className="item-stock">Available </div>}

            <span>
              {role != "ADMIN" && (
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
                        <td about={size} key={index}>
                          {props.item?.stockQty?.[index] ?? 0}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              )}
              {role === "ADMIN" && (
                <div className="d-flex flex-wrap">
                  <div className="d-flex flex-wrap gap-3">
                    {sizes.map((size, index) => (
                      <div className="text-center" key={index}>
                        {size}
                        <input
                          type="number"
                          min={0}
                          onKeyDown={(e) => {
                            if (
                              e.key === "-" ||
                              e.key === "." ||
                              e.key === "e"
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            newStockQTY[index] = Number(e.target.value);
                          }}
                          className="form-control "
                          style={{ width: "50px" }}
                          defaultValue={props.item?.stockQty?.[index] ?? 0}
                        ></input>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </span>
          </div>
          <div className="mt-1 mingzat-regular fw-bold item-price">
            {role != "ADMIN" && <div>{`LKR : ${props.item.price}.00`}</div>}
            {role == "ADMIN" && (
              <div>
                <div className="d-flex align-items-center">
                  LKR:
                  <input
                    onChange={(e) => {
                      setNewPrice(Number(e.target.value));
                    }}
                    className=" ms-4 form-control"
                    type="text"
                    defaultValue={`${props.item.price}`}
                  />
                </div>
              </div>
            )}
          </div>
          {role != "ADMIN" && (
            <div>
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
          )}
          {role === "ADMIN" && (
            <div>
              <button
                className="btn btn-success mt-3 w-50"
                onClick={updateProduct}
              >
                UPDATE
              </button>
            </div>
          )}
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

class updateItem {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  stockQty: Array<number>;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    discount: number,
    stockQty: Array<number>
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.discount = discount;
    this.stockQty = stockQty;
  }
}
interface Category {
  description: string;
  id: number;
  mainCategory: string;
  name: string;
}

export default ProductDetailsPage;
