import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/users";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditId(null);
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({ name: "", email: "", role: "" });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const editUser = (user) => {
    setForm(user);
    setEditId(user._id);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🚀 User Management App</h2>

      {/* FORM */}
      <form className="row g-2 mb-4" onSubmit={handleSubmit}>
        <div className="col">
          <input
            className="form-control"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <input
            className="form-control"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <select
            className="form-select"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option>Buyer</option>
            <option>Seller</option>
            <option>Admin</option>
          </select>
        </div>

        <div className="col-auto">
          <button className="btn btn-primary">
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </form>

      {/* TABLE */}
      <table className="table table-bordered table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th width="150">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editUser(user)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;