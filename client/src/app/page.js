"use client";
import { useQuery } from "@apollo/client";
import { GET_STUDENTS } from "./student/queries";

export default function Home() {
  const { data } = useQuery(GET_STUDENTS);

  return (
    <div className="mt-20 flex justify-center items-center flex-col">
     
      <h1 className="text-cyan-600 text-2xl font-bold text-center ">
        STUDENTS LIST
      </h1>

      {/* STUDENT TABLE */}
      <div className="overflow-x-auto mt-6 shadow-md rounded-md">
        <table className="min-w-3xl border border-gray-200 rounded-md text-sm">
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
