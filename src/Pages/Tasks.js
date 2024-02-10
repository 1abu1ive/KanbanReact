import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Modal,
  Paper,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import "../App.css";

const Tasks = ({ darkMode }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState("");
  const [status, setStatus] = useState("Todo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedTodo(null);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSubtasks("");
    setStatus("Todo");
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Todo":
        return "gainsboro";
      case "Doing":
        return "gainsboro";
      case "Done":
        return "gainsboro";
      default:
        return "gainsboro";
    }
  };
  const handleTodoChange = (e, field) => {
    switch (field) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "subtasks":
        setSubtasks(e.target.value);
        break;
      case "status":
        setStatus(e.target.value);
        break;
      default:
        break;
    }
  };

  const addTodo = () => {
    if (title.trim() !== "") {
      const newTodoObject = {
        title,
        description,
        subtasks,
        status,
      };

      if (editedTodo !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editedTodo] = newTodoObject;
        setTodos(updatedTodos);
        setEditedTodo(null);
      } else {
        setTodos([...todos, newTodoObject]);
      }

      closeModal();
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    closeModal();
  };

  const editTodo = (index) => {
    const selectedTodo = todos[index];
    setTitle(selectedTodo.title);
    setDescription(selectedTodo.description);
    setSubtasks(selectedTodo.subtasks);
    setStatus(selectedTodo.status);

    setEditedTodo(index);
    openModal();
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
          padding: 2,
        }}
      >
        <Typography variant="h4">Kanban</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openModal}>
          Add New Task
        </Button>
      </Box>

      <Container>
        <Grid container spacing={3}>
          {todos.map((todo, index) => (
            <Grid
              key={index}
              xs={12}
              md={4}
              sx={{
                borderRadius: "5px",
                padding: "20px",
                fontWeight: "700",
                fontSize: "15px",
                fontFamily: "Plus Jakarta Sans",
                backgroundColor: getStatusColor(todo.status),
                cursor: "pointer",
                transition: "background-color 0.3s",
                color: "black",
              }}
              onClick={() => editTodo(index)}
            >
              <div>Title: {todo.title}</div>
              <div>Description: {todo.description}</div>
              <div>Subtasks: {todo.subtasks}</div>
              <div>Status: {todo.status}</div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            p: 4,
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={closeModal}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5">
            {editedTodo !== null ? "Edit Task" : "Add Task"}
          </Typography>
          <TextField
            type="text"
            value={title}
            onChange={(e) => handleTodoChange(e, "title")}
            label="Title"
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            type="text"
            value={description}
            onChange={(e) => handleTodoChange(e, "description")}
            label="Description"
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            type="text"
            value={subtasks}
            onChange={(e) => handleTodoChange(e, "subtasks")}
            label="Subtasks"
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => handleTodoChange(e, "status")}
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="Todo">Todo</MenuItem>
            <MenuItem value="Doing">Doing</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </TextField>
          <Button
            variant="contained"
            onClick={addTodo}
            fullWidth
            sx={{ mb: 2 }}
          >
            {editedTodo !== null ? "Edit" : "New Task"}
          </Button>
          {editedTodo !== null && (
            <Button
              variant="contained"
              onClick={() => deleteTodo(editedTodo)}
              color="error"
              fullWidth
            >
              Delete
            </Button>
          )}
        </Paper>
      </Modal>
    </Box>
  );
};

export default Tasks;
