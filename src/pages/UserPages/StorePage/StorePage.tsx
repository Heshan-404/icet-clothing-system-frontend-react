import CartFloatButton from "../../../components/UserPages/Cart/CartFloatButton";
import NavigationBar from "../../../components/UserPages/NavigationBar/NavigationBar";
import StoreFilterMenu from "../../../components/UserPages/StorePage/StoreFilterMenu";
function StorePage(props: { isProduct: boolean }) {
  return (
    <div>
      <NavigationBar />
      <CartFloatButton />
      <div className="pt-4 mt-4 "> 
        <StoreFilterMenu isProduct={props.isProduct} />
      </div>
    </div>
  );
}

export default StorePage;
