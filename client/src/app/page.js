"use client";
import { useQuery } from "@apollo/client";
import { GET_STUDENTS } from "./student/queries";
import Link from "next/link";

export default function Home() {
  const { data } = useQuery(GET_STUDENTS);

  return (
    <div className="mt-20 flex justify-center items-center flex-col max-w-4xl mx-auto">
      <div className="flex justify-between items-center w-full">
        <span className="text-cyan-600 text-3xl font-extrabold text-center ">
          STUDENTS LIST
        </span>
        <Link href={"/student/add"}>
          <button className="bg-cyan-600 text-white rounded shadow px-3 py-0.5 cursor-pointer">
            Add Student
          </button>
        </Link>
      </div>

      {/* STUDENT TABLE */}
      <div className="overflow-x-auto max-w-4xl w-full mt-6 shadow-md rounded-md">
        <table className=" border border-gray-200 w-full rounded-md text-sm">
          <thead className="bg-gray-300 text-left">
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Roll No</th>
              <th className="px-4 py-2 border-b">Department</th>
            </tr>
          </thead>
          <tbody>
            {data?.getAllStudents.map((student, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{student.name}</td>
                <td className="px-4 py-2 border-b">{student.rollNo}</td>
                <td className="px-4 py-2 border-b">{student.dept}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
