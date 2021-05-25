const viewSection = document.querySelector(".view-section")
const contactsSection = document.querySelector(".contacts-section")

const state = {
  contacts: [
    // {
    //   "id": "1",
    //   "firstName": "Boris",
    //   "lastName": "Johnson",
    //   "blockContact": true,
    //   "addressId": 1,
    //   "address": {
    //     "id": 1,
    //     "street": "10 Downing Street",
    //     "city": "London",
    //     "postCode": "SW1A 2AB"
    //   }
    // },
    // {
    //   "id": "2",
    //   "firstName": "The",
    //   "lastName": "Queen",
    //   "blockContact": false,
    //   "addressId": 2,
    //   "address": {
    //     "id": 2,
    //     "street": "Buckingham Palace",
    //     "city": "London",
    //     "postCode": "SW1A 1AA"
    //   }
    // }
  ],
  selectedContact: null,
}

/* [START] NO NEED TO EDIT */

function getContacts() {
  fetch("http://localhost:3000/contacts")
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      state.contacts = data
      viewSection.innerHTML = ""

      renderContactsList()
    })
}

function renderContactsList() {
  const listEl = document.createElement("ul")
  listEl.className = "contacts-list"

  for (let i = 0; i < state.contacts.length; i++) {
    const contact = state.contacts[i]
    const listItemEl = renderContactListItem(contact)

    listEl.append(listItemEl)
  }

  contactsSection.append(listEl)
}

function renderAddressSection(address) {
  const containerEl = document.createElement("section")

  const headingEl = document.createElement("h2")
  headingEl.innerText = "Address"

  containerEl.append(headingEl)

  const streetText = document.createElement("p")
  streetText.innerText = address.street

  containerEl.append(streetText)

  const cityText = document.createElement("p")
  cityText.innerText = address.city

  containerEl.append(cityText)

  const postCodeText = document.createElement("p")
  postCodeText.innerText = address.postCode

  containerEl.append(postCodeText)

  return containerEl
}

function renderContactView() {
  const contact = state.selectedContact

  if (!contact) return

  viewSection.innerHTML = ""

  const containerEl = document.createElement("article")
  containerEl.className = "center light-shadow address-card"

  const headingEl = document.createElement("h1")

  const fullName = `${contact.firstName} ${contact.lastName}`
  headingEl.innerText = fullName

  containerEl.append(headingEl)

  const addressSectionEl = renderAddressSection(contact.address)

  containerEl.append(addressSectionEl)

  viewSection.append(containerEl)
}

/* [END] NO NEED TO EDIT */

function renderContactListItem(contact) {
  const listItemEl = document.createElement("li")

  const headingEl = document.createElement("h3")

  const fullName = `${contact.firstName} ${contact.lastName}`

  headingEl.innerText = fullName

  listItemEl.append(headingEl)

  const viewBtn = document.createElement("button")
  viewBtn.className = "button grey"
  viewBtn.innerText = "View"

  viewBtn.addEventListener("click", function () {
    state.selectedContact = contact

    renderContactView()
  })

  listItemEl.append(viewBtn)

  const editBtn = document.createElement("button")
  editBtn.className = "button blue"
  editBtn.innerText = "Edit"

  editBtn.addEventListener("click", function () {
    // select person that this edit button is on
    // fetch address of that person
    // display form and get new input for bits to change
    // on submit patch these new pieces of information

    state.selectedContact = contact

    viewSection.innerHTML = ""
    renderEditForm(contact)
  })

  listItemEl.append(editBtn)

  return listItemEl
}

