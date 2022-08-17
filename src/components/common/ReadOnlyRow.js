import React, { useState, Fragment, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import  Dialog from "../Dialog";
import { margin } from "@mui/system";
import axios from "axios";
import { api } from "../../extras/APIS";




const ReadOnlyRow = ({
  tableType,
  item,
  handleEditClick,
  handleDeleteClick,
  handleDelete,
  areUSureDelete,
  dialog,
}) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [assetDeleteConfirmation, setAssetDeleteConfirmation] = useState(false);
  const accessToken = sessionStorage.getItem("token");

  const handleNo = () => {
    setDeleteConfirmation(false);
  }
  const handleYes = (id) => {
    setDeleteConfirmation(false);
    handleDelete(id);
  }
  const handleDeleteAssetYes = (id) => {
    setAssetDeleteConfirmation(false);
    handleDelete(id);
  }
  const handleDeleteAssetNo = () => {
    setAssetDeleteConfirmation(false);
  }
  const checkType = (check) => {
    if (check == "Users") {
      return (
        <tr>
          <td>{item.username}</td>
          <td>{item.role === undefined ?"Not Defined":item.role.name}</td>
          <td>{item.mobile_phone}</td>
          <td>{item.email_id}</td>
          <td>
            <button
              check="button"
              className="form-field-action-button"
              style={{
                background: "#4caf50",
                color: "white",
                cursor: "pointer",
                paddingRight: 10,
                paddingLeft: 10,
                paddingTop: 5,
                border: 0,
                borderRadius: 5,
              }}
              onClick={(event) => console.log(item.role)}
            >
              <p className="small-text">Update</p>
            </button>
            <button
              check="button"
              className="form-field-action-button"
              style={{
                background: "#FF0000",
                color: "white",
                cursor: "pointer",
                paddingRight: 10,
                paddingLeft: 10,
                paddingTop: 5,
                border: 0,
                borderRadius: 5,
              }}
              // onClick={() => handleDeleteClick(item.id)}
              onClick={() =>  setDeleteConfirmation(true)}
            >
            
              

              <p className="small-text">Delete</p>
            </button>
            {deleteConfirmation &&
              (<div  style={{
                zIndex: 1,
                height: "100%",
                width: "100%",
                background: "#000000b8",
                position: "absolute",
                top: 0,
                left: 0,

              }}>
              <div style={{
                zIndex: 2,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "20px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                textAlign: "center",
                boxShadow: "0px 0px 10px #ccc",
                color: "black",
                backgroundColor: "white",

              }}>
              <h2>Are you sure?</h2>
              <button style={{backgroundColor: "#64ff64", margin:"5px", padding:"2px" }} onClick={() => handleYes(item._id)}>Yes</button>
              <button style={{backgroundColor: "red", margin:"5px",  padding:"2px" }} onClick={handleNo}>No</button>
              </div>
              </div>)}
            {dialog.isLoading && (
              <Dialog
                //Update
                nameProduct={dialog.nameProduct}
                onDialog={areUSureDelete}
                message={dialog.message}
              />
            )}
          </td>
          
        </tr>
      );
    } else if (check === "Assets") {
      return (
        <tr>
          <td>{item.asset_name}</td>
          <td>{item.asset_category}</td>
          <td>{item.location}</td>
          <td>{"item.asset_component_list"}</td>
          <td>
            <button
              check="button"
              className="form-field-action-button"
              style={{
                background: "#4caf50",
                color: "white",
                cursor: "pointer",
                paddingRight: 10,
                paddingLeft: 10,
                paddingTop: 5,
                border: 0,
                borderRadius: 5,
              }}
              onClick={(event) => console.log(item._id)}
            >
              <p className="small-text">Update</p>
            </button>
            <button
              check="button"
              className="form-field-action-button"
              style={{
                background: "#FF0000",
                color: "white",
                cursor: "pointer",
                paddingRight: 10,
                paddingLeft: 10,
                paddingTop: 5,
                border: 0,
                borderRadius: 5,
              }}
              // onClick={() => handleDeleteClick(item.assetId)}
              onClick={()=>setAssetDeleteConfirmation(true)}
              // onClick={() =>  console.log(item.asset_name)}

            >
              
              <p className="small-text">Delete</p>
            </button>
            {assetDeleteConfirmation &&
              (<div  style={{
                zIndex: 1,
                height: "100%",
                width: "100%",
                background: "#000000b8",
                position: "absolute",
                top: 0,
                left: 0,

              }}>
              <div style={{
                zIndex: 2,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "20px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                textAlign: "center",
                boxShadow: "0px 0px 10px #ccc",
                color: "black",
                backgroundColor: "white",

              }}>
              <h2>Are you sure?</h2>
              <button style={{backgroundColor: "#64ff64", margin:"5px", padding:"2px" }} onClick={() => handleDeleteAssetYes(item._id)}>Yes</button>
              <button style={{backgroundColor: "red", margin:"5px",  padding:"2px" }} onClick={handleDeleteAssetNo}>No</button>
              </div>
              </div>)}
            {dialog.isLoading && (
              <Dialog
                //Update
                nameProduct={dialog.nameProduct}
                onDialog={areUSureDelete}
                message={dialog.message}
              />
            )}
          </td>
        </tr>

      );
    }
  };

  return checkType(tableType);

};

export default ReadOnlyRow;
