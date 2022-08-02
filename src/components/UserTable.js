// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Button } from "@mui/material";
import React, { useState, Fragment, useRef } from "react";
import { nanoid } from "nanoid";
import "../styles/Table.css";
import data from "../mockUserData.json";
import ReadOnlyRow from "./common/ReadOnlyRow";
import EditableRow from "./common/EditableRow";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

function UserTable(props) {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    //Update
    nameProduct: "",
  });
  const idProductRef = useRef();

  const [deleteId, setDeleteId] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const areUSureDelete = (choose) => {
    if (choose) {
      const newContacts = [...contacts];

      const index = contacts.findIndex((contact) => contact.id === deleteId);

      newContacts.splice(index, 1);

      setContacts(newContacts);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    // event.preventDefault();
    setModalVisible(false);
    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };
  const handleDelete = (id) => {
    //Update
    const index = contacts.findIndex((contact) => contact.id === id);
    setDeleteId(id);
    console.log("Reached in handleDelete");

    handleDialog(
      "Are you sure you want to delete?",
      true,
      contacts[index].fullName
    );
    idProductRef.current = id;
  };
  const handleDialog = (message, isLoading, nameProduct) => {
    console.log("Reached in handleDialog");
    setDialog({
      message,
      isLoading,
      //Update
      nameProduct,
    });
  };
  return (
    <>
      <Navbar />

      <div style={{ backgroundColor: "#a8b8d0", marginTop: 10 }}>
        <Button
          onClick={() => setModalVisible(true)}
          variant="primary"
          size="lg"
          style={{ marginLeft: "90%", marginTop: 10 }}
        >
          Add User
        </Button>
        <div className="app-container">
          <form onSubmit={handleEditFormSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <Fragment>
                    {editContactId === contact.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        contact={contact}
                        tableType={"Users"}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        handleDelete={handleDelete}
                        areUSureDelete={areUSureDelete}
                        dialog={dialog}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
          <Modal
            size="lg"
            show={modalVisible}
            // onHide={() => setLgShow(false)}
            // aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header>
              <Modal.Title id="example-modal-sizes-title-lg">
                Add User
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label size="lg">Name</Form.Label>
              <Form.Control
                type="text"
                id="fulname"
                name="fullName"
                // aria-describedby="passwordHelpBlock"
                size="lg"
                style={{ marginBottom: 10 }}
                onChange={handleAddFormChange}
              />
              <Form.Label size="lg">Address</Form.Label>
              <Form.Control
                type="text"
                id="address"
                name="address"
                // aria-describedby="passwordHelpBlock"
                size="lg"
                style={{ marginBottom: 10 }}
                onChange={handleAddFormChange}
              />
              <Form.Label size="lg">Phone</Form.Label>
              <Form.Control
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                aria-describedby="passwordHelpBlock"
                size="lg"
                style={{ marginBottom: 10 }}
                onChange={handleAddFormChange}
              />
              <Form.Label size="lg">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                aria-describedby="passwordHelpBlock"
                size="lg"
                style={{ marginBottom: 10 }}
                onChange={handleAddFormChange}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setModalVisible(false)}
              >
                Close
              </Button>
              <Button
                type="submit"
                size="lg"
                variant="primary"
                onClick={() => handleAddFormSubmit()}
              >
                Save changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserTable;
