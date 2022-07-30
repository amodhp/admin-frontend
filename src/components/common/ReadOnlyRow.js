import React, { useState, Fragment, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import  Dialog from "../Dialog";




const ReadOnlyRow = ({
  tableType,
  contact,
  handleEditClick,
  handleDeleteClick,
  handleDelete,
  areUSureDelete,
  dialog,
}) => {
  
  const checkType = (check) => {
    if (check == "Users") {
      return (
        <tr>
          <td>{contact.fullName}</td>
          <td>{contact.address}</td>
          <td>{contact.phoneNumber}</td>
          <td>{contact.email}</td>
          <td>
            <button
              check="button"
              class="form-field-action-button"
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
              onClick={(event) => handleEditClick(event, contact)}
            >
              <p class="small-text">Update</p>
            </button>
            <button
              check="button"
              class="form-field-action-button"
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
              // onClick={() => handleDeleteClick(contact.id)}
              onClick={() =>  handleDelete(contact.id)}
            >
              <p class="small-text">Delete</p>
            </button>
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
          <td>{contact.assetName}</td>
          <td>{contact.category}</td>
          <td>{contact.categoryId}</td>
          <td>{contact.assetId}</td>
          <td>
            <button
              check="button"
              class="form-field-action-button"
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
              onClick={(event) => handleEditClick(event, contact)}
            >
              <p class="small-text">Update</p>
            </button>
            <button
              check="button"
              class="form-field-action-button"
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
              // onClick={() => handleDeleteClick(contact.assetId)}
              onClick={() =>  handleDelete(contact.assetId)}

            >
              
              <p class="small-text">Delete</p>
            </button>
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
  // <tr>
  //   <td>{contact.fullName}</td>
  //   <td>{contact.address}</td>
  //   <td>{contact.phoneNumber}</td>
  //   <td>{contact.email}</td>
  //   <td>
  //     <button
  //       check="button"
  //       onClick={(event) => handleEditClick(event, contact)}
  //     >
  //       Edit
  //     </button>
  //     <button type="button" onClick={() => handleDeleteClick(contact.id)}>
  //       Delete
  //     </button>
  //   </td>
  // </tr>
};

export default ReadOnlyRow;
