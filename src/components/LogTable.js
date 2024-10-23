const LogTable = ({ logs }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Action Type</th>
          <th>User ID</th>
          {/* Add more headers as needed */}
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log._id}>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.actionType}</td>
            <td>{log.userId}</td>
            {/* Add more cells as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogTable;
