document.addEventListener("DOMContentLoaded", function () {
  loadingImgs();

  loadBreeds();
});

function loadingImgs() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  fetch(imgUrl)
    .then((res) => res.json())
    .then((dogsImgs) => {
      dogsImgs.message.map((dogImgLink) => {
        addImg(dogImgLink);
      });
    });
}

function addImg(imgLink) {
  const imgContainer = document.getElementById("dog-image-container");
  const imgElement = document.createElement("img");
  imgElement.setAttribute("src", imgLink);
  imgContainer.appendChild(imgElement);
}
function addBreeds(breeds) {
  const ulElement = document.getElementById("dog-breeds");
  const liElement = document.createElement("li");
  liElement.innerHTML = breeds;
  ulElement.appendChild(liElement);
  liElement.addEventListener("click", (e) => {
    e.target.style.color = "red";
  });
}

let breeds = [];
function loadBreeds() {
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  fetch(breedUrl)
    .then((res) => res.json())
    .then((data) => {
      const breeds = Object.keys(data.message);
      breeds.forEach((breed) => {
        addBreeds(breed);
      });

      const ulElement = document.getElementById("dog-breeds");
      const filterDropdown = document.getElementById("breed-dropdown");
      function filterBreedsByLetter(letter) {
        const filteredBreeds = breeds.filter((breed) =>
          breed.startsWith(letter)
        );

        filteredBreeds.forEach((breed) => {
          const listItem = document.createElement("li");
          listItem.textContent += breed;
          ulElement.appendChild(listItem);
          console.log(breed);
        });
      }
      filterDropdown.addEventListener("change", () => {
        ulElement.innerHTML = "";
        const selectedLetter = filterDropdown.value;
        filterBreedsByLetter(selectedLetter);
      });
    });
}
