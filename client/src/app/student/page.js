"use client";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DELETE_STUDENT, GET_STUDENTS } from "./queries";

export default function Students() {
  const router = useRouter();
  const { data } = useQuery(GET_STUDENTS);

  const [deleteStudent] = useMutation(DELETE_STUDENT, {
    refetchQueries: [{ query: GET_STUDENTS }],
  });

  const handleDownload = () => {
    const headers = ["#", "Name", "RollNo", "Department"];
    const rows = data?.getAllStudents.map((std, index) => [
      index + 1,
      std.name,
      std.rollNo,
      std.dept,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (rollNo) => {
    try {
      await deleteStudent({ variables: { rollNo: rollNo } });
      alert("Student deleted successfully!");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="mt-20 flex justify-center items-center flex-col max-w-[95%] md:max-w-5xl mx-auto">
      <div className="flex justify-between items-end  w-full">
        <span className="text-cyan-600 text-sm  md:text-3xl font-extrabold text-center ">
          STUDENTS LIST
        </span>
        <div>
          <button
            onClick={handleDownload}
            className="bg-green-600 mr-5 hover:bg-green-500 text-white rounded shadow px-3 py-0.5 cursor-pointer"
          >
            <span className="block md:hidden">⬇</span>
            <span className="hidden md:block">&#x2B07; Download</span>
          </button>
          <Link href={"/student/add"}>
            <button className="bg-cyan-600 hover:bg-cyan-500 text-white rounded shadow px-3 py-0.5 cursor-pointer">
              <span className="block md:hidden">Add</span>
              <span className="hidden md:block">+ Add Student</span>
            </button>
          </Link>
        </div>
      </div>

      {/* STUDENT TABLE */}
      <div className="overflow-x-auto max-w-5xl w-full mt-6 shadow-md rounded-md">
        <table className=" border border-gray-200 w-full rounded-md text-xs">
          <thead className="bg-gray-300  text-left">
            <tr>
              <th className="px-4 py-2 border-b text-sm ">#</th>
              <th className="px-4 py-2 border-b text-sm">Name</th>
              <th className="px-4 py-2 border-b text-sm">Roll No</th>
              <th className="px-4 py-2 border-b text-sm">Department</th>
              <th className="px-4 py-2 border-b text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.getAllStudents.map((student, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{idx + 1}</td>
                <td className="px-4 py-2 border-b">{student.name}</td>
                <td className="px-4 py-2 border-b">{student.rollNo}</td>
                <td className="px-4 py-2 border-b">{student.dept}</td>
                <td className="px-4 py-2 border-b">
                  <div>
                    <span
                      onClick={() => handleDelete(student.rollNo)}
                      className="bg-red-600 text-white py-0.5 px-2 rounded cursor-pointer"
                    >
                      Delete
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
