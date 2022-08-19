import { chainPropTypes } from "@mui/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LogItem from "../components/common/LogItem";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { api } from "../extras/APIS";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const req = [
  {
    id: 1,
    subject: "Request 1",
    description: "Request 1 Description",
    status: "Open",
    escalated: "false",
    location: "Mumbai",
    createdAt: "2020-01-01",
  },
  {
    id: 2,
    subject: "Request 2",
    description: "Request 2 Description",
    status: "Cloased",
    escalated: "false",
    location: "Mumbai",
    createdAt: "2020-01-01",
  },
  {
    id: 3,
    subject: "Request 3",
    description: "Request 3 Description",
    status: "In Progress",
    escalated: "false",
    location: "Mumbai",
    createdAt: "2020-01-01",
  },
  {
    id: 4,

    subject: "Request 4",
    description: "Request 4 Description",
    status: "Open",
    escalated: "false",
    location: "Mumbai",
    createdAt: "2020-01-01",
  },
  {
    id: 5,
    subject: "Request 5",
    description: "Request 5 Description",
    status: "Open",
    escalated: "false",
    location: "Mumbai",
    createdAt: "2020-01-01",
  },
];

const Requests = () => {
  const [color, setColor] = useState("");

  const statusColor = (status) => {
    if (status == "open") {
      setColor("#ffc107");
    } else if (status == "In Progress") {
      setColor("#28a745");
    } else if (status == "Closed") {
      setColor("#dc3545");
    }
    return color;
  };

  const [requests, setRequests] = React.useState([]);
  const accessToken = sessionStorage.getItem("token");
  const getReqData = (accessToken, admin) => {
    axios
      .get(`http://${api}/admin/ticket`, {
        headers: {
          "access-token": `${accessToken}`,
        },
      })
      .then(function (response) {
        console.log(response.data.tickets);
        setRequests(response.data.tickets.reverse());
      });
  };
  useEffect(() => {
    getReqData(accessToken, "admin");
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestName, setRequestName] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [requestId, setRequestId] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [requestCreated, setRequestCreated] = useState("");
  const [location, SetLocation] = useState("");

  return (
    <div>
      <Navbar />
      <div style={{ padding: "10px" }}>
        {requests.length == 0 ? (
          <span style={{ fontWeight: "bold", fontSize: 50,color:'grey', marginLeft:'40%', }}>
            No Requests Yet!
          </span>
        ) : (
          <>
          {requests.map((req) => (
          <div
            className="card m-4"
            style={{
              width: "40%",
              borderRadius: "10px",
              border: "1px solid black",
            }}
            key={req._id}
            onClick={() => (
              setModalVisible(true),
              setRequestName(req.subject),
              setRequestDescription(req.description),
              setRequestCreated(Date(req.open_at)),
              setRequestStatus(req.status),
              setRequestId(req._id),
              SetLocation(req.location)
            )}
          >
            <div
              className="card-header"
              style={{
                borderRadius: "10px 10px 0 0",
                backgroundColor: req.status == "open" ? "red" : "#00f54e",
                color: "black",
                borderBottom: "black 2px solid",
              }}
            >
              {req.subject}
            </div>

            <div className="card-body" style={{ color: "black" }}>
              <blockquote className="blockquote mb-0">
                <p>{req.description}</p>
                <footer className="blockquote-footer">
                  {Date(req.open_at)}
                </footer>
              </blockquote>
            </div>
          </div>
        ))}

          </>
        )}
        {/* {requests.map((req) => (
          <div
            className="card m-4"
            style={{
              width: "40%",
              borderRadius: "10px",
              border: "1px solid black",
            }}
            key={req._id}
            onClick={() => (
              setModalVisible(true),
              setRequestName(req.subject),
              setRequestDescription(req.description),
              setRequestCreated(Date(req.open_at)),
              setRequestStatus(req.status),
              setRequestId(req._id),
              SetLocation(req.location)
            )}
          >
            <div
              className="card-header"
              style={{
                borderRadius: "10px 10px 0 0",
                backgroundColor: req.status == "open" ? "#00f54e" : "red",
                color: "black",
                borderBottom: "black 2px solid",
              }}
            >
              {req.subject}
            </div>

            <div className="card-body" style={{ color: "black" }}>
              <blockquote className="blockquote mb-0">
                <p>{req.description}</p>
                <footer className="blockquote-footer">
                  {Date(req.open_at)}
                </footer>
              </blockquote>
            </div>
          </div>
        ))} */}
        <Modal size="lg" show={modalVisible}>
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-lg">
              <span style={{ fontWeight: "bold", fontSize: 30 }}>
                {" "}
                {requestName}
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {console.log(Location)}
            <Card>
              <Card.Body>
                <span style={{ fontWeight: "bold", fontSize: 20 }}>
                  Request ID:{" "}
                </span>
                <span style={{ fontSize: 25 }}>{requestId}</span>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <span style={{ fontWeight: "bold", fontSize: 20 }}>
                  Description:{" "}
                </span>
                <span style={{ fontSize: 25 }}>{requestDescription}</span>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <span style={{ fontWeight: "bold", fontSize: 20 }}>
                  Created At:{" "}
                </span>
                <span style={{ fontSize: 20 }}>{requestCreated}</span>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <span style={{ fontWeight: "bold", fontSize: 20 }}>
                  Status:{" "}
                </span>
                <span
                  style={{
                    fontSize: 25,
                    color: requestStatus == "open" ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {requestStatus}
                </span>
              </Card.Body>
            </Card>
            {/* <Card>
              <Card.Body>
                <span style={{ fontWeight: "bold", fontSize: 20 }}>
                  Problem Pic by Requestee:{" "}
                </span>
                <br></br>
                <img
                  style={{ height: 200, width: 300 }}
                  src="https://i.pinimg.com/564x/cb/16/bb/cb16bb284a2a80c75041c80ba63e62d3.jpg"
                ></img>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <span style={{ fontWeight: "bold", fontSize: 20 }}>
                  Completion Pic by Technician:{" "}
                </span>
                <br></br>
                <img
                  style={{ height: 200, width: 300 }}
                  src="https://i.pinimg.com/564x/cb/16/bb/cb16bb284a2a80c75041c80ba63e62d3.jpg"
                ></img>
              </Card.Body>
            </Card> */}
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="lg"
              variant="primary"
              onClick={() => (
                setModalVisible(false), console.log(requestStatus)
              )}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default Requests;
