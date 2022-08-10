import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

export default function LogItem({userName,action,dateAndTime}) {
  return (
    <div className="card m-4">
      <div className="card-header">{userName}</div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>
            {action}
          </p>
          <footer className="blockquote-footer">
            {dateAndTime}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
