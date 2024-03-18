
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appSettings = {
  databaseURL: "https://cart-app-30025-default-rtdb.firebaseio.com/"
}



const app = initializeApp(appSettings)
const database = getDatabase(app)
const addCart = ref(database, "product")

const newbtn = document.getElementById("newbtn")
const input = document.querySelector("#input-feild")
const saveBtn = document.querySelector("#btn")
saveBtn.addEventListener("click", () => {
  let inputValue = input.value
  push(addCart, inputValue)
  clearInputFeild()

})

onValue(addCart, function (x) {
  if (x.exists()) {
    let listEl = Object.entries(x.val())
    clearInput()
    for (let i = 0; i < listEl.length; i++) {
      let currentItem = listEl[i]
      let currentItemID = currentItem[0]
      let currentItemValue = currentItem[1]
      appendItemsToAddCart(currentItem)
    }
  } else{
    newbtn.innerHTML = "NO ITEM IS HERE....."
  }
})

function clearInputFeild() {
  input.value = ""
}

function appendItemsToAddCart(item) {
  let itemID = item[0]
  let itemValue = item[1]
  let newEl = document.createElement("li")
  newEl.textContent = `${itemValue}`
  newbtn.append(newEl)
  newEl.addEventListener("dblclick", function () {
    let exactLocationOfItemInDB = ref(database, `product/${itemID}`)
    remove(exactLocationOfItemInDB)
  })
}

function clearInput() {
  newbtn.innerHTML = ""
}