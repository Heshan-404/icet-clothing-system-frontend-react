import { useEffect, useRef, useState } from "react";
import "./StoreItem.css";

function StoreItem(props: any) {
  const storeImgContainerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (storeImgContainerRef.current) {
      const width = storeImgContainerRef.current.getBoundingClientRect().width;
      setHeight(width); // Set height based on width
    }
  }, []);

  return (
    <div>
      <div className="w-100 store-item-container mt-2 p-2">
        <div
          className="store-img-container w-100"
          ref={storeImgContainerRef}
          style={{ height: `${height}px` }} // Apply height with px unit
        >
          <div className="store-item-img" ref={storeImgContainerRef}></div>
        </div>
        <div className="mt-3 mingzat-regular fw-bolder fs-5">{props.name}</div>
        <div className="mingzat-regular">{props.desc}</div>
        <div className="mt-1 mingzat-regular fw-bold">{props.price}</div>
      </div>
    </div>
  );
}

export default StoreItem;
