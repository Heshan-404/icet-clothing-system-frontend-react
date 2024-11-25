import { useEffect, useState } from "react";
import axiosClient from "../../../../axiosConfig";
import AlertComponent from "../../../components/UserPages/alerts/AlertComponent";
import AdminNavBar from "../../../components/AdminPages/AdminNavbar/AdminNavBar";

function AdminRegister() {
  const [email, setEmail] = useState("");
  const [AlertVisible, setAlertVisible] = useState(false);
  const [msg, setMsg] = useState("");

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

  async function makeAdmin() {
    if (email != "" && role == "ADMIN") {
      const roleList: Array<number> = [1];
      const roleUser = new RoleUser(email, roleList);
      console.log(roleUser);

      await axiosClient
        .put("/user/role", roleUser, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);

          if (res.status == 200) {
            setMsg("Registered an new admin");
            showAlert();
          }
        })
        .catch((e) => {
          if (e.status == 500) {
            setMsg("Invalid Email");
            showAlertMsgDontReload();
          }
        });
    }
  }

  function showAlert() {
    setAlertVisible(true);
    setTimeout(() => history.back(), 2000);
  }
  function showAlertMsgDontReload() {
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 2000);
  }

  return (
    <div>
      <AdminNavBar />
      {AlertVisible && <AlertComponent msg={msg} />}
      <div className="d-flex justify-content-center">
        <div className=" mt-5" style={{ width: "300px" }}>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name=""
            id=""
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="d-flex justify-content-between w-100 gap-4 mt-3 p-2">
            <button
              className="btn btn-success w-100"
              onClick={() => {
                makeAdmin();
              }}
            >
              Make as an admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;

class RoleUser {
  email: string;
  roleIds: Array<number>;

  constructor(email: string, roleIds: Array<number>) {
    this.email = email;
    this.roleIds = roleIds;
  }
}
