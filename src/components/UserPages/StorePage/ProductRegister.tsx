import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../../axiosConfig";
import dropDownIcon from "../../../assets/arrow-down.png";
import "./ProductRegister.css";
import AlertComponent from "../alerts/AlertComponent";
import NavigationBar from "../NavigationBar/NavigationBar";
function ProductRegister() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const refFilterCategoryItems = useRef<HTMLDivElement>(null);
  const refFilterCategoryDownArrowImg = useRef<HTMLImageElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [catId, setCatId] = useState<number | null>(null);
  const [maleCategoryList, setMaleCategoryList] = useState<Category[]>([]);
  const [kidsCategoryList, setKidsCategoryList] = useState<Category[]>([]);
  const [femaleCategoryList, setFemaleCategoryList] = useState<Category[]>([]);
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const [StockQTY, setStockQTY] = useState<Array<number>>([0, 0, 0, 0, 0, 0]);
  const [Name, setName] = useState("");
  const [Desc, setDesc] = useState("");
  const [Price, setPrice] = useState(0);
  const [Discount, setDiscount] = useState(0);

  const [imageList, setImageList] = useState<File[]>();

  async function showAlertMsg(msg: string) {
    setAlertMsg(msg);
    setShowAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  async function showAlertMsgDontReload(msg: string) {
    setAlertMsg(msg);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
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
    hoverOutCatEvent();
  }
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
  async function registerProduct() {
    if (
      isEmpty(Name) ||
      isEmpty(Desc) ||
      Price <= 0 ||
      Discount < 0 ||
      isEmpty(catId)
    ) {
      showAlertMsgDontReload("All fields must be filled");
    } else if (!imageList) {
      showAlertMsgDontReload("Add images");
    }
    function isEmpty(value: any) {
      return value === "" || value === null || value === undefined;
    }

    if (catId != null) {
      let newProduct: NewProduct = new NewProduct(
        Name,
        Desc,
        Price,
        Discount,
        new Category("", catId, "", ""),
        StockQTY
      );
      await axiosClient
        .post("/product", newProduct, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status == 200) {
            axiosClient
              .put(
                `/product/category/product/${res.data.id}/category/${catId}`,
                {},
                {
                  withCredentials: true,
                }
              )
              .then((result) => {
                if (result.status == 200 && imageList) {
                  imageList.forEach((file) => {
                    const formData = new FormData();
                    formData.append("image", file);
                    axiosClient
                      .post(`/product/image/product/${res.data.id}`, formData, {
                        withCredentials: true,
                      })
                      .then((response) => {
                        showAlertMsgDontReload("product added");
                        setTimeout(() => {
                          history.back();
                        }, 4000);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  });
                }
              });
          }
        })
        .catch((e) => {
          showAlertMsg(e.message);
        });
    }
  }
  return (
    <div>
      <NavigationBar />
      <div className="pro-reg-container mt-5 pt-2">
        {showAlert && <AlertComponent msg={alertMsg} />}
        <div className="add-product-container ">
          <div className=" w-100 h-100 bg-white">
            <div className="container ">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Product Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <textarea
                className="form-control mt-3"
                placeholder="Product Description"
                style={{ height: "150px" }}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
              <input
                type="number"
                className="form-control mt-3"
                placeholder="Price"
                min={0}
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "." || e.key === "e") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                }}
              />
              <input
                type="number"
                className="form-control mt-3"
                placeholder="discount"
                min={0}
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "." || e.key === "e") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setDiscount(Number(e.target.value));
                }}
              />
            </div>
            <div>
              <div className="d-flex flex-wrap justify-content-center mt-3">
                <div className="d-flex flex-wrap gap-2">
                  {sizes.map((size, index) => (
                    <div className="text-center" key={index}>
                      {size}
                      <input
                        type="number"
                        min={0}
                        defaultValue={0}
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "." || e.key === "e") {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          StockQTY[index] = Number(e.target.value);
                        }}
                        className="form-control "
                        style={{ width: "50px" }}
                      ></input>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ms-3">
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
            <div>
              <button className="btn btn-dark ms-3 mt-3">
                <label
                  htmlFor="fileInput"
                  style={{ cursor: "pointer", padding: "3px" }}
                  className="d-flex align-items-center"
                >
                  <span className="material-symbols-outlined">image</span>
                </label>
              </button>
              <input
                id="fileInput"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: "none" }}
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setImageList(Array.from(e.target.files));
                  }
                }}
              />
            </div>
            {imageList && (
              <div className="d-flex flex-wrap mt-3">
                {imageList.map((image, index) => (
                  <div key={index} className="m-2 text-center">
                    <img
                      src={URL.createObjectURL(image)} // Generate a preview URL
                      alt={`Preview ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    <p className="text-muted mt-1" style={{ fontSize: "12px" }}>
                      {image.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <div className="pb-5 mb-5">
              <button
                className="btn btn-success mt-3 ms-3"
                onClick={registerProduct}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
class Category {
  description: string;
  id: number;
  mainCategory: string;
  name: string;
  constructor(
    description: string,
    id: number,
    mainCategory: string,
    name: string
  ) {
    this.description = description;
    this.id = id;
    this.mainCategory = mainCategory;
    this.name = name;
  }
}

class NewProduct {
  name: string;
  description: string;
  price: number;
  discount: number;
  category: Category;
  stockQty: Array<number>;

  constructor(
    name: string,
    description: string,
    price: number,
    discount: number,
    category: Category,
    stockQty: Array<number>
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.discount = discount;
    this.category = category;
    this.stockQty = stockQty;
  }
}

export default ProductRegister;
