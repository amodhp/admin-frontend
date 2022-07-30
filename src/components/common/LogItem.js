import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

export default function LogItem({userName,action,dateAndTime}) {
  return (
    <div class="card m-4">
      <div class="card-header">{userName}</div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>
            {action}
          </p>
          <footer class="blockquote-footer">
            {dateAndTime}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
