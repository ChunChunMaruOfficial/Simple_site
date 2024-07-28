let keepsarray = []
let checkboxes = document.querySelectorAll('input[type="checkbox"]');

let add = document.querySelector('.add')
let task = document.querySelector('.task')
let right = document.querySelector('.month')
let goals = document.querySelector('.goals')

if (localStorage.getItem('keepsarray')) {
  localStorage.getItem('keepsarray')
  keepsarray = JSON.parse(localStorage.getItem('keepsarray'))
  Array.isArray(keepsarray) ? '' : keepsarray = [keepsarray]

  keepsarray.map((v) => {
    render(v.time, v.text, v.done)
  })
} else {
  localStorage.setItem('keepsarray', '')
}

let tempnegativearray = keepsarray.filter(function (v) {
  return v.done == true
})

goals.innerHTML = `${tempnegativearray.length } GOALS FOR THIS MONTH`

const year = new Date().getFullYear()
const day = new Date().getDate()
const month = new Date().toLocaleString('default', { month: 'long' });
document.querySelector('.date>span').innerHTML = `${day}th ${month}, ${year}`

function render(time, text, done) {
  let crDiv = document.createElement('div')
  let crTime = document.createElement('p')
  crTime.innerText = time
  let crText = document.createElement('p')
  crText.innerText = text
  crDiv.append(crText,crTime)
  if (done === true) {
    right.appendChild(crDiv)
    crDiv.classList.add('done')
  } else {
    task.appendChild(crDiv)
    let crCheck = document.createElement('input')
    crCheck.setAttribute("type", "checkbox"); //это шоб сделать инпут чекобокс
    crDiv.appendChild(crCheck)
  }
  crDiv.classList.add('simpletask')
  document.querySelector('.time').value = ''
  document.querySelector('.text').value = ''
  document.querySelector('.time').focus()
  checkboxes = document.querySelectorAll('input[type="checkbox"]')
  console.log('checkboxes', checkboxes);
}



document.querySelector('.destroy').addEventListener("click", function () {
  localStorage.clear()
  let keeps = document.getElementsByClassName('simpletask');
  while (keeps[0]) {
    keeps[0].parentNode.removeChild(keeps[0]);
  }
})


checkboxes.forEach((checkbox, i) => {
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      const temparray = (JSON.parse(localStorage.getItem('keepsarray'))).filter(function (v) {
        return v.done == false
      })
      temparray[i].done = true
      render(temparray[i].time, temparray[i].text, temparray[i].done)
      this.parentElement.remove()

      for (let v of tempnegativearray) {
        temparray.push(v)
      }
      localStorage.setItem('keepsarray', JSON.stringify(temparray))
    }

    tempnegativearray = keepsarray.filter(function (v) { //проверка на колво выполненных, но оно должно работать елси заработает новый чекбокс
      return v.done == true
    })
  })
})

add.addEventListener("click", function () {
  let time = document.querySelector('.time').value
  let text = document.querySelector('.text').value
  let done = false
  if (time != '' && text != '') {
    keepsarray.push({ time, text, done })
    localStorage.setItem('keepsarray', JSON.stringify(keepsarray))

    render(JSON.parse(localStorage.getItem('keepsarray'))[JSON.parse(localStorage.getItem('keepsarray')).length - 1].time, JSON.parse(localStorage.getItem('keepsarray'))[JSON.parse(localStorage.getItem('keepsarray')).length - 1].text, JSON.parse(localStorage.getItem('keepsarray'))[JSON.parse(localStorage.getItem('keepsarray')).length - 1].done)
    checkboxes = document.querySelectorAll('input[type="checkbox"]')
  } else {
    alert('пожалуйста, введите время и текст')
  }
})