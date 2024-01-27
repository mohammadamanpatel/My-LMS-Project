import React, { useState } from 'react'
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { HomeLayout } from '../layouts/HomeLayout';
import { createAccount } from '../redux/slices/authSlice';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
export const SignUp = () => {
    const [signupDetails, setSignupDetails] = useState({
        email: '',
        fullName: '',
        password: '',
        avatar: ''
    });
    const [previewImage, setPreviewImage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleUserInput(event) {
        const { name, value } = event.target;
        setSignupDetails({
            ...signupDetails,
            [name]: value
        })
    }
    function handleImage(event) {
        event.preventDefault();
        const imageData = event.target.files[0];
        console.log("image data is=>", imageData);
        setSignupDetails({
            ...signupDetails,
            avatar: imageData
        })
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageData);
        fileReader.addEventListener('load', function () {
            console.log('this.result', this.result);
            setPreviewImage(this.result)
        })
    }
    async function onFormSubmit(e) {
        e.preventDefault();
        console.log("signupDetails=>", signupDetails);
        if (!signupDetails.email || !signupDetails.password || !signupDetails.fullName) {
            toast.error("Please fill all the details");
            return;
        }
        if (signupDetails.fullName.length < 5) {
            toast.error("Name should be atleast of 5 characters");
            return;
        }
        // if (!isEmail(signupDetails.email)) {
        //     toast.error("Invalid email provided");
        //     return;
        // }
        // if (!isValidPassword(signupDetails.password)) {
        //     toast.error("Invalid password provided, password should 6-16 character long with atleast a number and a special character");
        //     return;
        // }

        const formData = new FormData();
        formData.append("fullName", signupDetails.fullName);
        formData.append("email", signupDetails.email);
        formData.append("password", signupDetails.password);
        formData.append("avatar", signupDetails.avatar);


        const response = await dispatch(createAccount(formData));
        console.log(response);
        if (response?.payload?.data) {
            navigate("/");
        }
        setSignupDetails({
            email: '',
            fullName: '',
            password: '',
            avatar: ''
        });
        setPreviewImage("");
    }
    return (
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh] ">
                <form noValidate onSubmit={onFormSubmit} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-35 w-[30vw]">
                    <h1 className="text-2xl text-center font-bold">Registration Page</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage} />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>
                    <input
                        onChange={handleImage}
                        type="file"
                        className="hidden"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold ms-[-21.25rem]">Name</label>
                        <input
                            onChange={handleUserInput}
                            value={signupDetails.fullName}
                            required
                            type="text"
                            name="fullName"
                            className="bg-transparent px-2 py-1 border"
                            placeholder="enter your username..."
                            id="fullName" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold ms-[-21.25rem]">Email</label>
                        <input
                            onChange={handleUserInput}
                            value={signupDetails.email}
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
                            value={signupDetails.password}
                            type="password"
                            name="password"
                            className="bg-transparent px-2 py-1 border"
                            placeholder="enter your Password..."
                            id="password" />
                    </div>
                    <button className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg">
                        Create account
                    </button>
                    <p className="text-center">
                        Already have an account ? <Link to="/login" className="cusror-pointer text-accent">Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}
