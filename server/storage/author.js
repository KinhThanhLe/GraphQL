const Author = require("../models/author");

class AuthorStore {
  fetchAuthors = async function () {
    try {
      return await Author.find({});
    } catch (error) {
      console.error("Error fetching authors:", error);
      throw error;
    }
  };

  fetchAuthorById = async function (authorId) {
    try {
      return await Author.findOne({ id: authorId });
    } catch (error) {
      console.error("Error fetching author:", error);
      throw error;
    }
  };

  createNewAuthor = async function (args) {
    try {
      const authorCount = await Author.countDocuments();

      const newAuthor = new Author({
        id: authorCount + 1,
        name: args.author.name,
        age: args.author.age,
      });

      return await newAuthor.save();
    } catch (error) {
      console.error("Error creating author:", error);
      throw error;
    }
  };
}

module.exports = new AuthorStore();
