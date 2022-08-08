// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Button } from "@mui/material";
import React, { useState, Fragment, useRef, useEffect } from "react";
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
import axios from "axios";

function UserTable(props) {
  const accessToken = sessionStorage.getItem("token");
  useEffect(() => {
    getUserData(accessToken, "admin");
  }, []);

  const getUserData = (accessToken, admin) => {
    // const params = JSON.stringify({
    //   username: username,

    //   password: password,
    // });

    axios
      .get("http://192.168.1.6:3000/admin", {
        headers: {
          "access-token": `${accessToken}`,
        },
      })
      .then(function (response) {
        // console.log(response.data);
        const data = response.data.users;
        // setTimeout(setDATA(data),3999)
        setDATA(data);
        // console.log("1", data);
        // setDATA(data);
        // console.log("2", DATA);
        // console.log("get users");
      })

      .catch(function (error) {
        console.log(accessToken);
        console.log(error, "Error Users");
        // alert("Oops! Wrong Password or Username!");
      });
  };

  const [DATA, setDATA] = useState([]);
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
  //variables for user add field
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (accessToken) => {
    // event.preventDefault();
    setModalVisible(false);
    console.log("USer Data", name, role, accessToken);

    //calling axios to post user data

    // const params = JSON.stringify({
    //   user_id: 11,
    //   username: "amoood_",
    //   password: "AModh",
    //   first_name: name,
    //   middle_name: "",
    //   last_name: "",
    //   mobile_phone: 9769388614,
    //   email_id: "amodh1.pandey64@gmail.com",
    //   company_name: "selec",
    //   role: role,
    //   note: "",
    //   interfaces: "",
    //   asset_category: [],
    // });
    axios({
      method: "post",
      url: "http://192.168.1.6:3000/admin/add_user",
      data: {
        user_id: Math.floor(Math.random() * 1000000),
        username: name,
        password: "AModh",
        first_name: name,
        middle_name: "",
        last_name: "",
        mobile_phone: phone,
        email_id: email,
        company_name: "selec",
        role: role,
        note: "",
        interfaces: "",
        asset_category: [],
      },
      headers: {
        "access-token": `${accessToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        getUserData(accessToken)
      })
      .catch((error) => {
        console.log(error);
      });

    //   axios
    //     .post(
    //       "http://192.168.1.7:3000/admin/add_user",
    //       params,
    //       {
    // headers: {
    //   "access-token": `${accessToken}`,
    // },
    //       }
    //     )
    //     .then(function (response) {
    //       console.log(response.data);
    //       // setDATA(response.data)
    //       console.log("adding user");
    //       // history.push("/users");
    //       // navigate('/assets')
    //     })

    //     .catch(function (error) {
    //       console.log(accessToken);
    //       console.log(error, "Error add user");
    //       // alert("Oops! Wrong Password or Username!");
    //     });

    //   // const newContacts = [...contacts, newContact];
    //   // setContacts(newContacts);
    // };
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
    // postUserData(accessToken)
  };

  const handleEditClick = (event, data) => {
    event.preventDefault();
    setEditContactId(data.id);

    const formValues = {
      username: data.fullName,
      user_id: data.id,
      email_id: data.email,
      mobile_phone: data.phoneNumber,
      // "user_id": 101,
      // "username": "stackholder 2",
      password: "1234",
      first_name: "khsuhi",
      middle_name: "",
      last_name: "",
      // "mobile_phone": 4653187894,
      // "email_id": "doe@gmail.com",
      company_name: "somaiya",
      role: "requestee",
      note: "",
      interfaces: "",
      asset_category: [],
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
    console.log(id,"inside handlete func")
    // const index = contacts.findIndex((contact) => contact.id === id);
    // setDeleteId(id);
    console.log("Reached in handleDelete");
    const params = JSON.stringify({
      id:id
    });
    // axios.delete(`http://192.168.1.6:3000/admin/delete_user/:id`,params, {
    //   headers: {
    //     "access-token": `${accessToken}`,
    //   },
  
    // })
    
    handleDialog(
      "Are you sure you want to delete?",
      true,
      console.log("True Pressed"),
      // axios.delete(`http://192.168.1.6:3000/admin/delete_user/:id`,params, {
      //   headers: {
      //     "access-token": `${accessToken}`,
      //   },
    
      // })
    );
 
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
                  <th>Role</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {DATA.map((item) => (
                  <Fragment>
                    {editContactId === item.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        item={item}
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
      </div>
      <Footer />
    </>
  );
}

export default UserTable;