
   
  export function Dropdown({value,setType}) {
    return (
        <div className="relative inline-block w-64 mb-7 mr-10">
        <label htmlFor="dropdown" className=" text-sm font-medium text-white">Action Type:</label>
        <select value={value} defaultValue={'All'} onChange={(e)=>setType(e.target.value)} id="dropdown" className=" w-full mt-1 p-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="All">All</option>
          <option value="settings">Settings</option>
          <option value="logout">Logout</option>
          <option value="login">Login</option>
          <option value="signup">Signup</option>
          <option value="delete">Delete</option>
        </select>
      </div>
      
    );
  }