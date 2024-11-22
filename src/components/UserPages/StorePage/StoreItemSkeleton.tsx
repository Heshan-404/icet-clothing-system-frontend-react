import { useEffect, useRef, useState } from "react";
import "./StoreItemSkeleton.css";

function StoreItemSkeleton(props: any) {
  const storeImgContainerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (storeImgContainerRef.current) {
      const width = storeImgContainerRef.current.getBoundingClientRect().width;
      setHeight(width);
    }
  }, []);

  return (
    <div>
      <div className="w-100 store-item-skeleton-container mt-2 p-2"></div>
    </div>
  );
}

export default StoreItemSkeleton;