function renderEditForm(contact) {
  const formEl = document.createElement("form")
  formEl.setAttribute("class", "form-stack light-shadow center contact-form")

  const h1El = document.createElement("h1")
  h1El.innerText = "Edit Contact"

  const firstNameLabel = document.createElement("label")
  firstNameLabel.setAttribute("for", "first-name-input")
  firstNameLabel.innerText = "First Name:"

  const firstNameInput = document.createElement("input")
  firstNameInput.setAttribute("id", "first-name-input")
  firstNameInput.setAttribute("name", "first-name-input")
  firstNameInput.setAttribute("type", "text")
  firstNameInput.value = contact.firstName

  const lastNameLabel = document.createElement("label")
  lastNameLabel.setAttribute("for", "last-name-input")
  lastNameLabel.innerText = "Last Name:"

  const lastNameInput = document.createElement("input")
  lastNameInput.setAttribute("id", "last-name-input")
  lastNameInput.setAttribute("name", "last-name-input")
  lastNameInput.setAttribute("type", "text")
  lastNameInput.value = contact.lastName

  const streetInputLabel = document.createElement("label")
  streetInputLabel.setAttribute("for", "street-input")
  streetInputLabel.innerText = "Street:"

  const streetInput = document.createElement("input")
  streetInput.setAttribute("id", "street-input")
  streetInput.setAttribute("name", "street-input")
  streetInput.setAttribute("type", "text")
  streetInput.value = contact.address.street

  const cityInputLabel = document.createElement("label")
  cityInputLabel.setAttribute("for", "city-input")
  cityInputLabel.innerText = "City:"

  const cityInput = document.createElement("input")
  cityInput.setAttribute("id", "city-input")
  cityInput.setAttribute("name", "city-input")
  cityInput.setAttribute("type", "text")
  cityInput.value = contact.address.city

  const postCodeInputLabel = document.createElement("label")
  postCodeInputLabel.setAttribute("for", "post-code-input")
  postCodeInputLabel.innerText = "Post-code:"

  const postCodeInput = document.createElement("input")
  postCodeInput.setAttribute("id", "post-code-input")
  postCodeInput.setAttribute("name", "post-code-input")
  postCodeInput.setAttribute("type", "text")
  postCodeInput.value = contact.address.postCode

  const checkboxSectionEl = document.createElement("div")
  checkboxSectionEl.setAttribute("class", "checkbox-section")

  const blockCheckboxInput = document.createElement("input")
  blockCheckboxInput.setAttribute("id", "block-checkbox")
  blockCheckboxInput.setAttribute("name", "block-checkbox")
  blockCheckboxInput.setAttribute("type", "checkbox")
  blockCheckboxInput.value = contact.blockContact

  const blockCheckboxInputLabel = document.createElement("label")
  blockCheckboxInputLabel.setAttribute("for", "block-checkbox")
  blockCheckboxInputLabel.innerText = "Block"

  checkboxSectionEl.append(blockCheckboxInput, blockCheckboxInputLabel)

  const actionsSectonEl = document.createElement("div")
  actionsSectonEl.setAttribute("class", "actions-section")

  const editBtn = document.createElement("button")
  editBtn.setAttribute("class", "button blue")
  editBtn.setAttribute("type", "submit")
  editBtn.innerText = "Edit"

  const deleteBtn = document.createElement("button")
  deleteBtn.setAttribute("class", "button blue")
  deleteBtn.setAttribute("type", "submit")
  deleteBtn.innerText = "Delete"

  actionsSectonEl.append(editBtn, deleteBtn)

  formEl.append(
    h1El,
    firstNameLabel,
    firstNameInput,
    lastNameLabel,
    lastNameInput,
    streetInputLabel,
    streetInput,
    cityInputLabel,
    cityInput,
    postCodeInputLabel,
    postCodeInput,
    checkboxSectionEl,
    actionsSectonEl
  )

  viewSection.append(formEl)
  // listenToEditContactForm(formEl)
  return formEl
}

