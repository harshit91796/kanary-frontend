import { deleteLogs } from "@/services";
import React from "react";

const LogTable = ({ logs, currentPage, totalPages, onPageChange, onDeleteLog, onViewDetails }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      await onDeleteLog(id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-[#407165]">
          <thead className="text-xs text-white uppercase bg-[#407165]">
            <tr>
              <th scope="col" className="px-6 py-3">Action Type</th>
              <th scope="col" className="px-6 py-3">User Name</th>
              <th scope="col" className="px-6 py-3">TimeStamp</th>
              <th scope="col" className="px-6 py-3">User ID</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Additional Data</th>
              <th scope="col" className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="bg-white border-b hover:bg-[#b4d2a6]">
                <td className="px-6 py-4">{log.actionType}</td>
                <td className="px-6 py-4">{log.userName}</td>
                <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="px-6 py-4">{log.userId}</td>
                <td className="px-6 py-4">{log.userRole}</td>
                <td className="px-6 py-4">
                  {log.additionalData && (
                    <button 
                    onClick={() => onViewDetails(log)}
                    className="text-[#407165] font-bold hover:text-[#305753] mr-2"
                  >
                    View
                  </button>
                  )}
                </td>
                <td className="px-6 py-4">

                
                  <button 
                    onClick={() => handleDelete(log._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-4 bg-gray-50">
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#407165] text-white rounded disabled:bg-gray-300 transition duration-300 ease-in-out"
        >
          Previous
        </button>
        <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-[#407165] text-white rounded disabled:bg-gray-300 transition duration-300 ease-in-out"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LogTable;
