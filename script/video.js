// 1- fetch, load and show categories on html

// logic --------
// create loadCategories
const loadCategories = () => {
  //   fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json()) // converting to json()
    .then((data) => displayCategories(data.categories)) // exporting the data to the displayCategories function
    .catch((error) => console.log(error));
};

// create displayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

  categories.forEach((item) => { // using forEach to separate the items from the array
    
    // creating btn
    const button = document.createElement('button');
    button.classList = 'btn';
    button.innerText = item.category;

    // add button to category container
    categoryContainer.append(button);
  });
};

loadCategories();
