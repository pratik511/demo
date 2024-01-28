import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { getUserInfo, setUserInfo } from '../../helpers/utils/auth.util';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [userData, setUserData] = useState({})
    const [error, setError] = useState({})
    const [showPassword, setShowPassword] = useState({ new: false, old: false });

    const handelPassword = (data) => {
        if (data === "new") {
            setShowPassword({ ...showPassword, [data]: !showPassword?.new })
        } else {
            setShowPassword({ ...showPassword, [data]: !showPassword?.old })
        }
    }


    const handelOnChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
        setError({ ...error, [name]: "" })
    }

    const vaidation = () => {
        let formValid = true;
        let error = {};
        const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
        const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!userData?.userName?.trim()) {
            formValid = false
            error["userName"] = "Please enter userName"
        }
        if (!userData?.email?.trim()) {
            formValid = false
            error["email"] = "Please enter email"
        } else if (!regex.test(userData?.email)) {
            formValid = false;
            error["email"] = "Please enter a valid email address";
        }
        if (!userData?.password?.trim()) {
            formValid = false
            error["password"] = "Please enter password"
        } else if (userData?.password?.length < 8) {
            formValid = false;
            error["password"] = "Password Must be Minimum of 8 characters";
        } else if (!regexPassword.test(userData?.password)) {
            formValid = false;
            error["password"] =
                "Password Must be a number and uppercase and lowercase and unique characters";
        }


        if (!userData?.cpassword?.trim()) {
            formValid = false
            error["cpassword"] = "Please enter confirm password"
        } else if (!(userData?.password?.trim() === userData?.cpassword?.trim())) {
            formValid = false
            error["cpassword"] = "Password don't match"
        }
        setError(error);
        return formValid;
    }
    const handleSubmit = () => {
        if (vaidation()) {
            const data = {
                userName: userData?.userName,
                email: userData?.email,
                password: userData?.password
            }
            const signUpData = getUserInfo() ? getUserInfo() : []
            const userNameMatch = signUpData?.filter((item) => item?.userName === userData?.userName)
            const emailMatch = signUpData?.filter((item) => item?.email === userData?.email)
            if (userNameMatch?.length > 0) {
                toast.error("Username already exists")
            } else if (emailMatch?.length > 0) {
                toast.error("Email already exists")
            } else {
                toast.success("Successfully Sign up")
                setUserInfo([...(signUpData), data])
            }
        }
    };

    return (
        <React.Fragment>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-96">
                    <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>

                    <div className="mb-4">
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-600">UserName</label>
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData?.email}
                            onChange={(e) => handelOnChange(e)}
                            className="mt-1 p-2 w-full border rounded"
                        />
                        <span className="text-xs text-red-500">{error["email"]}</span>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword?.new ? 'text' : 'password'}
                                name="password"
                                value={userData?.password}
                                onChange={(e) => handelOnChange(e)}
                                className="mt-1 p-2 w-full border rounded"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <FontAwesomeIcon
                                    icon={showPassword?.new ? faEyeSlash : faEye}
                                    onClick={() => handelPassword("new")}
                                    className="cursor-pointer text-gray-600"
                                />
                            </div>
                        </div>
                        <span className="text-xs text-red-500">{error["password"]}</span>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="cpassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showPassword?.old ? 'text' : 'password'}
                                name="cpassword"
                                value={userData?.cpassword}
                                onChange={(e) => handelOnChange(e)}
                                className="mt-1 p-2 w-full border rounded"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <FontAwesomeIcon
                                    icon={showPassword?.old ? faEyeSlash : faEye}
                                    onClick={() => handelPassword("old")}
                                    className="cursor-pointer text-gray-600"
                                />
                            </div>
                        </div>
                        <span className="text-xs text-red-500">{error["cpassword"]}</span>
                    </div>

                    <button onClick={() => handleSubmit()} className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SignUp;
