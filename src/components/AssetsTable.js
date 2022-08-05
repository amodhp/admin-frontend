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

  const [DATA,setDATA]=useState([])

  // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…TUwfQ.n5LOBVdeoqUgML6uazFckJDHKPx1PoOmMp_omTS6b_E"
  const accessToken=sessionStorage.getItem('token')
  useEffect(() => {
    getAssetsData(accessToken);
  },[]);

  const getAssetsData = (accessToken) => {
    // const params = JSON.stringify({
    //   username: username,

    //   password: password,
    // });

    axios
      .get("http://192.168.56.1:3000/admin/assets", {
        headers: {
          'access-token':`${accessToken}`
        },
      })
      .then(function (response) {
        console.log(response.data);
        setDATA(response.data)
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
  return (
    <>
      <Navbar />
      <div className="insert-user-container">
        {/* <h2>Add an Asset</h2> */}
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="assetName"
            required="required"
            placeholder="Asset"
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="category"
            required="required"
            placeholder="Category"
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="categoryid"
            required="required"
            placeholder="Category ID"
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="assetid"
            required="required"
            placeholder="Asset ID"
            onChange={handleAddFormChange}
          />
          <button
            
            style={{
              background: "blue",
              color: "white",
              cursor: "pointer",
              width: 100,
              marginLeft: 100,
              border: 0,
            }}
            type="submit"
          >
            Add
          </button>
         
      
        </form>
        <button
            onClick={()=>console.log(DATA[0])}
            
            style={{
              background: "blue",
              color: "white",
              cursor: "pointer",
              width: 100,
              marginLeft: 100,
              border: 0,
            }}
            type="submit"
          >
            Check
          </button>
      </div>
      <div className="app-container">
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Category Id</th>
                <th>Asset Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {DATA.map((item) => (
                <Fragment>
                  {1==2?
                    {/* editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  )  */}
                  : (
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
      </div>
      <Footer />
    </>
  );
}

export default AssetsTable;
