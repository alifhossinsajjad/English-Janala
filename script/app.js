const createElement = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`)
    return(htmlElements.join(" "));
}


const manageaSpinner = (status) => {
  if(status === true){
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("word-container").classList.add("hidden")
  }else{
    document.getElementById("word-container").classList.remove("hidden")
    document.getElementById("spinner").classList.add("hidden")
  }
}




const loadlessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageaSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};


const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const res = await fetch(url);
  const details = await res.json ();
  displayWordDetails(details.data);
};


const displayWordDetails = (word) => {
const detailsBox = document.getElementById("details-container");
detailsBox.innerHTML =`<div class="">
                        <h2 class="text-2xl font-bold">
                            ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
                        </h2>
                    </div>
                    <div class="">
                        <h2 class="font-bold">
                           Meaning
                        </h2>
                        <P>${word.meaning}</P>
                    </div>
                    <div class="">
                        <h2 class="font-bold">
                           Example
                        </h2>
                        <P>${word.sentence}</P>
                    </div>
                    <div class="">
                        <h2 class="font-bold">
                           Synonyms
                        </h2>
                        <div>
                          ${createElement(word.synonyms)}
                        </div>

                        
                        `;
document.getElementById("word_modal").showModal();
}


const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");

  wordContainer.innerHTML = " ";

  if (words.length === 0) {
    wordContainer.innerHTML = `
      <div class="text-center col-span-full space-y-6 p-6">
                <img class=" mx-auto" src="./assets/alert-error.png" alt="">
                <p class="text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
                <h2 class="font-bangla text-4xl font-bold">নেক্সট Lesson এ যান</h2>
            </div>
     `;
     manageaSpinner(false);
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `

             <div class=" bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="text-2xl font-bold">${
              word.word ? word.word : "শব্দ পাওয়া যায়নি"
            }</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>  
            <div class="font-bangla text-2xl font-medium">${
              word.meaning ? word.meaning : "মিনিং পাওয়া যায়নি "
            }/${
      word.pronunciation ? word.pronunciation : "শব্দের অর্থ পাওয়া যায়নি "
    }</div>   
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div> 
        </div>
            
            `;
    wordContainer.append(card);
  });

  manageaSpinner(false);
};

const displayLessons = (lessons) => {
  const lavelContainer = document.getElementById("lavel-container");

  lavelContainer.innerHTML = "";

  for (let lesson of lessons) {
    console.log(lesson);
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `
           <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord (${lesson.level_no})" class="btn btn-outline btn-primary cursor-pointer lesson-btn">
           <i class="fa-brands fa-leanpub"></i> Lesson ${lesson.level_no}
           <button>

        `;
    lavelContainer.append(btnDiv);
  }
};
loadlessons();
