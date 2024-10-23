import { deleteLogs } from "@/services";
import React from "react";

const LogTable = ({ logs, currentPage, totalPages, onPageChange, onDeleteLog }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      await onDeleteLog(id);
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Action Type
            </th>
            <th scope="col" className="px-6 py-3">
              TimeStamp
            </th>
            <th scope="col" className="px-6 py-3">
              User ID
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Additional Data
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{log.actionType}</td>
              <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="px-6 py-4">{log.userId}</td>
              <td className="px-6 py-4">{log.userRole}</td>
              <td className="px-6 py-4">
                {log.additionalData && (
                  <details>
                    <summary>View Details</summary>
                    <pre className="text-xs">{JSON.stringify(log.additionalData, null, 2)}</pre>
                  </details>
                )}
              </td>
              <td className="px-6 py-4 cursor-pointer" onClick={() => handleDelete(log._id)}>🗑️</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LogTable;
