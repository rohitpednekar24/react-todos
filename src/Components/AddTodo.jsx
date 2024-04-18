import React, { useState } from "react";

function AddTodo() {
  const [description, setDescription] = useState("");
  const [priorityId, setPriorityId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [statusId, setStatusId] = useState("");

  const handleSave = async () => {
    try {
      const response = await fetch("https://localhost:7277/api/Todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description, priorityId, categoryId, statusId }),
      });

      if (response.ok) {
        console.log("Todo saved successfully");
        alert("Todo Saved successfully")
        window.location.reload();
      } else {
        console.error("Failed to save todo");
      }
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriorityIdChange = (event) => {
    setPriorityId(event.target.value);
  };

  const handleCategoryIdChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleStatusIdChange = (event) => {
    setStatusId(event.target.value);
  };

  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    inputContainer: {
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
    },
    label: {
      marginRight: "10px",
      width: "100px",
    },
    input: {
      padding: "5px",
      marginRight: "10px",
      width: "200px",
    },
    button: {
      backgroundColor: "blue",
      color: "white",
      padding: "10px",
      marginTop: "10px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.form}>
      <h2>Add Todo</h2>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Description:</label>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Priority:</label>
        <select
          value={priorityId}
          onChange={handlePriorityIdChange}
          style={styles.input}
        >
          <option value="">Select Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Category:</label>
        <select
          value={categoryId}
          onChange={handleCategoryIdChange}
          style={styles.input}
        >
          <option value="">Select Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shop">Shop</option>
        </select>
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Status:</label>
        <select
          value={statusId}
          onChange={handleStatusIdChange}
          style={styles.input}
        >
          <option value="">Select Status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <button onClick={handleSave} style={styles.button}>
        Save Todo
      </button>
    </div>
  );
}

export default AddTodo;
