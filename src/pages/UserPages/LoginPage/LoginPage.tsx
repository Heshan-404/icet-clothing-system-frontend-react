import { useState } from "react";
import "./LoginPage.css";
import AlertComponent from "../../../components/UserPages/alerts/AlertComponent";
import axiosClient from "../../../../axiosConfig";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [error, setError] = useState("");
  function userLogin(e: any) {
    e.preventDefault();
    if (email == "" || password == "") {
      setError("Fill all fields");
      showAlertInvalid();
    } else {
      const user: User = new User(email, password);
      axiosClient
        .post("/user/login", user, { withCredentials: true })
        .then((result) => {
          if (result.status === 200) {
            history.back();
          }
        })
        .catch((err) => {
          setError("invalid credentials");
          showAlertInvalid();
        });
    }
  }
  function showAlertInvalid() {
    setIsInvalid(true);
    setTimeout(() => setIsInvalid(false), 2000);
  }
  return (
    <div>
      {isInvalid && <AlertComponent msg={error} />}

      <div className="w-100 d-flex justify-content-center mt-5">
        <form onSubmit={userLogin}>
          <div className="form-group">
            <label form="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label form="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" form="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
class User {
  email: string;
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export default LoginPage;
