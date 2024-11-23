import { useEffect, useState } from "react";
import "./NavigationBar.css";

function NavigationBar() {
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    setRole(getCookieByName("role"));
    console.log(role);
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
    <div className="mb-5 nv-bar-container">
      <div className="w-100 position-fixed top-0 z-3 nav-bar-container">
        <div className="d-flex align-items-center nav-bar-middle-line-container ms-3 me-3">
          <div className="col-4 ">
            {role != "ADMIN" && (
              <div className=" fs-4 ">
                <button
                  className="btn border-0 p-0 "
                  onClick={() => {
                    window.location.href = "/home";
                  }}
                >
                  <span className=" nav-bar-home-btn fs-2  material-symbols-outlined">
                    home
                  </span>
                </button>
              </div>
            )}
          </div>
          <div className="col-4  d-flex flex-row justify-content-center gap-2">
            <div
              className="text-center nav-bar-middle-btn fs-4  p-1 ps-3 pe-3 rounded-5 kablammo"
              onClick={() => {
                window.location.href = "/category/women";
              }}
            >
              WOMEN
            </div>
            <div
              className="text-center nav-bar-middle-btn fs-4  p-1 ps-3 pe-3 rounded-5 kablammo"
              onClick={() => {
                window.location.href = "/category/men";
              }}
            >
              MEN
            </div>
            <div
              className="z-3 text-center nav-bar-middle-btn fs-4  p-1 ps-3 pe-3 rounded-5 kablammo"
              onClick={() => {
                window.location.href = "/category/kids";
              }}
            >
              KIDS
            </div>
            {role == "ADMIN" && (
              <div
                className="text-center nav-bar-middle-btn bg-white text-black   fs-5   p-1 ps-3 pe-3 rounded-5"
                onClick={() => {
                  window.location.href = "/admin/dashboard";
                }}
              >
                <span className="text-black fs-5 material-symbols-outlined">
                  admin_panel_settings
                </span>
              </div>
            )}
          </div>
          <div className="w-100 d-flex justify-content-end z-1">
            <div className="  text-white  d-flex justify-content-end">
              <button className="btn border-0 pt-1 p-0"
              onClick={()=>{
                if (role) {
                  window.location.href = "/profile";
                }else{
                  window.location.href = "/user-login";
                }
              }}
              >
                {role && (
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                )}
                {!role && (
                  <span className="material-symbols-outlined">login</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
