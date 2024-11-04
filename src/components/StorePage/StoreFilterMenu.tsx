import { useEffect, useRef } from "react";
import "./StoreFilterMenu.css";
import dropDownIcon from "../../assets/arrow-down.png";
export default function StoreFilterMenu() {
  const refFilterCategoryItems = useRef<HTMLDivElement>(null);
  const refFilterPriceItems = useRef<HTMLDivElement>(null);
  const refFilterPriceDownArrowImg = useRef<HTMLImageElement>(null);
  const refFilterCategoryDownArrowImg = useRef<HTMLImageElement>(null);
  useEffect(() => {});
  async function clickCatEvent() {
    if (
      refFilterCategoryItems.current &&
      refFilterCategoryDownArrowImg.current
    ) {
      refFilterCategoryItems.current.style.display = "none";
      refFilterCategoryDownArrowImg.current.style.transform = "scale(1)";
    }
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
    if (refFilterCategoryItems.current && refFilterCategoryDownArrowImg.current) {
      refFilterCategoryItems.current.style.display = "none";
      refFilterCategoryDownArrowImg.current.style.transform = "scale(1)"
    }
  }

  async function clickPriceEvent() {
    if (refFilterPriceItems.current && refFilterPriceDownArrowImg.current) {
      refFilterPriceItems.current.style.display = "none";
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
      refFilterPriceDownArrowImg.current.style.transform = "scale(1)"
    }
  }

  return (
    <div>
      <div className="d-flex gap-3 ms-2 ms-sm-2 ms-md-5 ms-lg-5 ms-xl-5 ms-xxl-5 mt-3">
        <div className="filter-option-container">
          <div className="filter-option-tittle">
            <div className="mingzat-regular mb-1">CATEGORY</div>
            <div className="filter-drop-down  ">
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
                  className="ms-2 drop-down-arrow"
                />
              </div>
              <div className="d-flex">
                <div
                  ref={refFilterCategoryItems}
                  className="filter-items fs-4 just-another-hand-regular"
                  onMouseOver={hoverCatEvent}
                  onMouseOut={hoverOutCatEvent}
                >
                  <button
                    className="filter-item border p-1 ps-2 pe-2"
                    onClick={clickCatEvent}
                  >
                    Male - T- Shirt
                  </button>
                  <button
                    className="filter-item border p-1 ps-2 pe-2"
                    onClick={clickCatEvent}
                  >
                    Category 2
                  </button>
                  <button
                    className="filter-item border p-1 ps-2 pe-2"
                    onClick={clickCatEvent}
                  >
                    Category 3
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
                  className="ms-2 drop-down-arrow"
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
    </div>
  );
}
