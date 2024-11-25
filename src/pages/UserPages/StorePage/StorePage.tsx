import { useEffect, useState } from "react";
import CartFloatButton from "../../../components/UserPages/Cart/CartFloatButton";
import NavigationBar from "../../../components/UserPages/NavigationBar/NavigationBar";
import StoreFilterMenu from "../../../components/UserPages/StorePage/StoreFilterMenu";
function StorePage(props: { isProduct: boolean }) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(getCookieByName("role"));
  }, [role]);
  
  function getCookieByName(name: string) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  return (
    <div>
      <NavigationBar />
      {role != "ADMIN" && (
        <div>
          <CartFloatButton />
          <div className="pt-4 mt-4 ">
            <StoreFilterMenu isProduct={props.isProduct} />
          </div>
        </div>
      )}
      {role == "ADMIN" && (
        <div className="pt-4 mt-4 ">
          <StoreFilterMenu isProduct={props.isProduct} />
        </div>
      )}
    </div>
  );
}

export default StorePage;
