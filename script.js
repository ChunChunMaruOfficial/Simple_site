
let count = 59
const c3 = document.querySelector('.c3');
const c2 = document.querySelector('.c2');

const timer = setInterval(function () {
    count--;
    c3.innerHTML = count;

    if (count === 0) {
        c2.innerHTML -= 1
        count = 59
        c3.innerHTML = count
    }
}, 1000);

let req = ''

const response = async () => {
    const url = new URL("https://6529155f55b137ddc83e2dc6.mockapi.io/items");
    let data = await fetch(url); //ждем пока фетч получит и обработает json
    req = await data.status; //что
    return await data.json();
};

let data = await response(); //короче дата это массив

 data = data.slice(0, 4);

function render() {
    data.map((v, i) => {
        let crP = document.createElement('p')
        let crDiv = document.createElement('div')

        crDiv.classList.add('card')
        document.querySelector('.content').appendChild(crDiv)

        let crDivChild = document.createElement('div')
        crDivChild.style.backgroundImage = `url(${v.img})`
        crDiv.appendChild(crDivChild)

        let crDivsecondChild = document.createElement('div')
        crDiv.appendChild(crDivsecondChild)

        crP.innerHTML = v.name
        crDivsecondChild.appendChild(crP)

        let crSpan = document.createElement('span')
        crDivsecondChild.appendChild(crSpan)

        let crsSpanP = document.createElement('p')
        crsSpanP.innerHTML = v.owner
        crSpan.appendChild(crsSpanP)

        let crsecondSpanP = document.createElement('p')
        crsecondSpanP.innerHTML = `${v.price} ETH`
        crSpan.appendChild(crsecondSpanP)
    })
}
render()

document.querySelector(".load_more").addEventListener("click", () => {
    render()
  });