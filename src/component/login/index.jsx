import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { getUserInfo, userLogin } from "../../helpers/utils/auth.util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const vaidation = () => {
    let formValid = true;
    let error = {};

    if (!userData?.userName?.trim()) {
      formValid = false;
      error["userName"] = "Please enter userName";
    }
    if (!userData?.password?.trim()) {
      formValid = false;
      error["password"] = "Please enter password";
    }
    setError(error);
    return formValid;
  };

  const handleLogin = () => {
    if (vaidation()) {
      const signUpData = getUserInfo() ? getUserInfo() : [];
      const userNameMatch = signUpData?.filter(
        (item) =>
          item?.userName === userData?.userName &&
          item?.password === userData?.password
      );
      if (userNameMatch?.length > 0) {
        toast.success("User login successfully");
        userLogin(userData);
        navigate("/");
      } else {
        toast.error("Enter valide username & password");
      }
      // Implement your login logic here
      console.log("userData:", userData, error);
    }
  };

  return (
    <React.Fragment>
      <div className="flex items-center justify-center bg-gray-100 login-form-height">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-semibold mb-6">Login</h1>

          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-600"
            >
              UserName
            </label>
            <input
              type="text"
              name="userName"
              value={userData?.userName}
              onChange={(e) => handelOnChange(e)}
              className="mt-1 p-2 w-full border rounded"
            />
            <span className="text-xs text-red-500">{error["userName"]}</span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={userData?.password}
                onChange={(e) => handelOnChange(e)}
                className="mt-1 p-2 w-full border rounded"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-gray-600"
                />
              </div>
            </div>
            <span className="text-xs text-red-500">{error["password"]}</span>
          </div>

          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Login
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
