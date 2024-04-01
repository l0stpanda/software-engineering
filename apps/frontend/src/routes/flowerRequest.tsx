import React from "react";

export default function flowerRequest() {
  return (
    <div className="w-100">
      <h1>Really bad flower request page</h1>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label>
          Room Num:
          <input
            type="text"
            name="Room"
            style={{
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: "2px",
              backgroundColor: "lightgrey",
              marginBottom: "2%",
            }}
          />
        </label>

        <label>
          Sent By:
          <input
            type="text"
            name="sent"
            style={{
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: "2px",
              backgroundColor: "lightgrey",
              marginBottom: "2%",
            }}
          />
        </label>

        <label>
          Note:
          <textarea
            name="note"
            style={{
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: "2px",
              backgroundColor: "lightgrey",
              marginBottom: "2%",
            }}
          />
        </label>
      </form>
    </div>
  );
}
