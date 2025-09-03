
const loadlessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=>res.json())
    .then((json)=>displayLessons(json.data))
    
}
const displayLessons = (lessons) => {
    const lavelContainer = document.getElementById("lavel-container");

    lavelContainer.innerHTML = "";

    for(let lesson of lessons){
        console.log(lesson)
        const btnDiv = document.createElement("div");

        btnDiv.innerHTML = `
           <button class="btn btn-outline btn-primary">
           <i class="fa-brands fa-leanpub"></i> Lesson ${lesson.level_no}
           <button>

        `
        lavelContainer.append(btnDiv)
    }
};
 loadlessons();