function renderContactForm() {
  const formEl = document.createElement("form")
  formEl.setAttribute("class", "form-stack light-shadow center contact-form")

  const h1El = document.createElement("h1")
  h1El.innerText = "Create Contact"

  const firstNameLabel = document.createElement("label")
  firstNameLabel.setAttribute("for", "first-name-input")
  firstNameLabel.innerText = "First Name:"

  const firstNameInput = document.createElement("input")
  firstNameInput.setAttribute("id", "first-name-input")
  firstNameInput.setAttribute("name", "first-name-input")
  firstNameInput.setAttribute("type", "text")

  const lastNameLabel = document.createElement("label")
  lastNameLabel.setAttribute("for", "last-name-input")
  lastNameLabel.innerText = "Last Name:"

  const lastNameInput = document.createElement("input")
  lastNameInput.setAttribute("id", "last-name-input")
  lastNameInput.setAttribute("name", "last-name-input")
  lastNameInput.setAttribute("type", "text")

  const streetInputLabel = document.createElement("label")
  streetInputLabel.setAttribute("for", "street-input")
  streetInputLabel.innerText = "Street:"

  const streetInput = document.createElement("input")
  streetInput.setAttribute("id", "street-input")
  streetInput.setAttribute("name", "street-input")
  streetInput.setAttribute("type", "text")

  const cityInputLabel = document.createElement("label")
  cityInputLabel.setAttribute("for", "city-input")
  cityInputLabel.innerText = "City:"

  const cityInput = document.createElement("input")
  cityInput.setAttribute("id", "city-input")
  cityInput.setAttribute("name", "city-input")
  cityInput.setAttribute("type", "text")

  const postCodeInputLabel = document.createElement("label")
  postCodeInputLabel.setAttribute("for", "post-code-input")
  postCodeInputLabel.innerText = "Post-code:"

  const postCodeInput = document.createElement("input")
  postCodeInput.setAttribute("id", "post-code-input")
  postCodeInput.setAttribute("name", "post-code-input")
  postCodeInput.setAttribute("type", "text")

  const checkboxSectionEl = document.createElement("div")
  checkboxSectionEl.setAttribute("class", "checkbox-section")

  const blockCheckboxInput = document.createElement("input")
  blockCheckboxInput.setAttribute("id", "block-checkbox")
  blockCheckboxInput.setAttribute("name", "block-checkbox")
  blockCheckboxInput.setAttribute("type", "checkbox")

  const blockCheckboxInputLabel = document.createElement("label")
  blockCheckboxInputLabel.setAttribute("for", "block-checkbox")
  blockCheckboxInputLabel.innerText = "Block"

  checkboxSectionEl.append(blockCheckboxInput, blockCheckboxInputLabel)

  const actionsSectonEl = document.createElement("div")
  actionsSectonEl.setAttribute("class", "actions-section")

  const createBtn = document.createElement("button")
  createBtn.setAttribute("class", "button blue")
  createBtn.setAttribute("type", "submit")
  createBtn.innerText = "Create"

  actionsSectonEl.append(createBtn)

  formEl.append(
    h1El,
    firstNameLabel,
    firstNameInput,
    lastNameLabel,
    lastNameInput,
    streetInputLabel,
    streetInput,
    cityInputLabel,
    cityInput,
    postCodeInputLabel,
    postCodeInput,
    checkboxSectionEl,
    actionsSectonEl
  )

  viewSection.append(formEl)
  listenToAddContactForm(formEl)
  return formEl
}

function listenNewContactButton() {
  const btn = document.querySelector(".new-contact-btn")

  btn.addEventListener("click", function () {
    renderContactForm()
  })
}

// function listenToEditContactForm(formEl) {
//   formEl.addEventListener("submit", event => {
//     event.preventDefault()

//     const newAddress = {
//       street: formEl["street-input"].value,
//       city: formEl["city-input"].value,
//       postCode: formEl["post-code-input"].value,
//     }

//     function createFetchOptions(method, data) {
//       return {
//         method: method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       }
//     }

//     const postRequestForAddresses = createFetchOptions("PATCH", newAddress)

//     // This one first
//     fetch("http://localhost:3000/addresses", postRequestForAddresses)
//       .then(function (response) {
//         return response.json()
//       })
//       .then(function (createdAddress) {
//         const newContact = {
//           firstName: formEl["first-name-input"].value,
//           lastName: formEl["last-name-input"].value,
//           blockContact: formEl["block-checkbox"].checked,
//           addressId: createdAddress.id,
//         }
//         console.log(createdAddress)
//         const postRequestForContacts = createFetchOptions("POST", newContact)

//         fetch("http://localhost:3000/contacts", postRequestForContacts).then(
//           function (response) {
//             return response.json()
//           }
//         )
//         console.log("response 297:", response)
//       })

//     console.log("fetch1")

//     state.contacts.push(contact)
//     console.log("contact", contact)
//     console.log("state:", state)
//     main()
//     return contact
//   })
// }

function listenToAddContactForm(formEl) {
  formEl.addEventListener("submit", event => {
    event.preventDefault()

    const newAddress = {
      street: formEl["street-input"].value,
      city: formEl["city-input"].value,
      postCode: formEl["post-code-input"].value,
    }

    function createFetchOptions(method, data) {
      return {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    }

    const postRequestForAddresses = createFetchOptions("POST", newAddress)

    // This one first
    fetch("http://localhost:3000/addresses", postRequestForAddresses)
      .then(function (response) {
        return response.json()
      })
      .then(function (createdAddress) {
        const newContact = {
          firstName: formEl["first-name-input"].value,
          lastName: formEl["last-name-input"].value,
          blockContact: formEl["block-checkbox"].checked,
          addressId: createdAddress.id,
        }
        console.log(createdAddress)
        const postRequestForContacts = createFetchOptions("POST", newContact)

        fetch("http://localhost:3000/contacts", postRequestForContacts).then(
          function (response) {
            return response.json()
          }
        )
        console.log("response 297:", response)
      })

    console.log("fetch1")

    state.contacts.push(contact)
    console.log("contact", contact)
    console.log("state:", state)
    main()
    return contact
  })
}

// [TODO] Write Code

function main() {
  // viewSection.innerHTML = ""
  listenNewContactButton()
  getContacts()
}

main()
