import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import Head from "next/head";

import ModalAddSubTodo from "@/components/ModalAddSubTodo";

import {
  getAllChecklist,
  addToDo,
  deleteToDo,
  addSubToDo,
  getSubToDo,
} from "@/utils/api";

const poppinsMd = Poppins({ subsets: ["latin"], weight: "500" });

const Dashboard = () => {
  const router = useRouter();

  const [checkistData, setChecklistData] = useState([]);
  const [subCheckistData, setSubChecklistData] = useState([]);
  const [formData, setFormData] = useState({ name: "" });
  const [formDataSubTodo, setFormDataSubTodo] = useState({ itemName: "" });
  const [showDetail, setShowDetail] = useState({ id: "" });
  const [addSubData, setAddSubData] = useState({});

  const handleGetChecklist = async () => {
    const res = await getAllChecklist();
    setChecklistData(res.data);
  };

  const onOpenModalAddSubTodo = (e) => {
    setAddSubData(e);
    document.getElementById("my_modal_3").showModal();
  };

  const onCloseModalAddSubTodo = () => {
    document.getElementById("my_modal_3").close();
  };

  const handleDeleteTodo = async (todoId) => {
    const res = await deleteToDo(todoId);
    if (res.statusCode === 2300) {
      handleGetChecklist();
    } else {
      alert("Delete Todo Failed");
    }
  };

  const handlePostTodo = async () => {
    const res = await addToDo(formData);
    if (res.data) {
      setFormData({ name: "" });
      handleGetChecklist();
    } else {
      alert("Add Todo Failed");
    }
  };

  const handleGetSubTodo = async (todoId) => {
    const res = await getSubToDo(todoId);
    if (res.data) {
      setShowDetail({ id: todoId });
      setSubChecklistData(res.data);
    }
  };

  const handleAddSubTodo = async () => {
    const res = await addSubToDo(addSubData.id, formDataSubTodo);

    if (res.data) {
      setFormDataSubTodo({ itemName: "" });
      handleGetSubTodo(addSubData.id);
      onCloseModalAddSubTodo();
      setAddSubData({});
    }
  };

  useEffect(() => {
    handleGetChecklist();
  }, []);

  return (
    <>
      <Head>
        <title>Todo List App - Dashboard</title>
      </Head>
      <main
        className={`mx-auto md:w-[50vw] lg:w-[31vw] h-auto p-10 flex flex-col justify-center`}
      >
        <h5 className={`${poppinsMd.className} text-md text-center`}>
          Welcome to To Do App
        </h5>

        <div className="flex items-center justify-center gap-5 mt-4">
          <input
            type="text"
            placeholder="Add to do"
            value={formData.name}
            className="mt-5 w-full input input-bordered input-sm w-full max-w-xs rounded-md text-xs m-0"
            onChange={({ target }) => setFormData({ name: target.value })}
          />
          <button
            className="btn btn-sm bg-black text-white rounded-md mt-5 text-xs"
            onClick={handlePostTodo}
          >
            add
          </button>
        </div>

        <div className="flex flex-col gap-5 items-center justify-center mt-10">
          {checkistData.map((e, i) => (
            <div
              key={`list-todo-${i}`}
              className="w-full border border-gray-200 rounded-lg p-5 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <h5 className={`${poppinsMd.className}`}>{e.name}</h5>
                <div className="flex items-center gap-3">
                  <p
                    className="text-xs cursor-pointer underline"
                    onClick={() => handleGetSubTodo(e.id)}
                  >
                    detail
                  </p>
                  <p
                    className="text-xs cursor-pointer underline"
                    onClick={() => onOpenModalAddSubTodo(e)}
                  >
                    add Sub
                  </p>
                  <p
                    className="text-xs cursor-pointer underline"
                    onClick={() => handleDeleteTodo(e.id)}
                  >
                    delete
                  </p>
                  <input type="checkbox" />
                </div>
              </div>

              {showDetail.id === e.id && (
                <div className="mt-2">
                  <ul>
                    {subCheckistData?.map((d, f) => (
                      <li key={`list-sub-todo-${f}`} className="text-xs pt-1">
                        {d.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <ModalAddSubTodo
          data={addSubData}
          setForm={setFormDataSubTodo}
          dataForm={formDataSubTodo}
          submit={handleAddSubTodo}
        />
      </main>
    </>
  );
};

export default Dashboard;
