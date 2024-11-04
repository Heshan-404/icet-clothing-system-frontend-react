import StoreFilterMenu from "../../components/StorePage/StoreFilterMenu";
import StoreItem from "../../components/StorePage/StoreItem";

function StorePage() {
  const items = [
    { id: 1, name: "Item 1", desc: "Description 1", price: "$10" },
    { id: 2, name: "Item 2", desc: "Description 2", price: "$15" },
    { id: 3, name: "Item 3", desc: "Description 3", price: "$20" },
    // Add more items as needed
  ];

  return (
    <div className="">
      <StoreFilterMenu />
      <div className="d-flex flex-wrap w-100 d-flex ">
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5 ">
          <div className="w-100">
            <StoreItem
              name={"BLACK SHIRT"}
              desc={"SLIM FIT"}
              price={"2800.00"}
            />
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5 ">
          <div className="w-100">
            <StoreItem
              name={"BLACK SHIRT"}
              desc={"SLIM FIT"}
              price={"2800.00"}
            />
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5 ">
          <div className="w-100">
            <StoreItem
              name={"BLACK SHIRT"}
              desc={"SLIM FIT"}
              price={"2800.00"}
            />
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5 ">
          <div className="w-100">
            <StoreItem
              name={"BLACK SHIRT"}
              desc={"SLIM FIT"}
              price={"2800.00"}
            />
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5 ">
          <div className="w-100">
            <StoreItem
              name={"BLACK SHIRT"}
              desc={"SLIM FIT"}
              price={"2800.00"}
            />
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex p-2 p-sm-2 p-md-5 ">
          <div className="w-100">
            <StoreItem
              name={"BLACK SHIRT"}
              desc={"SLIM FIT"}
              price={"2800.00"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StorePage;
