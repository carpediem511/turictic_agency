import { format, differenceInDays } from "date-fns"
import { doc } from "prettier"
const { default: ru } = require("date-fns/locale/ru")

let arr = []

async function getData() {
  const response = await fetch( //получить данные с сервера
    "https://www.bit-by-bit.ru/api/student-projects/tours"
  ) 

  const data = await response.json() //прочитать данные, полученные с сервера

  arr = data

  return data //данные готовы к использованию

}

async function init() {
    const tours = await getData()
    renderTours(tours)

    document.getElementById("countriesFilter").addEventListener("change", () => filterByCountry(tours))

}

function renderTours (tours) {

  tours.forEach((tour) => {
    const duration = differenceInDays(
      new Date(tour.endTime),
      new Date(tour.startTime)
    )

    const city = checkCity(tour)

    document.getElementById("tours-all").innerHTML = " "

    if (tours.length === 0) {

        document.getElementById("tours-all").innerHTML = "По вашему запросу не найдено ни одного тура... Попробуйте выбрать другой вариант"
    
    } else {

        tours.forEach(tour => {

            document.getElementById("tours-all").innerHTML +=
         `
            
            <div class="tour bg-blue-50 rounded-3xl border-sky-500 border-2 max-w-md xl:w-1/4 mx-10 my-10" id="tourId">
                <div>
                    <div class="flex justify-center pt-6 max-h-6">
                        <img class="px-8 w-full h-full object-center max-h-48 sm:max-h-54 md:max-h-28 lg:max-h-32 xl:max-h-48" src="${tour.image}">
                    </div>
    
                    <div class="title flex flex-col absolute font-attention">
                        <div class="text-amber-600 pl-2.5 pt-1.5 xl:text-4xl">${tour.country}</div>
                        <div class="text-current mb-2.5 pl-2.5 xl:text-2xl" id="cityId">${city}</div>
                    </div>
                </div>
    
                <div class="flex flex-col info border drop-shadow-lg xl:mx-10 my-10">
                
                    <div class="font-basic text-sky-600 text-center font-semibold px-2 xl:text-2xl pt-6 pb-6">
                    ${tour.hotelName}
                    </div>
                
                    <div class="font-basic text-current text-sm text-center pb-6 font-bold xl:pt-6">
                    ${format(new Date(tour.startTime), "dd MMMM y", {locale: ru})} -
                    ${format(new Date(tour.endTime), "dd MMMM y", {locale: ru})}
                    <span class="text-sky-900 underline decoration-solid underline-offset-4 text-sm"><br>
                    продолжительность:</span> ${duration} дней
                    </div>
                    </div>
                
                    <div class="flex flex-col pb-10 pt-6 px-2 xl:px-10">
                        <div class="flex">
                            <img src="/images/icon-price.png" class="w-12 h-12">
                            <div class="font-basic text-rose-700 pt-6  pl-2 xl:text-3xl font-bold">
                            ${tour.price}
                            </div> 
                            <p class="font-basic text-rose-700 pt-9 pl-2 xl:text-base">рублей</p>
                        </div>
    
                        <div class="flex"">
                            <img src="/images/icon-rating.png" class="w-12 h-12">
                            <div class="font-basic text-amber-500 pt-4 pl-2 xl:text-2xl font-medium" id="rating">
                            ${tour.rating}
                            </div> 
                            <p class="font-basic text-amber-500 pt-6 pl-2 xl:text-base">по версии TopHotels.com</p>
                        </div>
                    </div>
                </div>
        </div>
            `
        })}})}

function checkCity(tour) {
  if (tour.city != null && tour.city.length > 0) {
    return tour.city
  } else {
    return " "
  }
}

function filterByCountry(tours) {

 const countriesFieldset = Array.from(document.querySelectorAll("#countriesFilter .checkbox")) //получаем все значения из всех чекбоксов
                                                                                               // в виде массива
 let checkedCountries = []      //пустой массив, в котором будут отфильтрованные страны

 countriesFieldset.forEach((checkbox) => { // проходимся по каждому чекбоксу

    if (checkbox.checked === true) { //если чекбокс выбран

        checkedCountries.push(checkbox.name) //добавить его в пустой массив
    }
 })

    if (checkedCountries) { //если отфильтрованные страны
    
       const filteredTours = tours.filter((tour) => { //фильтр по турам
        
        return checkedCountries.includes(tour.country) //возвращаем отфильтрованные туры, добавляем выбранную страну
      
    })
 
   renderTours(filteredTours) 

   } else {
       renderTours(tours)
   }


}

