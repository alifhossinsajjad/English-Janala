const loadlessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");

  wordContainer.innerHTML = " ";

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `

             <div class=" bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="text-xl font-bold">${word.word}</h2>
            <p class="">Meaning /Pronounciation</p>  
            <div class="font-bangla text-2xl font-semibold">${word.meaning}/${word.pronunciation}</div>   
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div> 
        </div>
            
            `;
    wordContainer.append(card);
  });
};

const displayLessons = (lessons) => {
  const lavelContainer = document.getElementById("lavel-container");

  lavelContainer.innerHTML = "";

  for (let lesson of lessons) {
    console.log(lesson);
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `
           <button onclick="loadLevelWord (${lesson.level_no})" class="btn btn-outline btn-primary cursor-pointer">
           <i class="fa-brands fa-leanpub"></i> Lesson ${lesson.level_no}
           <button>

        `;
    lavelContainer.append(btnDiv);
  }
};
loadlessons();
