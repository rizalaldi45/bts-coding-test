import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import { useForm } from "react-hook-form";

import { loginUser } from "@/utils/api";

const poppins = Poppins({ subsets: ["latin"], weight: "300" });

export default function Home() {
  const {
    register,
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const handleLogin = async (data) => {
    const res = await loginUser(data);

    if (res.statusCode === 2110) {
      localStorage.setItem("user-auth", res.data.token)
      router.push("/dashboard");
    } else {
      alert("Login Failed Please Try Again");
    }
  };

  return (
    <>
      <Head>
        <title>Todo List App - Login</title>
      </Head>
      <main
        className={`${poppins.className} w-screen h-screen flex items-center justify-center`}
      >
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-[25vw] border border-gray-100 shadow rounded-md py-10 px-7 w-fit flex flex-col items-start"
        >
          <h5 className={`${poppins.className} text-lg`}>Login Page</h5>
          <input
            type="text"
            placeholder="input Username"
            className="mt-6 w-full input input-bordered input-sm w-full max-w-xs rounded-md text-xs"
            {...register("username", {
              required: "Username required" ?? "",
            })}
          />
          <input
            type="password"
            placeholder="Input Password"
            className="mt-5 w-full input input-bordered input-sm w-full max-w-xs rounded-md  text-xs"
            {...register("password", {
              required: "Password required" ?? "",
            })}
          />
          <p className="mt-5 text-xs">
            dont any have account ?{" "}
            <Link href="/register" className="hover:underline cursor-pointer">
              register here
            </Link>
          </p>
          <button className="btn btn-sm bg-black text-white rounded-md mt-5 text-xs">
            Login
          </button>
        </form>
      </main>
    </>
  );
}
