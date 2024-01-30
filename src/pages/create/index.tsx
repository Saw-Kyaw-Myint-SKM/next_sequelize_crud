import React, { useState } from "react";
import Layout from "@/components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function creat() {
  const router = useRouter();
  const form = useForm<FormValue>();
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;
  const [validationErrors, setValidationErrors] = useState(null);

  type FormValue = {
    title: string;
    description: string;
  };

  const createPost = async (data: FormValue) => {
    await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res: any) => {
        if (res.status == 200) {
          router.push("/");
        }
        if (res.status == 400) {
          const errors = await res.json();
          console.log(errors);
          setValidationErrors(errors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout>
      <form action="/api/posts" onSubmit={handleSubmit(createPost)} noValidate>
        <div
          className={`flex min-h-screen flex-col items-center w-full jutsify-between pt-28`}
        >
          <div className="editor mx-auto w-10/12 flex flex-col bg-white rounded text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
            <div className="heading text-center font-bold text-2xl mb-4 text-gray-800">
              New Post
            </div>
            <input
              className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
              placeholder="Title"
              type="text"
              {...register("title")}
            />
            <p className="text-red-500">{validationErrors?.title?._errors}</p>
            <textarea
              className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
              placeholder="Describe everything about this post here"
              {...register("description")}
            ></textarea>
            <p className="text-red-500">
              {validationErrors?.description?._errors}
            </p>
            {/* <!-- icons --> */}
            <div className="icons flex text-gray-500 m-2">
              <svg
                className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <svg
                className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              <div className="count ml-auto text-gray-400 text-xs font-semibold">
                0/300
              </div>
            </div>
            {/* <!-- buttons --> */}
            <div className="buttons flex">
              <Link
                href={"/"}
                className="btn border shadow rounded border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
              >
                Cancel
              </Link>
              <button className="btn border shadow rounded-md hover:bg-indigo-600 border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}
