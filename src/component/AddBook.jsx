import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const AddBook = (props) => {
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState({
    title: "",
    author: "",
    year: "",
    isbn: "",
    price: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addNewBook(book);
    handleClose();
  }

  const handleInput = (e) => {
    setBook({...book, [e.target.name]: e.target.value})
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button variant="outlined" size="medium" onClick={handleOpen}>Add book</Button>
      <Dialog open={open}>
        <DialogTitle>New book</DialogTitle>
        <DialogContent>
            <TextField name="title" value={book.title} onChange={handleInput} label= "title" margin="dense" fullWidth ></TextField>
            <TextField name="author" value={book.author} onChange={handleInput} label= "author" margin="dense" fullWidth></TextField>
            <TextField name="year" value={book.year} onChange={handleInput} label= "year" margin="dense" fullWidth></TextField>
            <TextField name="isbn" value={book.isbn} onChange={handleInput} label= "isbn" margin="dense" fullWidth></TextField>
            <TextField name="price" value={book.price} onChange={handleInput} label= "price" margin="dense" fullWidth></TextField>
        </DialogContent>
        <DialogActions>
            <Button color="primary" onClick={handleClose}>Cancel</Button>
            <Button color="primary" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBook;
