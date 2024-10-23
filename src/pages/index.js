"use client";


import { Inter } from "next/font/google";

import { Dropdown } from "./components/DropDown";
import LogTable from "./components/LogTable";

import Datepickerr from "./components/datapicker";
import { useEffect, useState } from "react";
import { getLogs, logout, deleteLogs, exportLogs } from "@/services";
import { useRouter } from 'next/router';
import { Close } from "@mui/icons-material";
import Modal from "./components/Modal"; // You'll need to create this component

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [type, setType] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logs, setLogs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    
    setUserName(sessionStorage.getItem('name') || "");
    setIsAdmin(sessionStorage.getItem('isAdmin') === 'true');
    setIsAuthenticated(sessionStorage.getItem('token') !== null);
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      const params = {
        page: currentPage,
        limit: 10,
      };

      if (type !== "All") params.actionType = type;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (searchTerm) params.objectId = searchTerm;
      try {
        const data = await getLogs(params);
        console.log("data", data);
        if(data.status === 401){
          setIsAuthenticated(false);
          
          router.push('/login');
        }
        setLogs(data.logs);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching logs:", error);
        
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
      
          router.push('/login');
        }
        
      }
    };

    if (isAuthenticated) {
      fetchLogs();
    }
  }, [type, startDate, endDate, currentPage, isAuthenticated, router, searchTerm]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await getLogs({objectId: searchTerm});
    console.log("response", response);
    setLogs(response.logs);
    setTotalPages(response.totalPages);
  };

  if (!isAuthenticated) {
    return <div>Please log in to view this page.</div>;
  }

  const handleLogout = async () => {
    await logout();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('isAdmin');
    router.push('/login');
  };

  const fetchLogs = async (page) => {
    setIsLoading(true);
    try {
      const response = await getLogs({ page, limit: 10 }); 
      setLogs(response.logs);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteLog = async (id) => {
    try {
      await deleteLogs(id);
      
      await fetchLogs(currentPage);
    } catch (error) {
      console.error('Error deleting log:', error);
      alert('Failed to delete log. Please try again.');
    }
  };

  const handleExport = async (format) => {
    try {
      await exportLogs(format);
    } catch (error) {
      console.error('Failed to export logs:', error);
      
    }
  };

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#b4d2a6] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#407165] mb-4 md:mb-0">Log Management Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-lg text-[#407165]">{userName}</span>
              <span className="text-lg text-[#407165]">Admin: {isAdmin ? "Yes" : "No"}</span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-[#407165] text-white rounded-md hover:bg-[#305753] transition duration-300 ease-in-out"
              >
                Logout
              </button>
            </div>
          </div>

        <form onSubmit={handleSearch} className="flex w-[200px] gap-2 md:w-auto">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search by userName, logId, userId" 
            className="flex-grow bg-[#1F2937] w-[200px] md:w-auto px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#407165]" 
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="px-2 py-2 text-[#407165]">
              <Close />
            </button>
          )}
          <button 
            type="submit" 
            className="px-4 py-2 bg-[#407165] text-white rounded-r-md hover:bg-[#305753] transition duration-300 ease-in-out"
          >
            Search
          </button>
        </form>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Dropdown value={type} setType={setType} />
              <Datepickerr value={startDate} setdate={setStartDate} dateType="Start" />
              <Datepickerr value={endDate} setdate={setEndDate} dateType="End" />
            </div>
           
            <div className="flex space-x-2">
              <button
                onClick={() => handleExport('csv')}
                className="px-4 py-2 bg-[#407165] text-white rounded-md hover:bg-[#305753] transition duration-300 ease-in-out"
              >
                Export CSV
              </button>
              <button
                onClick={() => handleExport('json')}
                className="px-4 py-2 bg-[#407165] text-white rounded-md hover:bg-[#305753] transition duration-300 ease-in-out"
              >
                Export JSON
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-t-2 border-b-2 border-[#407165]"></div>
          </div>
        ) : (
          <LogTable 
            logs={logs} 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange}
            onDeleteLog={handleDeleteLog}
            onViewDetails={handleViewDetails}
          />
        )}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {selectedLog && (
            <div className="text-[#407165]">
            <h2 className="text-xl font-bold mb-4">Log Details</h2>
              <p><strong>Action Type:</strong> {selectedLog.actionType}</p>
              <p><strong>User Name:</strong> {selectedLog.userName}</p>
              <p><strong>User ID:</strong> {selectedLog.userId}</p>
              <p><strong>Timestamp:</strong> {new Date(selectedLog.timestamp).toLocaleString()}</p>
              <p><strong>User Role:</strong> {selectedLog.userRole}</p>
              {selectedLog.additionalData && (
                <div>
                  <strong>Additional Data:</strong>
                  <pre className="mt-2 p-2 bg-[#b4d2a6] rounded overflow-x-auto  text-[#407165]">
                    {JSON.stringify(selectedLog.additionalData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
