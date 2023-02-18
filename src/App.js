import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function FetchUsersButton({ isLoading, onClick }) {
  return (
    <div className="mb-4">
      To fetch the users data click below button!
      <Button variant="primary" disabled={isLoading} onClick={onClick}>
        {isLoading ? "Loading…" : "Fetch Users"}
      </Button>
    </div>
  );
}

function UsersTable({ users }) {
  return (
    <Table striped bordered hover size="sm" className="mt-4">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Company Name</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
            <td>{user.company.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function App() {
  const [usersData, setUsersData] = useState([]);
  const [status, setStatus] = useState("idle");

  const fetchUsersData = async () => {
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      setUsersData(data);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };


  return (
    <div className="d-flex flex-column align-items-center mt-5">
      {status === "idle" || status === "loading" ? (
        <FetchUsersButton isLoading={status === "loading"} onClick={fetchUsersData} />
      ) : (
        <>
          <h1 className="mb-4">Users list</h1>
          <UsersTable users={usersData} />
        </>
      )}
    </div>
  );
}

export default App;
