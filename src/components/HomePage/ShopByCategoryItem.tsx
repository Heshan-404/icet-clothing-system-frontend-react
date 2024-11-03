import { useEffect, useRef, useState } from "react";
import "./shopByCategoryItem.css";
import heightModule from "./constHeight";

function ShopByCategoryItem(props: any) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
      if (heightModule.getHeight() == "") {
        heightModule.setHeight(imageRef.current.style.width);
      }

      const width = containerRef.current.clientWidth;
      containerRef.current.style.height = `${width}px`;
      imageRef.current.style.width = `${width}px`;
      imageRef.current.style.height = `${heightModule.getHeight()}`;
      imageRef.current.style.backgroundImage = `url(${props.img})`;
      containerRef.current.style.height = `${heightModule.getHeight()}`;
      imageRef.current.style.height = `${heightModule.getHeight()}`;
    }
  }, [screenWidth, props.img]);

  return (
    <div className="">
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
