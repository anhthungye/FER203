import React from "react";
import { ListGroup } from "react-bootstrap";

const NameList = ({ names }) => {
  return (
    <div className="mb-4">
      <h4 className="mb-3">Name List</h4>
      <ListGroup>
        {names.map((name, index) => (
          <ListGroup.Item key={index}>{name}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default NameList;
