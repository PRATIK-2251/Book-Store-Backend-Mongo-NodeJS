import { Book } from "../models/bookModel.js";
import express from "express";

const router = express.Router();
// Route for save a new book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields : title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const Books = await Book.create(newBook);
    return response.status(201).send(Books);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get all books from database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log("Error ==> ", err);
    response.status(500).send({ message: err.message });
  }
});

// Route for Get one Book from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);
    return response.status(200).json({
      status: 200,
      message: "Book details get successfully",
      data: book,
    });
  } catch (err) {
    console.log("Error ==> ", err);
    response.status(500).send({ message: err.message });
  }
});

// Route for update a Book
router.put("/:id", async (request, response) => {
  console.log("Update record request ---> ", request.body);
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields : title, author, publishYear",
      });
    }

    const { id } = request.params;
    console.log("Book id - PUT Method --> ", id);
    const result = await Book.findByIdAndUpdate({ _id: id }, request.body);
    console.log("Update record result --> ", result);
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }

    return response
      .status(200)
      .send({ status: 200, message: "Book updated successfully" });
  } catch (err) {
    console.log("Update record errr", err);
    return response.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    let { id } = request.params;

    const result = await Book.findByIdAndDelete(id);
    console.log("Delete -> Result ", result);
    if (!result) {
      return response.status(404).send({
        status: 404,
        message: "Book id is not found",
      });
    }
    return response
      .status(200)
      .send({ status: 200, message: "Book deleted successfully" });
  } catch (error) {
    console.log("Delete API catch --> ", error);
    return response.status(500).send({ message: "Book id not found" });
  }
});

export default router;
