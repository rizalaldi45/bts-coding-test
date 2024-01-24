import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import { useForm } from "react-hook-form";

import { registerUser } from "@/utils/api";

const poppins = Poppins({ subsets: ["latin"], weight: "300" });

const Register = () => {
  const {
    register,
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const handleRegister = async (data) => {
    const res = await registerUser(data);

    if (res.statusCode === 2000) {
        router.push('/')
    } else {
        alert('Register Failed Please Try Again')
    }
  };

  return (
    <>
      <Head>
        <title>Todo List App - Register</title>
      </Head>
      <main
        className={`${poppins.className} w-screen h-screen flex items-center justify-center`}
      >
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="w-[25vw] border border-gray-100 shadow rounded-md py-10 px-7 w-fit flex flex-col items-start"
        >
          <h5 className={`${poppins.className} text-lg`}>Register Page</h5>
          <input
            type="text"
            placeholder="Input Email"
            className="mt-6 w-full input input-bordered input-sm w-full max-w-xs rounded-md text-xs"
            {...register("email", {
              required: "Email required" ?? "",
            })}
          />
          <input
            type="text"
            placeholder="input Username"
            className="mt-5 w-full input input-bordered input-sm w-full max-w-xs rounded-md text-xs"
            {...register("username", {
              required: "Username required" ?? "",
            })}
          />
          <input
            type="password"
            placeholder="Input Password"
            className="mt-5 w-full input input-bordered input-sm w-full max-w-xs rounded-md text-xs"
            {...register("password", {
              required: "Password required" ?? "",
            })}
          />
          <p className="mt-5 text-xs text-right">
            already have account ?{" "}
            <Link href="/" className="hover:underline cursor-pointer">
              Login here
            </Link>
          </p>
          <button className="btn btn-sm bg-black text-white rounded-md mt-5 text-xs">
            Register
          </button>
        </form>
      </main>
    </>
  );
}

export default Register