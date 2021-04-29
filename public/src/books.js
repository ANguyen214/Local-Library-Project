//This function utilizes the find method to find the correct 
//author by given id in the authors array. -AN
function findAuthorById(authors, id) {
  let findAuthor = authors.find((author) => author.id === id);
  return findAuthor;
}

//This function utilizes the find method to find the correct 
//book by given id in the books array. -AN
function findBookById(books, id) {
  let findBook = books.find((book) => book.id === id);
  return findBook;
}

//This function utilizes the filter method. The first filter
//filters by using the some method and checks if the returned
//key contains a false value. The second filter uses the every
//method to check if the returned key contains a true value. 
//Since the filter method returns an array, both resulting 
//arrays will be pushed into partitionedBooks and returned. -AN
function partitionBooksByBorrowedStatus(books) {
  const partitionedBooks = [];

  let notReturnedBooks = books.filter((book) => {
    const someCheck = book.borrows.some((borrowList) => borrowList.returned === false );
    return someCheck;
  });

  let returnedBooks = books.filter((book) => {
    const everyCheck = book.borrows.every((borrowList) => borrowList.returned === true );
    return everyCheck;
  });

  partitionedBooks.push(notReturnedBooks, returnedBooks);
  return partitionedBooks;
}

//This function iterates through a books "borrows" key by using forEach. 
//Each iteration will utilize the find method which is passed the accounts 
//array. This will search for an id in the accounts array that matches the
//id in the borrowList. If one is found and is not a duplicate, a "returned"
//key will be created and the returned value from borrowList will be assigned
//to that key. The entire object is then pushed into into an empty array. 
//Once forEach is finished the entire array will be returned. -AN
function getBorrowersForBook(book, accounts) {
  const borrowList = book.borrows;
  const borrowedBy = [];
  borrowList.forEach((borrow) => {
    let findAccount = accounts.find((account) => account.id.includes(borrow.id));
    let dupliCheck = borrowedBy.some((borrow) => borrow.id === findAccount.id);
    if(findAccount != undefined && !dupliCheck)
      {
        findAccount["returned"] = borrow.returned;
        borrowedBy.push(findAccount);
      }
    return borrowedBy;
  });
  return borrowedBy;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
