import { useUpdateUserMutation } from "../components_db/userSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectList from "./SelectList";
import Loading_Bar from "./Loading_Bar";

import LoadReference from "./reference";

export default function User() {
  // setup the return button
  const navigate = useNavigate();

  // console.log("user page load reference");
  // LoadReference();

  // Get the current User
  const user = useSelector((state) => {
    return state.user.user;
  });

  // Get the reference list for Zone
  const zoneList = useSelector((state) => {
    return state.reference.zoneList;
  });

  // set up the relationship to the user mutation
  const [updateUser] = useUpdateUserMutation();

  const [form, setForm] = useState(user);
  const [errM, setErrM] = useState(null);
  const [successM, setSuccessM] = useState(null);

  //  What to do when the submit button is clicked
  const submit = async (e) => {
    e.preventDefault();
    console.log(`(useSelector(state) - function User() SUBMIT`);

    try {
      let updateSuccess = false;

      updateSuccess = updateUser(form).unwrap();

      console.log(`(function User() SUBMIT UPDATESUCCESS: ${updateSuccess}`);

      if (!updateSuccess) {
        return Loading_Bar("30");
      } else if (updateSuccess) {
        return setSuccessM("User updated successfully!");
      }
    } catch (err) {
      setErrM(err?.data?.message);
    }
  };

  const updateForm = (e) => {
    console.log(`updateForm: ${e.target.name}: ${e.target.value}`);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateFormOnListChange = (e) => {
    console.log(`updateFormOnListChange: ${e.target.name}: ${e.target.value}`);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(updateFormOnListChange);
    console.log(form);
  };

  return (
    <>
      <div className="container top5">
        <div className="row w100">
          <div className="col"></div>

          <div className="col-8">
            <div className="card border-success ">
              <div className="card-header ">
                <h4 className="card-title">User Details</h4>
              </div>

              <div className="card-body">
                <div className="card-text ">
                  <form onSubmit={submit} name="formUserUpdate">
                    <div className="col-12">
                      <div className="row gap-3">
                        <input
                          type="email"
                          className="form-control text_input"
                          name="email"
                          aria-describedby="emailHelp"
                          placeholder="Email"
                          onChange={updateForm}
                          value={form.email}
                          disabled
                          required
                        />
                        <input
                          type="text"
                          className="form-control text_input"
                          name="firstname"
                          placeholder="First Name"
                          onChange={updateForm}
                          value={form.firstname}
                          required
                        />

                        <input
                          type="phone"
                          className="form-control text_input"
                          name="phone_number"
                          placeholder="(XXX) 867-5209"
                          onChange={updateForm}
                          value={form.phone_number}
                          required
                        />

                        <input
                          type="text"
                          className="form-control text_input"
                          name="lastname"
                          placeholder="Last Name"
                          value={form.lastname}
                          onChange={updateForm}
                          required
                        />

                        <SelectList
                          theList={zoneList}
                          theListName="zone_id"
                          theParentForm="UserUpdate"
                          onChangeFunction={updateFormOnListChange}
                          theCurrentValue={form.zone_id}
                          theFieldName="zone_name"
                          the2FieldName="temp_range"
                        />
                      </div>{" "}
                      {/*  //close row */}
                    </div>{" "}
                    {/*  //close col-12 */}
                    <div className="row ">
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-success form-control mt-3"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="btn btn-success mt-3"
                          onClick={() => navigate("/garden")}
                        >
                          Return
                        </button>
                      </div>
                      {successM && (
                        <div className="row">
                          <div className="col-12">
                            <p className="text-warning">{successM}</p>
                          </div>
                        </div>
                      )}
                      {errM && (
                        <div className="row">
                          <div className="col-12">
                            <p className="text-warning">{errM}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col"></div>
        </div>{" "}
      </div>
    </>
  );
}