const twoStar = document.getElementById("emptyStar2")

twoStar.addEventListener("click", () => {

    const filteredTours = arr.filter((tour) => {

        if (tour.rating >= 3 && tour.rating <=5) {

            renderTours(filteredTours) 

        } else {

            document.getElementById("tours-all").innerHTML = "По вашему запросу не найдено ни одного тура... Попробуйте выбрать другой вариант"

        }
    })

})



const threeStar = document.getElementById("emptyStar3")
let checkedCountries = []      //пустой массив, в котором будут отфильтрованные страны

function filterByRating(tours) {
    const getDataOfRating = Array.from(document.querySelectorAll("#rating .star"))

    threeStar.addEventListener("click", () => {
    
        
        getDataOfRating.forEach((tours) => { // проходимся по каждому чекбоксу
       
           if (threeStar.addEventListener("click")) { //если чекбокс выбран
       
               checkedCountries.push() //добавить его в пустой массив
           }
        })
       
           if (checkedCountries) { //если отфильтрованные страны
           
              const filteredTours = tours.filter((tour) => { //фильтр по турам
               
               return checkedCountries.includes(tour.country) //возвращаем отфильтрованные туры, добавляем выбранную страну
             console.log("результат", checkedCountries)
           })
        
          renderTours(filteredTours) 
       
          } else {
              renderTours(tours)
          }
       
       
       }
    )
}





//let changeIcon = document.getElementById(`emptyStar-${star.id}`)
//changeIcon.addEventListener("mouseover", () => {
   // changeIcon.src = "/images/icon-chooseStar.png"
//}) не получилось минимизировать код



let onChangeIcon2 = document.getElementById("emptyStar2").addEventListener("mouseover", () => {
    document.getElementById("emptyStar2").src = "/images/icon-chooseStar.png"

    document.getElementById("emptyStar2").addEventListener("click", filterByRating)
})

let offChangeIcon2 = document.getElementById("emptyStar2").addEventListener("mouseout", () => {
    document.getElementById("emptyStar2").src = "/images/icon-emptyStar.png"
})

let onchangeIcon3 = document.getElementById("emptyStar3").addEventListener("mouseover", () => {
    document.getElementById("emptyStar3").src = "/images/icon-chooseStar.png"
    document.getElementById("emptyStar2").src = "/images/icon-chooseStar.png"
})

let offChangeIcon3 = document.getElementById("emptyStar3").addEventListener("mouseout", () => {
    document.getElementById("emptyStar3").src = "/images/icon-emptyStar.png"
    document.getElementById("emptyStar2").src = "/images/icon-emptyStar.png"
})

let onchangeIcon4 = document.getElementById("emptyStar4").addEventListener("mouseover", () => {
    document.getElementById("emptyStar4").src = "/images/icon-chooseStar.png"
    document.getElementById("emptyStar3").src = "/images/icon-chooseStar.png"
    document.getElementById("emptyStar2").src = "/images/icon-chooseStar.png"
})

let offChangeIcon4 = document.getElementById("emptyStar4").addEventListener("mouseout", () => {
    document.getElementById("emptyStar4").src = "/images/icon-emptyStar.png"
    document.getElementById("emptyStar3").src = "/images/icon-emptyStar.png"
    document.getElementById("emptyStar2").src = "/images/icon-emptyStar.png"
})

let onchangeIcon5 = document.getElementById("emptyStar5").addEventListener("mouseover", () => {
    document.getElementById("emptyStar5").src = "/images/icon-chooseStar.png"
    document.getElementById("emptyStar4").src = "/images/icon-chooseStar.png"
    document.getElementById("emptyStar3").src = "/images/icon-chooseStar.png"
    document.getElementById("emptyStar2").src = "/images/icon-chooseStar.png"
})

let offChangeIcon5 = document.getElementById("emptyStar5").addEventListener("mouseout", () => {
    document.getElementById("emptyStar5").src = "/images/icon-emptyStar.png"
    document.getElementById("emptyStar4").src = "/images/icon-emptyStar.png"
    document.getElementById("emptyStar3").src = "/images/icon-emptyStar.png"
    document.getElementById("emptyStar2").src = "/images/icon-emptyStar.png"
})


getData()
init()
