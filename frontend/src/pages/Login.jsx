import { useState } from "react";
import api from "../services/api";

function Login() {

  const [form,setForm] = useState({
    email:"",
    password:""
  });

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      const res =
      await api.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Success");

    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <form
      onSubmit={handleSubmit}
      className="shadow-lg p-8 w-96">

        <h2 className="text-2xl mb-5">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e)=>
          setForm({
            ...form,
            email:e.target.value
          })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e)=>
          setForm({
            ...form,
            password:e.target.value
          })}
        />

        <button
        className="bg-black text-white p-2 w-full">

          Login

        </button>

      </form>
    </div>
  );
}

export default Login;