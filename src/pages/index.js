"use client";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Dropdown } from "./components/DropDown";
import LogTable from "./components/LogTable";

import Datepickerr from "./components/datapicker";
import { useEffect, useState } from "react";
import { getLogs, logout, deleteLogs } from "@/services";
import { useRouter } from 'next/router';


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

  useEffect(() => {
    // This effect runs only on the client-side
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

      try {
        const data = await getLogs(params);
        console.log("data", data);
        if(data.status === 401){
          setIsAuthenticated(false);
          // Redirect to login page
          router.push('/login');
        }
        setLogs(data.logs);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching logs:", error);
        
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
          // Redirect to login page
          router.push('/login');
        }
        // Handle other errors (e.g., show error message to user)
      }
    };

    if (isAuthenticated) {
      fetchLogs();
    }
  }, [type, startDate, endDate, currentPage, isAuthenticated, router]);

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
      const response = await getLogs({ page, limit: 10 }); // Adjust limit as needed
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
      // After successful deletion, refetch the current page
      await fetchLogs(currentPage);
    } catch (error) {
      console.error('Error deleting log:', error);
      alert('Failed to delete log. Please try again.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center pr-10">
        <span>
          <Dropdown value={type} setType={setType} />
          <Datepickerr
            value={startDate}
            setdate={setStartDate}
            dateType="Start"
          />
          <Datepickerr value={endDate} setdate={setEndDate} dateType="End" />
        </span>
        <span className="text-lg"> {userName} </span>
        <span className="text-lg">Admin : {isAdmin ? "Yes" : "No"}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <LogTable 
        logs={logs} 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange}
        onDeleteLog={handleDeleteLog}
      />
    </>
  );
  
}

  
