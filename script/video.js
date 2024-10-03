function getTimeString(time) {
  // get hour and rest seconds
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hours ${minute} minutes ${remainingSecond} seconds ago`;
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

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

// loading videos
const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json()) // converting to json()
    .then((data) => displayVideos(data.videos)) // exporting the data to the displayCategories function
    .catch((error) => console.log(error));
};

// loading display details
const loadDetails = async (videoId) => {
  console.log(videoId);
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};

// displaying details function
const displayDetails = (video) => {
    console.log(video);
    const detailsContainer = document.getElementById('modal-content');

    detailsContainer.innerHTML = `
        <img src=${video.thumbnail}/>
        <p>${video.description}</p>
    `

    // way 1
    // document.getElementById('showModalData').click();

    // way 2
    document.getElementById('customModal').showModal();
};

// creating videos displaying function
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
        <div class="min-h-[400px] flex flex-col gap-5 justify-center items-center">
            <img src="assets/Icon.png" alt="">
            <h2 class="text-center font-bold text-2xl">No content here in this category</h2>
        </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  // for each item of videos
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure class = "h-[200px] relative">
        <img class = "w-full h-full object-cover"
        src=${video.thumbnail}
        alt="Shoes" />
        ${
          video.others.posted_date?.length == 0
            ? ""
            : `<span class="absolute text-xs right-2 bottom-2 bg-black rounded p-1 text-white">${getTimeString(
                video.others.posted_date
              )}</span>`
        }
        
    </figure>
    <div class="py-2 px-0 flex gap-2">
        <div >
            <img class="w-10 h-10 rounded-full object-cover" src=${
              video.authors[0].profile_picture
            } />
        </div>
        <div>
            <h2 class="font-bold">${video.title}</h2>
            <div class="flex gap-2 items-center" >
                <p class="text-gray-400">${video.authors[0].profile_name}</p>

                ${
                  video.authors[0].verified === true
                    ? '<img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=p9jKUHLk5ejE&format=png&color=000000"/>'
                    : ""
                }
            </div>
            <p><button onclick="loadDetails('${
              video.video_id
            }')" class="btn btn-sm btn-error">Details</button></p>
        </div>
    </div>
    `;
    videoContainer.append(card);
  });
};

const loadCategoriesVideos = (id) => {
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json()) // converting to json()
    .then((data) => {
      // sobaike active class remove koro
      removeActiveClass();
      // id er class k active koro
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    }) // exporting the data to the displayCategories function
    .catch((error) => console.log(error));
};

// create displayCategories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    // using forEach to separate the items from the array

    // creating btn
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class="btn category-btn">
            ${item.category}
        </button>
    `;

    // add button to category container
    categoryContainer.append(buttonContainer);
  });
};

// search input functionality
document.getElementById('search-input').addEventListener('keyup', (e)=>{
    loadVideos(e.target.value);
})

// calling functions
loadCategories();
loadVideos();
