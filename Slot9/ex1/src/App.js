import React from "react";
import UserForm from "./components/UserForm";

function App() {
  const handleFormSubmit = (data) => {
    console.log("Dữ liệu hợp lệ:", data);
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <h1 className="text-center mb-4 text-primary fw-bold">
          Form Đăng Ký
        </h1>
        <UserForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}

export default App;