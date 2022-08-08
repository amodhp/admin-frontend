// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Button } from "@mui/material";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { nanoid } from "nanoid";
import "../styles/Table.css";
import data from "../mockAssetData.json";
import ReadOnlyRow from "./common/ReadOnlyRow";
import EditableRow from "./common/EditableRow";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AssetsTable(props) {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    assetName: "",
    category: "",
    categoryId: "",
    assetId: "",
  });

  const [editFormData, setEditFormData] = useState({
    assetName: "",
    category: "",
    categoryId: "",
    assetId: "",
  });
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    //Update
    nameProduct: "",
  });
  const idProductRef = useRef();

  const [deleteId, setDeleteId] = useState();

  const [DATA, setDATA] = useState([]);

  // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…TUwfQ.n5LOBVdeoqUgML6uazFckJDHKPx1PoOmMp_omTS6b_E"
  const accessToken = sessionStorage.getItem("token");
  useEffect(() => {
    getAssetsData(accessToken);
  }, []);

  const getAssetsData = (accessToken) => {
    // const params = JSON.stringify({
    //   username: username,

    //   password: password,
    // });

    axios
      .get("http://192.168.56.1:3000/admin/assets", {
        headers: {
          "access-token": `${accessToken}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setDATA(response.data);
        console.log("get assets");
        // history.push("/users");
        // navigate('/assets')
      })

      .catch(function (error) {
        console.log(accessToken);
        console.log(error, "Error Assets");
        // alert("Oops! Wrong Password or Username!");
      });
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      // handleDeleteClick(contact)
      // setContacts(contacts.filter((contact) => contact.id !== idProductRef.current));
      const newContacts = [...contacts];

      const index = contacts.findIndex(
        (contact) => contact.assetId === deleteId
      );

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

    const fieldName = event.target.getAttribute("assetName");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      assetName: addFormData.assetName,
      category: addFormData.category,
      categoryId: addFormData.phoneNumber,
      assetId: addFormData.assetId,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      assetName: editFormData.assetName,
      category: editFormData.category,
      categoryId: editFormData.phoneNumber,
      assetId: editFormData.assetId,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex(
      (contact) => contact.assetId === editContactId
    );

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      assetName: contact.assetName,
      category: contact.category,
      categoryId: contact.categoryId,
      assetId: contact.assetId,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex(
      (contact) => contact.assetId === contactId
    );

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };
  const handleDelete = (id) => {
    //Update
    const index = contacts.findIndex((contact) => contact.assetId === id);
    setDeleteId(id);
    console.log("Reached in handleDelete");

    handleDialog(
      "Are you sure you want to delete?",
      true,
      contacts[index].assetName
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

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  return (
    <>
      <Navbar />
      <div>
        <button
          onClick={() => setModalVisible(true)}
          style={{
            background: "blue",
            color: "white",
            cursor: "pointer",
            // width: 100,
            marginLeft: "85%",
            border: 0,
            padding: 15,
            borderRadius: 10,
          }}
          type="submit"
        >
          Add Asset
        </button>
      </div>
      <div className="app-container">
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Asset</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {DATA.map((item) => (
                <Fragment>
                  {1 == 2 ? (
                    {
                      /* editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  )  */
                    }
                  ) : (
                    <ReadOnlyRow
                      item={item}
                      tableType={"Assets"}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                      handleDelete={handleDelete}
                      areUSureDelete={areUSureDelete}
                      // message = {message}
                      dialog={dialog}
                      // isLoading = {isLoading}
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
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Label size="lg">Role</Form.Label>
            <Form.Control
              type="text"
              id="address"
              name="address"
              // aria-describedby="passwordHelpBlock"
              size="lg"
              style={{ marginBottom: 10 }}
              onChange={(e) => setRole(e.target.value)}
            />
            <Form.Label size="lg">Phone</Form.Label>
            <Form.Control
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              aria-describedby="passwordHelpBlock"
              size="lg"
              style={{ marginBottom: 10 }}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Form.Label size="lg">Email</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              aria-describedby="passwordHelpBlock"
              size="lg"
              style={{ marginBottom: 10 }}
              onChange={(e) => setEmail(e.target.value)}
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
              onClick={() => handleAddFormSubmit(accessToken)}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
}

export default AssetsTable;
