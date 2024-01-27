import React, { useState } from 'react'
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { HomeLayout } from '../layouts/HomeLayout';
import { createAccount } from '../redux/slices/authSlice';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
export const Login = () => {
    const [loginDetails, setloginDetails] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleUserInput(event) {
        const { name, value } = event.target;
        setloginDetails({
            ...loginDetails,
            [name]: value
        })
    }
    // function to login
    const handleLogin = async (event) => {
        event.preventDefault();

        // checking the empty fields
        if (!loginDetails.email || !loginDetails.password) {
            toast.error("Please fill all the fields");
            return;
        }

        // calling login action
        const res = await dispatch(login(loginDetails));
        console.log("response of login",res);
        // redirect to home page if true
        if (res?.payload?.success) navigate("/");

        // clearing the login inputs
        setloginDetails({
            email: "",
            password: "",
        });
    };
    return (
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh] ">
                <form noValidate onSubmit={handleLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-35 w-[30vw]">
                    <h1 className="text-2xl text-center font-bold">Login Page</h1>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold ms-[-21.25rem]">Email</label>
                        <input
                            onChange={handleUserInput}
                            value={loginDetails.email}
                            required
                            type="text"
                            name="email"
                            className="bg-transparent px-2 py-1 border"
                            placeholder="enter your Email..."
                            id="email" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold ms-[-21.25rem]">Password</label>
                        <input
                            required
                            onChange={handleUserInput}
                            value={loginDetails.password}
                            type="password"
                            name="password"
                            className="bg-transparent px-2 py-1 border"
                            placeholder="enter your Password..."
                            id="password" />
                    </div>
                    <button className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg">
                        Login
                    </button>
                    <p className="text-center">
                        Dont have an account ? <Link to="/signup" className="cusror-pointer text-accent">Sign Up</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}
