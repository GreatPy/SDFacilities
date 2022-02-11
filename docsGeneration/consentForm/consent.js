// récupération de patient
const patientString = localStorage.getItem("patientString")
const patient = JSON.parse(patientString)


// récupération des emplacement des displayData
const PGDisplay = document.getElementById("PG");
const firstNameDisplay = document.getElementById("firstNameConsent");
const lastNameDisplay = document.getElementById("lastNameConsent");
const IDDisplay = document.getElementById("IDConsent");
const birthdayDisplay = document.getElementById("birthdayConsent");
const dateDisplay = document.getElementById("dateConsent")

// intégration des data
PGDisplay.textContent = patient.PG;
firstNameDisplay.textContent = patient.firstname;
lastNameDisplay.textContent = patient.lastname;
IDDisplay.textContent = patient.ID;
birthdayDisplay.textContent = patient.birthday;
dateDisplay.textContent = patient.date;





