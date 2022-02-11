// récupération de patient
const patientString = localStorage.getItem("patientString")
const patient = JSON.parse(patientString)



// récupération des emplacement des displayData
const PGDisplay = document.getElementById("PG");
const firstNameDisplay = document.getElementById("firstNameSleepQualityDisplay");
const lastNameDisplay = document.getElementById("lastNameSleepQualityDisplay");
const birthdayDisplay = document.getElementById("birthdaySleepQualityDisplay");
const dateDisplay = document.getElementById("dateSleepQualityDisplay")
const weightDisplay = document.getElementById("weigthSleepQualityDisplay");
const hightDisplay = document.getElementById("higthSleepQualityDisplay")

// intégration des data
PGDisplay.textContent = patient.PG
firstNameDisplay.textContent = patient.firstname
lastNameDisplay.textContent = patient.lastname
birthdayDisplay.textContent = patient.birthday
dateDisplay.textContent = patient.date
weightDisplay.textContent = patient.weight
hightDisplay.textContent = patient.hight



