# Kanary Log Management System

## Description
Kanary is a log management system that allows users to view, filter, and export logs. It provides a user-friendly interface for managing and analyzing log data.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/kanary-frontend.git
   ```

2. Navigate to the project directory:
   ```
   cd kanary-frontend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env.local` file in the root directory and add your environment variables:
   ```
   NEXT_PUBLIC_API_URL=your_backend_api_url
   ```

5. Run the development server:
   ```
   npm run dev
   ```

## Features

- User authentication (login/signup)
- View logs in a tabular format
- Filter logs by action type, date range, and search term
- Export logs to CSV or JSON format
- Pagination for log results
- Responsive design for mobile and desktop

## Main Components and Functions

### Pages

1. `pages/index.js`: Main dashboard
   - `handleLogout()`: Logs out the user
   - `handleSearch()`: Filters logs based on search term
   - `handleExport()`: Exports logs to CSV or JSON
   - `handlePageChange()`: Changes the current page of logs
   - `handleDeleteLog()`: Deletes a specific log
   - `handleViewDetails()`: Opens a modal with detailed log information

2. `pages/login/index.js`: Login page
   - `handleSubmit()`: Handles user login

3. `pages/signup/index.js`: Signup page
   - `handleSubmit()`: Handles user registration

### Components

1. `components/LogTable.jsx`: Displays logs in a table format
   - Props: `logs`, `currentPage`, `totalPages`, `onPageChange`, `onDeleteLog`, `onViewDetails`

2. `components/Dropdown.jsx`: Dropdown for selecting action type filter
   - Props: `value`, `setType`

3. `components/Datapicker.jsx`: Date picker for selecting date range
   - Props: `value`, `setdate`, `dateType`

4. `components/Modal.jsx`: Modal for displaying detailed log information
   - Props: `isOpen`, `onClose`, `children`

### Services

`services.js`: Contains API call functions
- `getLogs()`: Fetches logs from the backend
- `login()`: Handles user login
- `logout()`: Handles user logout
- `deleteLogs()`: Deletes a specific log
- `signup()`: Handles user registration
- `exportLogs()`: Exports logs to CSV or JSON format

## Technologies Used

- Next.js
- React
- Tailwind CSS
- Axios for API calls
- React Icons

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
