import React from "react";

const ReadOnlyRow = ({
  tableType,
  contact,
  handleEditClick,
  handleDeleteClick,
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
              onClick={(event) => handleEditClick(event, contact)}
            >
              Edit
            </button>
            <button
              check="button"
              onClick={() => handleDeleteClick(contact.id)}
            >
              Delete
            </button>
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
              onClick={(event) => handleEditClick(event, contact)}
            >
              Edit
            </button>
            <button
              check="button"
              onClick={() => handleDeleteClick(contact.assetId)}
            >
              Delete
            </button>
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
