import { useEffect, useRef, useState } from "react";
import "./StoreFilterMenu.css";
import dropDownIcon from "../../../assets/arrow-down.png"; 
import { useParams } from "react-router-dom";
import axiosClient from "../../../../../axiosConfig";
import ProductDetailsPage from "../../../UserPages/StorePage/ProductDetails";
import StoreItemContainer from "../../../UserPages/StorePage/StoreItemContainer";
export default function DashboardProductFilterMenu({ isProduct }: { isProduct: boolean }) {
  const [filter, setFilter] = useState("all");
  const { productId } = useParams<{ productId: string }>();
  const [item, setItem] = useState<Item>();
  const [maleCategoryList, setMaleCategoryList] = useState<Category[]>([]);
  const [kidsCategoryList, setFemaleCategoryList] = useState<Category[]>([]);
  const [femaleCategoryList, setKidsCategoryList] = useState<Category[]>([]);
  useEffect(() => {
    if (isProduct && productId) {
      axiosClient.get("/product/".concat(productId)).then((response) => {
        setItem(response.data);
        if (item && item.productId) {
          // setFilter(item.categoryId + "");
        }
      });
    }
  }, []);
  useEffect(() => {
    fetchCategoryList();
  }, []);

  async function fetchCategoryList() {
    axiosClient.get("/product/category/all/F").then((result) => {
      setFemaleCategoryList(result.data);
    });
    axiosClient.get("/product/category/all/M").then((result) => {
      setMaleCategoryList(result.data);
    });
    axiosClient.get("/product/category/all/K").then((result) => {
      setKidsCategoryList(result.data);
    });
  }

  const refFilterCategoryItems = useRef<HTMLDivElement>(null);
  const refFilterPriceItems = useRef<HTMLDivElement>(null);
  const refFilterPriceDownArrowImg = useRef<HTMLImageElement>(null);
  const refFilterCategoryDownArrowImg = useRef<HTMLImageElement>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  useEffect(() => {});
  async function clickCatEvent() {
    if (
      refFilterCategoryItems.current &&
      refFilterCategoryDownArrowImg.current
    ) {
      refFilterCategoryItems.current.style.display = "none";
      refFilterCategoryDownArrowImg.current.style.transform = "scale(1)";
    }
    console.log("asda");
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

  async function clickPriceEvent() {
    if (refFilterPriceItems.current && refFilterPriceDownArrowImg.current) {
      // refFilterPriceItems.current.style.display = "none";
      refFilterPriceDownArrowImg.current.style.transform = "scale(1)";
    }
  }
  function hoverPriceEvent() {
    if (refFilterPriceItems.current && refFilterPriceDownArrowImg.current) {
      refFilterPriceItems.current.style.display = "block";
      refFilterPriceDownArrowImg.current.style.transform = "scale(-1)";
    }
  }
  function hoverOutPriceEvent() {
    if (refFilterPriceItems.current && refFilterPriceDownArrowImg.current) {
      refFilterPriceItems.current.style.display = "none";
      refFilterPriceDownArrowImg.current.style.transform = "scale(1)";
    }
  }
  async function changeLocation(id: number) {
    window.location.href = "/store/category/".concat(id + "");
  }

  return (
    <div>
      <div className="d-flex gap-3 ms-2 ms-sm-2 ms-md-5 ms-lg-5 ms-xl-5 ms-xxl-5 mt-3">
        <div className="filter-option-container">
          <div className="filter-option-tittle ">
            <div className="mingzat-regular mb-1">CATEGORY</div>
            <div className="filter-drop-down   ">
              <div className="d-flex">
                <div
                  onMouseOver={hoverCatEvent}
                  onMouseOut={hoverOutCatEvent}
                  className="p-1 ps-2 pe-2 border just-another-hand-regular fs-2 ps-3 pe-3"
                >
                  All Categories
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
                            changeLocation(maleCategory.id);
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
                            changeLocation(femaleCategory.id);
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
                            changeLocation(kidsCategory.id);
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
        <div className="filter-option-container">
          <div className="filter-option-tittle">
            <div className="mingzat-regular mb-1">PRICE RANGE</div>
            <div className="filter-drop-down  ">
              <div
                onMouseOver={hoverPriceEvent}
                onMouseOut={hoverOutPriceEvent}
                className="p-1 ps-2 pe-2 border just-another-hand-regular fs-2 ps-3 pe-3"
              >
                Default
                <img
                  ref={refFilterPriceDownArrowImg}
                  src={dropDownIcon}
                  alt=""
                  width={"10px"}
                  className="ms-5 drop-down-arrow"
                />
              </div>
              <div className="d-flex">
                <div
                  ref={refFilterPriceItems}
                  className="filter-items fs-4 just-another-hand-regular"
                  onMouseOver={hoverPriceEvent}
                  onMouseOut={hoverOutPriceEvent}
                >
                  <button
                    className="filter-item border p-1 ps-2 pe-2"
                    onClick={clickPriceEvent}
                  >
                    LKR 1000-2000
                  </button>
                  <button
                    className="filter-item border p-1 ps-2 pe-2"
                    onClick={clickPriceEvent}
                  >
                    LKR 2000-5000
                  </button>
                  <button
                    className="filter-item border p-1 ps-2 pe-2"
                    onClick={clickPriceEvent}
                  >
                    LKR 5000 - 8000
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isProduct && item && (
          <>
            <ProductDetailsPage item={item} />
            <div className="horizontal-line d-flex mt-3 mt-sm-3 mt-md-5 mt-lg-5" />
          </>
        )}
      </div>
      <div>
        {isProduct && item && <StoreItemContainer filter={filter} />}
        {!isProduct && <StoreItemContainer filter="all" />}
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

interface Category {
  description: string;
  id: number;
  mainCategory: string;
  name: string;
}
