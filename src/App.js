import "./App.css";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddBook from "./component/AddBook";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch(
      "https://bookstore-37e03-default-rtdb.europe-west1.firebasedatabase.app/books/.json"
    )
      .then((response) => response.json())
      .then((response) => addKeys(response))
      .catch((err) => console.log(err));
  };

  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "author", headerName: "Author", width: 200 },
    { field: "year", headerName: "Year", width: 200 },
    { field: "isbn", headerName: "ISBN", width: 200 },
    { field: "price", headerName: "Price", width: 200 },
    {
      field: '',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Tooltip title="Delete book">
          <IconButton
            size="small"
            color="error"
            onClick={() => {
              deleteBook(params.id);
              console.log(params);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) =>
      Object.defineProperty(item, "id", { value: keys[index] })
    );
    setBooks(valueKeys);
  };

  const addBook = (newBook) => {
    fetch(
      `https://bookstore-37e03-default-rtdb.europe-west1.firebasedatabase.app/books/.json`,
      { method: "POST", body: JSON.stringify(newBook) }
    )
      .then((response) => fetchItems())
      .catch((err) => console.log(err));
  };

  const deleteBook = (id) => {
    fetch(
      `https://bookstore-37e03-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
      { method: "DELETE" }
    )
      .then((response) => fetchItems())
      .catch((err) => console.log(err));

    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">Bookstore</Typography>
        </Toolbar>
      </AppBar>
      <AddBook addNewBook={addBook}></AddBook>
      <DataGrid rows={books} columns={columns} getRowId={(row) => row.id} />
    </div>
  );
}

export default App;
