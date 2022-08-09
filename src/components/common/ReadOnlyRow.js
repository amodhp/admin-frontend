import React, { useState, Fragment, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import  Dialog from "../Dialog";




const ReadOnlyRow = ({
  tableType,
  item,
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
          <td>{item.username}</td>
          <td>{item.role === undefined ?"Not Defined":item.role.name}</td>
          <td>{item.mobile_phone}</td>
          <td>{item.email_id}</td>
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
              onClick={(event) => console.log(item.role)}
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
              // onClick={() => handleDeleteClick(item.id)}
              onClick={() =>  handleDelete(item._id)}
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
          <td>{item.asset_name}</td>
          <td>{"item.category"}</td>
          <td>{item.location}</td>
          <td>{item.Asset_component_list}</td>
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
              onClick={(event) => handleEditClick(event, item)}
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
              // onClick={() => handleDeleteClick(item.assetId)}
              onClick={() =>  handleDelete(item.assetId)}
              // onClick={() =>  console.log(item.asset_name)}

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

};

export default ReadOnlyRow;
