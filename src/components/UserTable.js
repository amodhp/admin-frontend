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
import { api } from "../extras/APIS";

function UserTable(props) {
  const accessToken = sessionStorage.getItem("token");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  useEffect(() => {
    getUserData(accessToken, "admin");
  }, []);

  const getUserData = (accessToken, admin) => {
    // const params = JSON.stringify({
    //   username: username,

    //   password: password,
    // });

    axios
      .get(`http://${api}/admin`, {
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
  const [password, setPassword] = useState("1234");
  const [skills, setSkills] = useState([]);
  const s = [];

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

    console.log("password", password);
    //console typeof password
    console.log("typeof password", typeof password);
    console.log(role);

    console.log("password while calling function", password);
    axios({
      method: "post",

      url: `http://${api}/admin/add_user`,

      data: {
        user_id: Math.floor(Math.random() * 1000000),
        username: name,
        password: password,
        first_name: name,
        middle_name: "",
        last_name: "",
        mobile_phone: phone,
        email_id: email,
        company_name: "selec",
        role: role,
        note: "",
        interfaces: "",
        skills: skills,
      },
      headers: {
        "access-token": `${accessToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        getUserData(accessToken);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRoleChange = (event) => {
    event.preventDefault();
    setRole(event.target.value);
    console.log("role", role);
    if (role === "requestee") {
      //convert
      setPassword(email);
    } else {
      setPassword(phone.toString());
    }
    console.log("password while role select", password);
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
    console.log(id, "inside handlete func");
    // const index = contacts.findIndex((contact) => contact.id === id);
    // setDeleteId(id);
    console.log("Reached in handleDelete");
    axios({
      method: "delete",
      url: `http://${api}/admin/delete_user/${id}`,
      headers: {
        "access-token": `${accessToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        getUserData(accessToken);
      })
      .catch((error) => {
        console.log(error);
      });
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

      <div style={{ marginTop: 5 }}>
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
                  <Fragment key={item._id}>
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
              <Form.Select
                aria-label="Default select example"
                size="lg"
                style={{ marginBottom: 10 }}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Choose Role</option>
                <option value="admin">admin</option>
                <option value="technician-internal">technician-internal</option>
                <option value="requestee">requestee</option>
                <option value="design">design</option>
                <option value="department-head">department-head</option>
                <option value="technician-external">technician-external</option>
                <option value="management">management</option>
              </Form.Select>
              {/* {console.log(role,'role')} */}
              {/* <Form.Control
                type="text"
                id="address"
                name="address"
                // aria-describedby="passwordHelpBlock"
                size="lg"
                style={{ marginBottom: 10 }}
                onChange={(e) => setRole(e.target.value)}
              /> */}
              <Form.Label size="lg">Phone</Form.Label>
              <Form.Control
                type="text"
                // id="phoneNumber"
                // name="phoneNumber"
                maxlength="10"
                // aria-describedby="passwordHelpBlock"
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

              {console.log("Intial skills", skills)}
              {/* <select name="vehicle_part[]" class="superSelect" onChange={(e)=>(setSkills(skills.push(e.target.value)),console.log("Skills",skills))}>
                <option value="">Select</option>
                <option value="test1">test1</option>
                <option value="test2">test2</option>
                <option value="test3">test3</option>
              </select> */}

              {role == "technician-internal" ?   <>
              
                  <Form.Label size="lg">Skills</Form.Label>
                  <div className="mb-2">
                    <Button
                      style={{ marginLeft: 5 }}
                      disabled={true ? skills.includes("mouse") : false}
                      variant="primary"
                      size="lg"
                      onClick={() => setSkills([...skills, "mouse"])}
                    >
                      mouse
                    </Button>{" "}
                    <Button
                      style={{ marginLeft: 5 }}
                      disabled={true ? skills.includes("printer") : false}
                      variant="success"
                      color="red"
                      size="lg"
                      onClick={() => setSkills([...skills, "printer"])}
                    >
                      printer
                    </Button>
                    <Button
                      style={{ marginLeft: 5 }}
                      disabled={true ? skills.includes("A.C") : false}
                      variant="warning"
                      size="lg"
                      onClick={() => setSkills([...skills, "A.C"])}
                    >
                      I.T
                    </Button>
                    <Button
                      style={{ marginLeft: 5 }}
                      disabled={true ? skills.includes("projector") : false}
                      variant="info"
                      size="lg"
                      onClick={() => setSkills([...skills, "projector"])}
                    >
                      projector
                    </Button>
                    <Button
                      style={{ marginLeft: 5 }}
                      disabled={true ? skills.includes("monitor") : false}
                      variant="secondary"
                      size="lg"
                      onClick={() => setSkills([...skills, "monitor"])}
                    >
                      monitor
                    </Button>
                  </div>
               
              </> : null}

              {/* <div className="mb-2">
                <Button
                  style={{ marginLeft: 5 }}
                  disabled={true ? skills.includes("mouse") : false}
                  variant="primary"
                  size="lg"
                  onClick={() => setSkills([...skills, "mouse"])}
                >
                  mouse
                </Button>{" "}
                <Button
                  style={{ marginLeft: 5 }}
                  disabled={true ? skills.includes("printer") : false}
                  variant="success"
                  color="red"
                  size="lg"
                  onClick={() => setSkills([...skills, "printer"])}
                >
                  printer
                </Button>
                <Button
                  style={{ marginLeft: 5 }}
                  disabled={true ? skills.includes("A.C") : false}
                  variant="warning"
                  size="lg"
                  onClick={() => setSkills([...skills, "A.C"])}
                >
                  I.T
                </Button>
                <Button
                  style={{ marginLeft: 5 }}
                  disabled={true ? skills.includes("projector") : false}
                  variant="info"
                  size="lg"
                  onClick={() => setSkills([...skills, "projector"])}
                >
                  projector
                </Button>
                <Button
                  style={{ marginLeft: 5 }}
                  disabled={true ? skills.includes("monitor") : false}
                  variant="secondary"
                  size="lg"
                  onClick={() => setSkills([...skills, "monitor"])}
                >
                  monitor
                </Button>
              </div> */}
              {/* {console.log("Skills", skills)} */}
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
