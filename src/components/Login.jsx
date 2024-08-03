import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../components_db/userSlice";
import Loading_Bar from "./Loading_Bar";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [errM, setErrM] = useState(null);
  const [loginUser] = useLoginMutation();

  const submit = async (e) => {
    e.preventDefault();
    try {
      let success = false;
      success = await loginUser(form).unwrap();

      console.log("Login() SUCCESS: ", success);

      if (!success?.token) {
        return Loading_Bar("50");
      }

      if (success?.token) {
        window.sessionStorage.setItem("Token", success.token);

        navigate("/garden");
      } else {
        setErrM(
          "Invalid Username or Password, Please check your input and try again."
        );
      }
    } catch (err) {
      setErrM(
        "Invalid Username or Password, Please check your input and try again."
      );
    }
  };

  const updateForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="container top3">
        <div className="row w100 ">
          <div className="col-7 card border-success ">
            <div className="card-header row  ">
              <h4 className="center">Login</h4>
            </div>
            <form onSubmit={submit} name="formRegister">
              <div className="row">
                <div className="col-12">
                  <input
                    type="email"
                    className="form-control form-control-login"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    onChange={updateForm}
                    required
                  />
                </div>{" "}
              </div>

              <div className="row">
                <div className="col-12">
                  <input
                    type="password"
                    className="form-control form-control-login"
                    name="password"
                    placeholder="Password"
                    onChange={updateForm}
                    required
                  />
                </div>
              </div>



              <div className="row">
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-success form-control mv1"
                  >
                    Submit
                  </button>

                </div>
              </div>
            </form>
            {errM && (
              <div className="row">
                <div className="col-12">
                  <p className="text-warning">{errM}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
