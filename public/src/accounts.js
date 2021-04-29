//This function uses the find method. The find method uses a callback function
//and returns the first item that matches the condition. -AN
function findAccountById(accounts, id) {
  let findID = accounts.find((accountObj)=> accountObj.id === id);
  return findID;
}

//This function sorts accounts by last name using the sort method. 
//The sort method compares each character value and returns a sorted array. -AN
function sortAccountsByLastName(accounts) {
  let sortByLastName = accounts.sort((user1, user2) => {
    const lastName1 = user1.name.last.toLowerCase();
    const lastName2 = user2.name.last.toLowerCase();

    return (lastName1 > lastName2 ? 1 : -1);
  });
  return(sortByLastName);
}

//This function looks through the account data set for an ID and utilizes forEach
//to search for a matching ID in books data set. If a match is found a counter
//will be incremented which represents number of times the book was borrowed. -AN
function getTotalNumberOfBorrows(account, books) {
  const ID = account.id;
  let totalBorrowed = 0;

  books.forEach((book) => {
    if(book.borrows.some((borrowList) => borrowList.id.includes(ID)))
      {
        totalBorrowed++;
      }
      return totalBorrowed;
  });
  return totalBorrowed;
}

//This function first filters through the books data set by using the some method. 
//The some method checks the "borrows" array and its objects if it includes a 
//matching account ID and if the value for returned is false. If this condition
//is true, then the object will be added to a new array created by filter called
//filterByID. The forEach method is then used to iterate through the filterByID 
//array and utilizes the find method to return an author with a matching authorId.
//If the find method does not return undefined, a key "author" is created and its
//value will be the object found. The updated filterByID array will then be pushed
//to an empty array and returned. -AN
function getBooksPossessedByAccount(account, books, authors) {
  const ID = account.id;
  const checkedOutArray = [];
  let filterByID = books.filter((bookList) => {
    const someCheck = bookList.borrows.some((borrowList) => borrowList.id.includes(ID) && !borrowList.returned);
    return someCheck;
  });

  filterByID.forEach((filteredArr) => {
    let newAuthor = authors.find((authorList) => authorList.id === filteredArr.authorId);
    if(newAuthor != undefined)
      {
        filteredArr["author"] = newAuthor;
        checkedOutArray.push(filteredArr);
      }
  });
  return checkedOutArray;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
