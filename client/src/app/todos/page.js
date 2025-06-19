"use client";
import { gql, useQuery } from "@apollo/client";
import { GET_ALL_TODOS } from "./queries";

export default function Todos() {
  const { data } = useQuery(GET_ALL_TODOS);

  return (
    <div className="flex justify-center items-center flex-col mt-20">
      <h1 className="text-cyan-600 text-2xl font-bold text-center ">
        TODOS LIST
      </h1>

      {/* STUDENT TABLE */}
      <div className="overflow-x-auto mt-6 shadow-md rounded-md">
        <table className="min-w-3xl border border-gray-200 rounded-md text-sm">
          <thead className="bg-gray-300 text-left">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Completed</th>
            </tr>
          </thead>
          <tbody>
            {data?.getAllTodos.map((todo, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{todo.id}</td>
                <td className="px-4 py-2 border-b">{todo.title}</td>
                <td
                  className={`px-4 py-2 font-bold border-b border-black ${
                    todo.completed
                      ? "text-green-600 font-semibold"
                      : "text-red-500"
                  }`}
                >
                  {todo.completed ? "Completed" : "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
