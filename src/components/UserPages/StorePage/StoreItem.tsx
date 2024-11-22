import { useEffect, useRef, useState } from "react";
import "./StoreItem.css";
import axiosClient from "../../../../axiosConfig";

function StoreItem({ product }: { product: Item }) {
  const storeImgContainerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    if (storeImgContainerRef.current) {
      const width = storeImgContainerRef.current.getBoundingClientRect().width;
      setHeight(width);
    }
    if (product.imageIds && product.imageIds[0] != null) {
      axiosClient
        .get("/product/image/".concat(product.imageIds[0] + ""))
        .then((result) => {
          setImageData(result.data.data);
        });
      const imageBase64 = `data:image/png;base64,${imageData}`;
      const imgElement = document.getElementById("store-item-img");
      if (imgElement) {
        imgElement.style.backgroundImage = `url(${imageBase64})`;
      }
    }
  }, [imageData]);

  return (
    <div>
      <div
        className="w-100 store-item-container mt-2 p-2"
        onClick={() => {
          window.location.href = "/store/product/".concat(
            product.productId + ""
          );
        }}
      >
        <div
          className="store-img-container w-100"
          ref={storeImgContainerRef}
          style={{ height: `${height}px` }} // Apply height with px unit
        >
          <div
            id="store-item-img"
            className="store-item-img"
            ref={storeImgContainerRef}
          ></div>
        </div>
        <div className="mt-3 mingzat-regular fw-bolder fs-5">
          {product.productName}
        </div>
        <div className="store-item-description mingzat-regular">
          {product.description}dsfdsfds dsfdsd dsfds
        </div>
        <div className="mt-1 mingzat-regular fw-bold">LKR : {product.price}.00</div>
      </div>
    </div>
  );
}

interface Item {
  description: string;
  categoryDescription: string;
  stock: number;
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

export default StoreItem;
