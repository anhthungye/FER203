import React from "react";

function CourseList() {
  const courses = ["React", "ReactNative", "NodeJs"];

  return (
    <div style={{ margin: "20px", fontFamily: "Arial" }}>
      <h1>Course names</h1>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div>
      <CourseList />
    </div>
  );
}

export default App;
