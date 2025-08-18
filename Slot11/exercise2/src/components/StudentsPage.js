import React, { useState, useMemo } from "react";
import { Container } from "react-bootstrap";
import { students as studentData } from "../data/students";
import Filters from "./Filters";
import SortDropdown from "./SortDropdown";
import StudentGrid from "./StudentGrid";
import StudentDetailModal from "./StudentDetailModal";

function StudentsPage({ quickSearch }) {
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredAndSorted = useMemo(() => {
    let result = [...studentData];

    // 🔍 Quick search (từ Navbar)
    if (quickSearch) {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(quickSearch.toLowerCase())
      );
    }

    // 🔍 Search trong Filters (tên + email)
    if (search) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter theo tuổi
    if (ageFilter === "<=20") result = result.filter((s) => s.age <= 20);
    if (ageFilter === "21-25") result = result.filter((s) => s.age >= 21 && s.age <= 25);
    if (ageFilter === ">25") result = result.filter((s) => s.age > 25);

    // Filter avatar
    if (hasAvatar) result = result.filter((s) => s.avatar);

    // Sort
    if (sortBy === "age-asc") result.sort((a, b) => a.age - b.age);
    if (sortBy === "age-desc") result.sort((a, b) => b.age - a.age);
    if (sortBy === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "name-desc") result.sort((a, b) => b.name.localeCompare(a.name));

    return result;
  }, [search, quickSearch, ageFilter, hasAvatar, sortBy]);

  return (
    <Container className="my-4">
      <Filters
        search={search}
        setSearch={setSearch}
        ageFilter={ageFilter}
        setAgeFilter={setAgeFilter}
        hasAvatar={hasAvatar}
        setHasAvatar={setHasAvatar}
      />
      <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
      <StudentGrid
        students={filteredAndSorted}
        onView={(student) => {
          setSelectedStudent(student);
          setShowModal(true);
        }}
      />
      <StudentDetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        student={selectedStudent}
      />
    </Container>
  );
}

export default StudentsPage;
