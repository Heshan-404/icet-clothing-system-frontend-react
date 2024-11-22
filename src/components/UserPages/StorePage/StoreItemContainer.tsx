import { useEffect, useState } from "react";
import StoreItem from "./StoreItem";
import StoreItemSkeleton from "./StoreItemSkeleton";
import axiosClient from "../../../../axiosConfig";

function StoreItemContainer(props: { filter: string }) {
  const [itemsList, setItems] = useState<Array<Item>>();
  useEffect(() => {
    axiosClient.get("/product/".concat(props.filter)).then((response) => {
      setItems(response.data);
    });
  }, [props.filter]);
  return (
    <div className="">
      <div className="d-flex flex-wrap w-100 d-flex ">
        {itemsList != null &&
          itemsList.map((item, index) => (
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5 " key={index}>
              <div className="w-100">
                <StoreItem product={item} />
              </div>
            </div>
          ))}
        {itemsList == null && (
          <div className="w-100 d-flex flex-wrap">
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5">
              <div className="w-100">
                <StoreItemSkeleton />
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5 ">
              <div className="w-100">
                <StoreItemSkeleton />
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5 ">
              <div className="w-100">
                <StoreItemSkeleton />
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5 ">
              <div className="w-100">
                <StoreItemSkeleton />
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5 ">
              <div className="w-100">
                <StoreItemSkeleton />
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5 ">
              <div className="w-100">
                <StoreItemSkeleton />
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5 ">
              <div className="w-100">
                <StoreItemSkeleton />
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5 ">
              <div className="w-100">
                <StoreItemSkeleton />
              </div>
            </div>
          </div>
        )}
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

export default StoreItemContainer;
