import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
} from "@mui/material";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [updateId, setUpdateId] = useState(null);

  // Fetch items from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  }, [items]);

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = { name, description };

    if (updateId) {
      // Update item
      await axios.put(`http://localhost:5000/api/items/${updateId}`, itemData);
      setUpdateId(null);
    } else {
      // Create item
      await axios.post("http://localhost:5000/api/items", itemData);
    }

    setName("");
    setDescription("");
  };

  // Handle edit button click
  const handleEdit = (item) => {
    setName(item.name);
    setDescription(item.description);
    setUpdateId(item._id);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box
        sx={{
          textAlign: "center",
          mb: 4,
          backgroundColor: "#1976d2",
          padding: "20px 0",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h3"
          color="white"
          fontWeight="bold"
          sx={{ fontSize: "3rem", letterSpacing: "1px" }}
        >
          CRUD Application
        </Typography>
        <Typography
          variant="h6"
          color="white"
          sx={{ fontSize: "1.2rem", fontWeight: 400 }}
        >
          Manage your items with ease
        </Typography>
      </Box>
      <Paper sx={{ padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Item Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{ backgroundColor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Item Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                sx={{ backgroundColor: "#fff" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                fullWidth
                sx={{
                  padding: "12px 24px",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#1976d2" },
                }}
              >
                {updateId ? "Update Item" : "Add Item"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          Items List
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 5 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(item)}
                      sx={{
                        borderRadius: 2,
                        "&:hover": {
                          backgroundColor: "#1976d2",
                          color: "#fff",
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(item._id)}
                      sx={{
                        borderRadius: 2,
                        "&:hover": {
                          backgroundColor: "#f44336",
                          color: "#fff",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mt: 5 }}></Box>{" "}
      {/* Added this extra margin-bottom space for footer */}
    </Container>
  );
}

export default App;
