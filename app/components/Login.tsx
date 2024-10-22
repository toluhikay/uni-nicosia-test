"use client";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../common/Loader";

const Login = () => {
  const { login, user } = useAuthStore();
  const navigate = useRouter();
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    if (user?.email) {
      navigate.push("/dashboard");
    } else {
      setLoading(false); // Stop loading when we know user is not authenticated
    }
  }, [navigate, user]);

  const [loginParams, setLoginParams] = useState({ fullName: "", email: "" });
  const handleSumbit = (e: FormEvent) => {
    e.preventDefault();
    if (loginParams.fullName === "" && loginParams.email === "") {
      toast.error("please fill in the forms");
      return;
    }
    login({ fullName: loginParams.fullName, email: loginParams.email });
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full bg-primaryBlack flex flex-col justify-center items-center">
      <form className="w-[35rem] bg-primary p-3 max-w-[90%] flex flex-col gap-3 rounded" action="" onSubmit={handleSumbit}>
        <div className="mb-4 flex flex-col justify-center items-center text-center text-primaryBlack gap-2">
          <p className="text-white font-semibold text-2xl">Login</p>
          <p className="text-gray-600 text-xs w-[80%]">This is not a real world login just some make shift stuff to simulate a real database, don't worry every information is stored on your pc</p>
        </div>
        <input
          className="w-full bg-inherit border border-gray-700 rounded outline-none p-2 placeholder:text-gray-600"
          type="text"
          placeholder="Enter your full name"
          onChange={(e) => {
            setLoginParams({ ...loginParams, fullName: e.target.value });
          }}
        />
        <input
          className="w-full bg-inherit border border-gray-700 rounded outline-none p-2 placeholder:text-gray-600"
          type="mail"
          placeholder="Enter your email"
          onChange={(e) => {
            setLoginParams({ ...loginParams, email: e.target.value });
          }}
        />

        <div className="mt-3">
          <button className="w-full p-3 bg-primaryBlack rounded text-white">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
