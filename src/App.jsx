import React, { useEffect, useState } from "react";
import { SquareCheck } from "lucide-react";
import { Plus } from "lucide-react";
import clickSound from "./ClickAudio/click.wav";
import deleteSound from "./ClickAudio/deleteClick.wav";

const App = () => {

  const clickAudio= new Audio(clickSound)
  const deleteAudio = new Audio(deleteSound)

  const [value, setvalue] = useState("");
  const [task, setTask] = useState(() => {
    const data = localStorage.getItem("task");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  function removeTasks(idx) {
    let copyTask = [...task];
    copyTask.splice(idx, 1);
    setTask(copyTask);
  }

  function doneTasks(idx) {
    let copyTask = [...task];
    copyTask[idx].completed = !copyTask[idx].completed;
    setTask(copyTask);
  }

  function renderTasks() {
    let copyTask = [...task];
    copyTask.push({ value, completed: false });
    setvalue("");
    setTask(copyTask);
  }

  return (
    <div className="h-screen bg-black">

      <header className="">
        <h1 className="bg-yellow-100 px-4 py-4 leading-[0.9] text-4xl flex items-end justify-center gap-2">
          <SquareCheck /> Todo
        </h1>
      </header>
      <div className=" py-8 px-7 gap-2 flex justify-center">
        {/* Input Section */}
        <input
          className="bg-white p lg:px-50 sm:px-20 py-3 rounded-xl border-2"
          value={value}
          onKeyDown={(e) => {
            console.log(e);
            if (e.key === "Enter") {
              if (value.trim()) {
                renderTasks();
                clickAudio.play()
              }
            }
          }}
          onChange={(e) => {
            setvalue(e.target.value);
          }}
          type="text"
        />
        <button
          onClick={() => {

            if (value.trim()) {
              renderTasks();
              clickAudio.play()
            }
          }}
          className=" hover:bg-yellow-500 cursor-pointer active:scale-95 active:bg-yellow-600 border-2 px-3 bg-amber-300 border-none py-1 "
        >
          <Plus />
        </button>
      </div>
      {/* Render Section */}

      <div className="flex flex-col bg-yellow-300 max-h-max  items-center  ">
        {task.map((item, idx) => {
          return (
            <div
              key={idx}
              className="bg-white border-2 m-3 overflow-y-auto flex gap-3 px-4 py-3 h-1/2 w-2/3 justify-between "
            >
              <div className="wrapper flex gap-2 items-center">
                <input
                  checked={item.completed}
                  onChange={() => {
                    doneTasks(idx);
                  }}
                  type="checkbox"
                />
                <p
                  className={`${item.completed ? "line-through text-gray-400 text-[18px]" : "text-[18px] text-black "}`}
                >
                  {item.value}
                </p>
              </div>
              <button
                onClick={(e) => {
                  removeTasks(idx);
                  deleteAudio.play()
                }}
                className="px-2 py-1 bg-red-500 border-2 border-red-500 rounded-xl text-sm hover:cursor-pointer active:scale-95"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
