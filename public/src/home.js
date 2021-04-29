//This function counts the number of books by determining the length of 
//the books array. -AN
function getTotalBooksCount(books) {
  const totalBookCount = books.length;
  return totalBookCount;
}

//This function counts the number of accounts by determining the length of 
//the accounts array. -AN
function getTotalAccountsCount(accounts) {
  const totalAccounts = accounts.length;
  return totalAccounts;
}

//This function imports and calls a function from books.js.
//This call allowed me to use the filter I created previously
//at index 0 which counts the number of books that are borrowed
//and returns the length of that array. -AN
function getBooksBorrowedCount(books) {
  const importBooks = require("./books.js");
  const partitionFunc = importBooks.partitionBooksByBorrowedStatus(books);
  return partitionFunc[0].length;
}

//This function is able to access the most common genres by utilizing
//a forEach method. By iterating through the books array, I first check
//to see if any duplicates are in my initially empty array. If not, 
//an object is created with the appropriate parameters and pushed 
//into that array. If there is a duplicate, increase the counter.
//The entire array is returned, sorted, and length is limited to 
//a max of 5 to display top 5 most common genres. -AN
function getMostCommonGenres(books) {
  const commonBooks = [];

  books.forEach((book) => {
    const dupliCheck = commonBooks.some((commonList) => commonList.name === book.genre);
    if(!dupliCheck)
      {
        let newObject = {
          name: book.genre,
          count: 1,
        };
        commonBooks.push(newObject);
      }else{
        let findGenre = commonBooks.find((commonList) => commonList.name === book.genre);
        findGenre.count++;
      }
      return commonBooks;
  });

  commonBooks.sort((genre1, genre2) => genre1.count < genre2.count ? 1 : -1);
  commonBooks.length = 5;
  return commonBooks;
}

//This function operates very similarly to getMostCommonGenres
//with the difference being in how the count is accumulated. -AN
function getMostPopularBooks(books) {
  const popularBooks = [];

  books.forEach((book) => {
    const dupliCheck = popularBooks.some((popularList) => popularBooks.name === book.title);
    if(!dupliCheck)
      {
        let newObject = {
          name: book.title,
          count: book.borrows.length,
        };
        popularBooks.push(newObject);
      }else{
        let findTitle = popularBooks.find((popularList) => popularList.name === book.title);
        findTitle.count += book.borrows.length;
      }
      return popularBooks;
  });

  popularBooks.sort((title1, title2) => title1.count < title2.count ? 1 : -1);
  popularBooks.length = 5;
  return popularBooks;
}

//This function calls the getMostPopularBooks function
//and updates that array to display the author name 
//instead of the book title. -AN
function getMostPopularAuthors(books, authors) {
  let popularBooksToAuthors = getMostPopularBooks(books);

  popularBooksToAuthors.forEach((popBookList) => {
    let findBooks = books.find((bookList) => popBookList.name === bookList.title );
    let findAuthor = authors.find((authorList) => findBooks.authorId === authorList.id);
    const firstName = findAuthor.name.first;
    const lastName = findAuthor.name.last;
    popBookList.name = `${firstName} ${lastName}`;
    return popBookList;
  });

  return popularBooksToAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
