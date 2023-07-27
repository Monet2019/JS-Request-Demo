


console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns') //presentDefault
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = 'http://localhost:4000'

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

const getAllChars = () => {
  clearCharacters()
  axios
  .get(baseURL + '/characters')
  .then((res) => {
console.log(res.data)
res.data.forEach(createCharacterCard)
  })
  .catch((err) => {
    console.error(err)
  })
}

const getOneChar = (event) => {
  clearCharacters()
axios
.get(baseURL + `/character/${(event.target.id)}`)
.then((res) => {
  createCharacterCard(res.data)
})
.catch((err) => {
  console.error(err)
})
}

const getoldChars = (event) => {
  event.preventDefault()
  clearCharacters()
axios
.get(baseURL + `/character/?age=${ageInput.value}`)
.then((res) => {
  res.data.forEach(createCharacterCard)
})
.catch((err) => {
  console.error(err)
})
}

const createChar = (event) => {
event.preventDefault()
clearCharacters()


let newLikes = newLikesText.value.split(', ')

let body = {
  firstName: newFirstInput.value,
  lastName: newLastInput.value,
  gender: newGenderDropDown.value,
  age: newAgeInput.value,
  likes: newLikes
}
axios
.post(baseURL + `/character`, body)
.then((res) => {
  res.data.foreach(createCharacterCard)

})
.catch((err) => {
  console.error(err)
})

newAgeInput.value = ""
newFirstInput.value = ""
newLastInput.value = ""
newGenderDropDown.value = ""
newLikesText.value = ""
}

getAllBtn.addEventListener("click" , getAllChars)
charBtns.forEach((btn) => btn.addEventListener('click', getOneChar))
ageForm.addEventListener('submit' , getoldChars)
createForm.addEventListener('submit', createChar)(err) => {
  console.error(err)
}