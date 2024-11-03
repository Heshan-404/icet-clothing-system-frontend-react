import { useEffect, useRef, useState } from "react";
import "./shopByCategoryItem.css";
import heightModule from "./constHeight";

function ShopByCategoryItem(props: any) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const link = props.link;

  function onClickRedirect() {
    window.location.href = link;
  }
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current && imageRef.current) {
      const width = containerRef.current.clientWidth;

      if (!heightModule.getHeight()) {
        heightModule.setHeight(width);
      }

      const consistentHeight = heightModule.getHeight();
      containerRef.current.style.height = `${consistentHeight}px`;
      imageRef.current.style.width = `${width}px`;
      imageRef.current.style.height = `${consistentHeight}px`;
      imageRef.current.style.backgroundImage = `url(${props.img})`;
    }
  }, [screenWidth, props.img]);

  return (
    <div
      className=""
      onClick={() => {
        onClickRedirect();
      }}
    >
      <div ref={containerRef} className="container-category-item">
        <div ref={imageRef} id="category-item-img">
          <div className="black-line-container d-flex align-items-center justify-content-center">
            <div className="black-line w-100">
              <div className="item-name-container d-flex align-items-center justify-content-center">
                <div className="item-name-text text-white">{props.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopByCategoryItem;
