import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";
import { toast } from "react-toastify";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();

  try {
    if (!role || !email || !password) {
      //return alert("Please provide all feilds ");
      return toast.error("Please provide all fields", {
        autoClose: 2000,
        progressBar: false,
      });
    }
    //console.log("login", e, email, password, role);
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  organisationName,
  hospitalName,
  website,
  address,
  phone
) => {
  e.preventDefault();

  try {
    if (!role || !email || !password) {
      //return alert("Please provide all feilds ");
      return toast.error("Please provide all fields", {
        autoClose: 2000,
        progressBar: false,
      });
    }
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        organisationName,
        hospitalName,
        website,
        address,
        phone,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
