"use client";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_NEW_STUDENT, GET_STUDENTS } from "../queries";
import { useRouter } from "next/navigation";

export default function AddStudent() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [dept, setDept] = useState("");

  const [addStudent] = useMutation(ADD_NEW_STUDENT, {
    refetchQueries: [{ query: GET_STUDENTS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !rollNo || !dept) {
        return alert("All fields are required!");
      }

      await addStudent({
        variables: {
          name,
          rollNo,
          dept,
        },
      });

      router.push("/");
      alert("Student added successfully!");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen -mt-28">
      <div className="w-full max-w-2xl px-10 py-20 bg-gray-50 shadow-md rounded-md border border-gray-300">
        <h1 className="text-4xl font-bold mb-6 text-center">Add Student</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* roll no */}
          <div>
            <label
              htmlFor="rollNo"
              className="block text-sm font-medium text-gray-700"
            >
              Roll Number
            </label>
            <input
              type="text"
              id="rollNo"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* dept */}
          <div>
            <label
              htmlFor="dept"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <input
              type="text"
              id="dept"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
