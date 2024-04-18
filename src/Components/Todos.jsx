import React, { Component } from "react";

class Todos extends Component {
  state = {
    todos: [],
    filteredTodos: [],
    editedTodo: null, // State variable to store the currently edited todo item
  };

  componentDidMount() {
    this.fetchTodos(); // Fetch todos when the component mounts
  }

  componentWillUnmount() {
    clearInterval(this.interval); // Clear the interval when the component is unmounted
  }

  fetchTodos = () => {
    fetch("https://localhost:7277/api/Todos")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            todos: result,
            filteredTodos: result,
          });
        },
        (error) => {
          console.error("Failed to fetch todos:", error);
        }
      );
  };

  handleCategoryFilter = (categoryId) => {
    let filteredTodos;

    if (categoryId === "All") {
      filteredTodos = this.state.todos;
    } else {
      filteredTodos = this.state.todos.filter(
        (todo) => todo.categoryId === categoryId
      );
    }

    this.setState({ filteredTodos });
  };

  handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!isConfirmed) return; // If user cancels, do nothing

    fetch(`https://localhost:7277/api/Todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          this.setState((prevState) => ({
            todos: prevState.todos.filter((todo) => todo.id !== id),
            filteredTodos: prevState.filteredTodos.filter(
              (todo) => todo.id !== id
            ),
          }));
        } else {
          throw new Error("Failed to delete todo.");
        }
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  handleEdit = (todo) => {
    // Set the currently edited todo item in the state
    this.setState({ editedTodo: { ...todo } });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the edited todo with the new value
    this.setState((prevState) => ({
      editedTodo: {
        ...prevState.editedTodo,
        [name]: value,
      },
    }));
  };

  handleCategoryIdChange = (value) => {
    this.setState((prevState) => ({
      editedTodo: {
        ...prevState.editedTodo,
        categoryId: value,
      },
    }));
  };

  handlePriorityIdChange = (value) => {
    this.setState((prevState) => ({
      editedTodo: {
        ...prevState.editedTodo,
        priorityId: value,
      },
    }));
  };

  handleStatusIdChange = (value) => {
    this.setState((prevState) => ({
      editedTodo: {
        ...prevState.editedTodo,
        statusId: value,
      },
    }));
  };

  handleSubmit = () => {
    const { editedTodo } = this.state;
    fetch(`https://localhost:7277/api/Todos/${editedTodo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTodo),
    })
      .then((res) => {
        if (res.ok) {
          alert("Todo updated successfully!");
          window.location.reload(); // Reload the page to show updated data
        } else {
          alert("Todo updation Failed!");
          throw new Error("Failed to update todo.");
        }
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  render() {
    const { filteredTodos, editedTodo } = this.state;
    const styles = {
      wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      },
      heading: {
        marginBottom: "10px",
      },
      table: {
        width: "80%",
        borderCollapse: "collapse",
      },
      thTd: {
        border: "1px solid #ddd",
        padding: "10px",
      },
      th: {
        backgroundColor: "#f2f2f2",
        fontWeight: "bold",
      },
      trHover: {
        "&:hover": {
          backgroundColor: "#f9f9f9",
        },
      },
      button: {
        marginRight: "10px",
        backgroundColor: "lightblue",
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
      },
      buttonAll: {
        marginRight: "10px",
        backgroundColor: "lightblue",
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
      },
      inputContainer: {
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
      },
      label: {
        marginRight: "10px",
        width: "100px", // Adjust width as needed
      },
      input: {
        padding: "5px",
        marginRight: "10px",
        width: "200px", // Adjust width as needed
      },
      form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      submitButton: {
        backgroundColor: "blue",
        color: "white",
        padding: "10px",
        marginTop: "10px",
        cursor: "pointer",
      },
    };

    // Destructuring editedTodo to get values for the form fields
    const { description, priorityId, categoryId, statusId } = editedTodo || {};

    return (
      <div style={styles.wrapper}>
        <div style={styles.buttonsContainer}>
          <button
            style={styles.buttonAll}
            onClick={() => this.handleCategoryFilter("All")}
          >
            All
          </button>
          <button
            style={styles.button}
            onClick={() => this.handleCategoryFilter("personal")}
          >
            Personal
          </button>
          <button
            style={styles.button}
            onClick={() => this.handleCategoryFilter("work")}
          >
            Work
          </button>
          <button
            style={styles.button}
            onClick={() => this.handleCategoryFilter("shop")}
          >
            Shop
          </button>
        </div>
        <h2 style={styles.heading}>Todo List</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, ...styles.thTd }}>Description</th>
              <th style={{ ...styles.th, ...styles.thTd }}>Priority</th>
              <th style={{ ...styles.th, ...styles.thTd }}>Category</th>
              <th style={{ ...styles.th, ...styles.thTd }}>Status</th>
              <th style={{ ...styles.th, ...styles.thTd }}>Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <React.Fragment key={todo.id}>
                <tr>
                  <td style={styles.thTd}>{todo.description}</td>
                  <td style={styles.thTd}>{todo.priorityId}</td>
                  <td style={styles.thTd}>{todo.categoryId}</td>
                  <td style={styles.thTd}>{todo.statusId}</td>
                  <td style={{ ...styles.thTd, textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        onClick={() => this.handleDelete(todo.id)}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          marginRight: "5px",
                        }}
                      >
                        Delete
                      </button>
                      <button onClick={() => this.handleEdit(todo)}>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
                {editedTodo && editedTodo.id === todo.id && (
                  <tr>
                    <td colSpan="5">
                      <h3 style={{ textAlign: "center" }}>Edit Todo</h3>
                      <form onSubmit={this.handleSubmit} style={styles.form}>
                        <div style={styles.inputContainer}>
                          <label style={styles.label}>Description:</label>
                          <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={this.handleInputChange}
                            style={styles.input}
                          />
                        </div>
                        <div style={styles.inputContainer}>
                          <label style={styles.label}>Priority:</label>
                          <select
                            value={priorityId}
                            onChange={(e) =>
                              this.handlePriorityIdChange(e.target.value)
                            }
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
                            onChange={(e) =>
                              this.handleCategoryIdChange(e.target.value)
                            }
                            style={styles.input}
                          >
                            <option value="">Select Category</option>
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                            <option value="shop">Shop</option>
                          </select>
                        </div>
                        <div style={styles.inputContainer}>
                          <label style={styles.label}>Status:</label>
                          <select
                            value={statusId}
                            onChange={(e) =>
                              this.handleStatusIdChange(e.target.value)
                            }
                            style={styles.input}
                          >
                            <option value="">Select Status</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>
                        <button type="submit" style={styles.submitButton}>
                          Save
                        </button>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Todos;
