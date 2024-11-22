import { useEffect } from "react";
import axiosClient from "../../../../axiosConfig";

function LogOutPage() {
  useEffect(() => {
    axiosClient
      .post(
        "/user/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        window.location.href = "/home";
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  }, []);

  return <div></div>;
}

export default LogOutPage;
