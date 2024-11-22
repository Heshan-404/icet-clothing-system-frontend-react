import AdminNavBar from "../../../../components/AdminPages/AdminNavbar/AdminNavBar";
import StoreFilterMenu from "../../../../components/UserPages/StorePage/StoreFilterMenu";

function MngProductPage(props: { isProduct: boolean }) {
  return (
    <div>
      <AdminNavBar />
      <StoreFilterMenu isProduct={props.isProduct} />
    </div>
  );
}

export default MngProductPage;
