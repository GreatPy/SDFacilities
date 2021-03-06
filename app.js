

// récupration des données sauvegardé sur le local storage
let consoStorage = JSON.parse(localStorage.getItem("consomables"))
let consomables = consoStorage
// définition de tech si consoStorage === null
if(!consomables){
  consomables = {
  sangles: 0,
  canules: 0,
  sparadras: 0
  }
} 


// récupration des donné sauvegardé sur le local storage
let techStorage = JSON.parse(localStorage.getItem("tech"))
let tech = techStorage
// définition de tech si techStorage === null
if(!tech){
  tech = {
  firstname: null,
  lastname: null,
  adresse: null,
  }
}

// récupration des donné sauvegardé sur le local storage
let orderStorage = JSON.parse(localStorage.getItem("order"))
let order = orderStorage
// définition de tech si techStorage === null
if(!order){
  order = [false, false, false]
}





// récupération du DOM
const techID = document.getElementById("techID")
const formTech = document.getElementById("formTech")
const formTechBox = document.getElementById('formTechBox')
const techProfilBtn = document.getElementById('techProfilBtn')
const saveBtn = document.getElementById('saveBtn')
const receptionlBtn = document.getElementById('receptionlBtn')
const orderSanglesBtn = document.getElementById("orderSanglesBtn")
const orderCanulesBtn = document.getElementById("orderCanulesBtn")
const orderSparadrasBtn = document.getElementById("orderSparadrasBtn")
//CONSOMABLES
const sangleCount = document.getElementById("sangleCount")
const canuleCount = document.getElementById("canuleCount")
const sparadraCount = document.getElementById("sparadraCount")
const consomableTableForm = document.getElementById("consomableTableForm")
const consomabelBeforeNodeList = document.getElementsByClassName("consomabelBefore")
const consomabelBeforeArray = Array.from(consomabelBeforeNodeList)
const consomabelAddNodeList = document.getElementsByClassName("consomabelAdd")
const consomabelAddArray = Array.from(consomabelAddNodeList)
const consomabelFinalNodeList = document.getElementsByClassName("consomabelFinal")
const consomabelFinalArray = Array.from(consomabelFinalNodeList)
const consomableOrderBtnNodeList = document.getElementsByClassName("consomableOrderBtn")
const consomableOrderBtnArray = Array.from(consomableOrderBtnNodeList)
const sentNodeList = document.getElementsByClassName("sent")
const sentArray = Array.from(sentNodeList)
//recupération des before
const beforeArray = []
const sangleBefore = document.getElementById("sangleBefore")
const canuleBefore = document.getElementById("canuleBefore")
const sparadraBefore = document.getElementById("sparadraBefore")
//initialisation des consomablesCount
sangleCount.textContent = consomables.sangles
canuleCount.textContent = consomables.canules
sparadraCount.textContent = consomables.sparadras
//initialisation des before
sangleBefore.textContent = consomables.sangles
canuleBefore.textContent = consomables.canules
sparadraBefore.textContent = consomables.sparadras
beforeArray.push(sangleBefore)
beforeArray.push(canuleBefore)
beforeArray.push(sparadraBefore)
//recupération des Add
const addInputArray = []
const sangleAddInput = document.getElementById("sangleAddInput")
const canuleAddInput = document.getElementById("canuleAddInput")
const sparadraAddInput = document.getElementById("sparadraAddInput")
addInputArray.push(sangleAddInput)
addInputArray.push(canuleAddInput)
addInputArray.push(sparadraAddInput)
//initialisation des add
for(let i in addInputArray){
    addInputArray[i].value = 0
  }
//recupération des Finale
const finalInputArray = []
const sangleFinalInput = document.getElementById("sangleFinalInput")
const canuleFinalInput = document.getElementById("canuleFinalInput")
const sparadraFinalInput = document.getElementById("sparadraFinalInput")
finalInputArray.push(sangleFinalInput)
finalInputArray.push(canuleFinalInput)
finalInputArray.push(sparadraFinalInput)
//initalisation des Finale
for(let i in finalInputArray){
  finalInputArray[i].value = beforeArray[i].textContent
}

//mise à jour de order
if(consomables.sangles > 9){
  order[0] = false
}
if(consomables.canules > 9){
  order[1] = false
}
if(consomables.sparadras > 9){
  order[2] = false
}
//affichage des sent
for(let i in order){
  if(order[i]===true){
    consomableOrderBtnArray[i].classList.add("hidden")
    sentArray[i].classList.remove("hidden")
  }
}


//affichage des consomablesOrderBtn
if(consomables.sangles < 10 && !order[0]){
  consomableOrderBtnArray[0].classList.remove("hidden")
}
if(consomables.canules < 10 && !order[1]){
  consomableOrderBtnArray[1].classList.remove("hidden")
}
if(consomables.sparadras < 10 && !order[2]){
  consomableOrderBtnArray[2].classList.remove("hidden")
}

// fonction sendmail
orderSanglesBtn.addEventListener("click",(e)=>{
  e.preventDefault()
  sendMail1()
  setTimeout(orderSetting1,2000)
})
orderCanulesBtn.addEventListener("click",(e)=>{
  e.preventDefault()
  sendMail2()
  setTimeout(orderSetting2,2000)
})

orderSparadrasBtn.addEventListener("click",(e)=>{
  e.preventDefault()
  sendMail3()
  setTimeout(orderSetting3,2000)
})

// préremplissage du techForm
if(tech.firstname){formTech.techFirstname.value=tech.firstname}
if(tech.lastname){formTech.techLastname.value=tech.lastname}
if(tech.adresse){formTech.techAdresse.value=tech.adresse}

// affichage  du tehID
if(!tech.firstname || !tech.lastname || !tech.adresse){
  techID.textContent = `qui êtes-vous?`
}else{
  techID.textContent = `${tech.firstname} ${tech.lastname}`
}

// paramétrage du saveBtn
saveBtn.addEventListener("click",(e)=>{
  e.preventDefault()
  tech.firstname = formTech.techFirstname.value 
  tech.lastname = formTech.techLastname.value
  tech.adresse = formTech.techAdresse.value 
  localStorage.setItem("tech",JSON.stringify(tech))
  location.reload()
})

// MAJ AUTO de quantité après reception
for(let i in addInputArray){
  addInputArray[i].addEventListener("input",(e)=>{
    e.preventDefault()
    const before = Number(beforeArray[i].textContent)
    const add = Number(addInputArray[i].value)
    finalInputArray[i].value = before + add
  })
}

// récpération et parmétrage du consomableValidationBtn
const consomableValidationBtn = document.getElementById("consomableValidationBtn")
consomableValidationBtn.addEventListener("click",(e)=>{
  e.preventDefault()
  for(let i in finalInputArray){
      beforeArray[i].textContent = finalInputArray[i].value
  }
  //mise à jour de consomables
  consomables.sangles = Number(sangleBefore.textContent)
  consomables.canules = Number(canuleBefore.textContent)
  consomables.sparadras = Number(sparadraBefore.textContent)

  //mise à jour des count
  sangleCount.textContent = consomables.sangles
  canuleCount.textContent = consomables.canules
  sparadraCount.textContent = consomables.sparadras

  //mise à jour des before
  sangleBefore.textContent = consomables.sangles
  canuleBefore.textContent = consomables.canules
  sparadraBefore.textContent = consomables.sparadras

  //remise à zéro des add
  for(let i in addInputArray){
    addInputArray[i].value = 0
  }
  
  localStorage.setItem("order",JSON.stringify(order))
  localStorage.setItem("consomables",JSON.stringify(consomables))
  location.reload()
})

//Masquage du copyDateBtn
const copyDateBtn = document.getElementById("copyDateBtn")
copyDateBtn.style.display = "none"


// Affichage du dailyFolderLabel
const dailyFolderLabel = document.getElementById("date")
const dateFormated = getJsonDay(getStringDay()).year+getJsonDay(getStringDay()).month+getJsonDay(getStringDay()).day
dailyFolderLabel.value = dateFormated
const today = getStringDay()

// Parametrage du formGenerationBtn
const formGenerationBtn = document.getElementById("formGenerationBtn")
formGenerationBtn.addEventListener("click",(e)=>{
  e.preventDefault()
  if(dailyFolderLabel.value.length === 8){
    //décrementaion des consomables
    sangleCount.textContent = -- consomables.sangles 
    canuleCount.textContent = -- consomables.canules 
    sparadraCount.textContent = -- consomables.sparadras 

    
    

    console.log(consomables)

    //affichage du copyDateBtn
    copyDateBtn.style.display = "inline"

    //récupération de la date
    const date = ` ${dailyFolderLabel.value.slice(6)}/${dailyFolderLabel.value.slice(4,6)}/${dailyFolderLabel.value.slice(0,4)}`

    //Recupération du textArea
    const form = document.getElementById("form");
    const SDMessage = form.missions.value
    
    //Model d'un formBox
    const patientFormHTML = 
  `
    <form action="/" method="GET" name = "form" class = "formBox">
        <div class = "headerContainer">
          <button class="display" tabindex="-1">-</button>
          <div class = "header">header</div>
        </div>
        <div class = "body">
              <div>
                <label for="patientFolderLabel">dossier patient</label>
                <input type="text" name="patientFolderLabel" id="patientFolderLabel"  class = "patientInput disabled" disabled>
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                  <label for="PG">N°PG</label>
                  <input type="text" name="PG" id="PG"  class = "patientInput" >
                  <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="firstname">prénom</label>
                <input type="text" name="firstname" id="firstname" class = "patientInput">        
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="lastname">nom</label>
                <input type="text" name="lastname" id="lastname" class = "patientInput">        
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="ID">ID</label>
                <input type="text" name="ID" id="ID" class = "patientInput">
                <button class="copy" tabindex="-1">copier</button>
              </div>
                <div>
                <label for="time">heure</label>
                <input type="text" name="time" id="time" class = "patientInput">        
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="adresse">adresse</label>
                <input type="text" name="adresse" id="adresse" class = "patientInput">        
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="phone">tel</label>
                <input type="text" name="phone" id="phone" class = "patientInput">        
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="birthday">date de naissance</label>
                <input type="text" name="birthday" id="birthday" class = "patientInput">
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="weight">poids</label>
                <input type="text" name="weight" id="weight" class = "patientInput">
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="hight">taille</label>
                <input type="text" name="hight" id="hight" class = "patientInput">
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <button type="submit"  name="docsGenerationBtn" id="docsGenerationBtn" class="docsGenerationBtn">générer les documents</button>
            </div> 
          </form>
        </div>
      <br>
    </div>`

    //Création d'un array contenant chaque patient
    const patientsObjectsArray = creatPatientObjectsArray(SDMessage)


    //Création d'un formBox pour chaque patient
    patientsObjectsArray.forEach((patient) => {
      //mise à jour de patient.date
      patient.date = date
      //création et ajout du formBox
      const formBox = document.createElement("div")
      formBox.className = "OneFormBox";
      formBox.innerHTML = patientFormHTML;
      document.body.append(formBox);
    });

    //Récupération de tous les inputs
    const inputsNodeList = document.getElementsByClassName("patientInput")
    const inputsArray = Array.from(inputsNodeList)
    console.log(inputsArray)
    
    //Récupération et paramétrage de chaque copyBtn 
    const copyBtnNodeList = document.getElementsByClassName("copy")
    const copyBtnArray = Array.from(copyBtnNodeList)
    for(let i in copyBtnArray){
      copyBtnArray[i].addEventListener("click",(e)=>{
        e.preventDefault();
        if(inputsArray[i].classList.contains("disabled")){
          inputsArray[i].removeAttribute("disabled")
        }
        inputsArray[i].select()
        document.execCommand("copy");
        if(inputsArray[i].classList.contains("disabled")){
          inputsArray[i].setAttribute("disabled",true)
        }
        console.log("coucou")
      });
    };
    
    //Création d'un Array contenant chaque formBoxDOM
    const formBoxDOMNodeList = document.getElementsByClassName("formBox")
    const formBoxDOMArray = Array.from(formBoxDOMNodeList)

    //remplissage de chaque formulaires
    let pgCounter = 1
    const header = document.getElementsByClassName("header")
    const body = document.getElementsByClassName("body")
    for(let i in formBoxDOMArray){
      const header = document.getElementsByClassName("header")
      formBoxDOMArray[i].PG.value = `VS ${pgCounter}`;
      patientsObjectsArray[i].PG = formBoxDOMArray[i].PG.value
      formBoxDOMArray[i].firstname.value = patientsObjectsArray[i].firstname;
      formBoxDOMArray[i].lastname.value = patientsObjectsArray[i].lastname;
      formBoxDOMArray[i].ID.value = patientsObjectsArray[i].ID;
      formBoxDOMArray[i].birthday.value = patientsObjectsArray[i].birthday;
      formBoxDOMArray[i].weight.value = patientsObjectsArray[i].weight;
      formBoxDOMArray[i].hight.value = patientsObjectsArray[i].hight;
      formBoxDOMArray[i].time.value = patientsObjectsArray[i].time;
      formBoxDOMArray[i].adresse.value = patientsObjectsArray[i].adresse;
      formBoxDOMArray[i].phone.value = patientsObjectsArray[i].phone;

      formBoxDOMArray[i].patientFolderLabel.value = creatPatientFolderLabel(formBoxDOMArray[i].firstname.value, formBoxDOMArray[i].lastname.value, formBoxDOMArray[i].ID.value);
      patientsObjectsArray[i].patientFolderLabel = formBoxDOMArray[i].patientFolderLabel.value
      header[i].textContent=`PG ${pgCounter}: ${patientsObjectsArray[i].firstname} ${patientsObjectsArray[i].lastname}`
      pgCounter++
    }

    //Récupération et paramétrage de chaque display 
    const displayBtnNodeList = document.getElementsByClassName("display")
    const displayBtnArray = Array.from(displayBtnNodeList)
    displayBtnArray.forEach(
      (btn,i )=> {
        btn.addEventListener("click",(e)=>{
          e.preventDefault()
          body[i].style.display = "none"
          if(btn.textContent === "-"){
            btn.textContent = "+"
          }else{
            btn.textContent = "-"
            body[i].style.display = "block"
          }
        })
        }
    )

    //récupération de tous les inputs dans patientDataArray
    for (let i in formBoxDOMArray){
      const patientDataArray = []
      patientDataArray.push(
        formBoxDOMArray[i].firstname,
        formBoxDOMArray[i].lastname,
        formBoxDOMArray[i].ID,
        formBoxDOMArray[i].PG,
        formBoxDOMArray[i].time,
        formBoxDOMArray[i].adresse,
        formBoxDOMArray[i].birthday,
        formBoxDOMArray[i].phone,
        formBoxDOMArray[i].hight,
        formBoxDOMArray[i].weight,
        formBoxDOMArray[i].patientFolderLabel
      )
        //mise à jour du patientsObjectsArray
        for (let j in patientDataArray){
          patientDataArray[j].addEventListener("input",(e)=>{
            patientsObjectsArray[i]={
              firstname : formBoxDOMArray[i].firstname.value,
              lastname : formBoxDOMArray[i].lastname.value,
              ID : formBoxDOMArray[i].ID.value,
              PG : formBoxDOMArray[i].PG.value,
              time : formBoxDOMArray[i].time.value,
              adresse : formBoxDOMArray[i].adresse.value,
              birthday : formBoxDOMArray[i].birthday.value,
              phone : formBoxDOMArray[i].phone.value,
              hight : formBoxDOMArray[i].hight.value,
              weight : formBoxDOMArray[i].weight.value,
              patientFolderLabel : formBoxDOMArray[i].patientFolderLabel.value,
              date : date
            }
            // mise à jour du patientFolderlabel et du header
            formBoxDOMArray[i].patientFolderLabel.value = creatPatientFolderLabel(formBoxDOMArray[i].firstname.value, formBoxDOMArray[i].lastname.value, formBoxDOMArray[i].ID.value);
            header[i].textContent=`PG ${formBoxDOMArray[i].PG.value.slice(3)}: ${formBoxDOMArray[i].firstname.value} ${formBoxDOMArray[i].lastname.value}`
          })
        }
    }

    //disparition du textarea et du formGenerationBtn
    const hidenElementNodeList = document.getElementsByClassName("hide")
    const hidenElmentArray = Array.from(hidenElementNodeList)
    hidenElmentArray.forEach(elt => elt.style.display = "none")
    //disabled de la date
    document.getElementById("date").setAttribute("disabled", true)

    //Récupération et paramétrage de chaque docsGenerationBtn 
    const docsGenerationBtnNodeList = document.getElementsByClassName("docsGenerationBtn")
    const docsGenerationBtnArray = Array.from(docsGenerationBtnNodeList)
    for (let i in docsGenerationBtnArray){
      docsGenerationBtnArray[i].addEventListener("click",(e)=>{
        e.preventDefault()
        const patientString = JSON.stringify(patientsObjectsArray[i])

        localStorage.setItem("patientString", patientString);
        sleepQualityLaucher()
        consentFormLaucher()
        displayBtnArray[i].click()
      })
    }

    //MAP

    //création du div qui va contenir la carte
    const mapDisplay = document.createElement("div")
    mapDisplay.id = "map";
    document.body.append(mapDisplay);
    // création de la variable contenant l'objet carte
    const diva = L.map('map',
      {attributionControl:false}
      //positionnement initial de la carte sur Paris
      ).setView([48.85499357435127, 2.336733133997968], 9.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(diva);

    //positionnement initial d'un marqueur sur l'adresse du technicien
    const teckMarker = L.marker([48.810179130046684, 2.4168104290640855])
    teckMarker.addTo(diva)

    // initailisaion du geocode
    const geocode = L.esri.Geocoding.geocode({apikey: 'AAPKd398e53a71a4407aafa1365feac2a537hz8XQdFMRyL6feRxQP8ayYgHKjwGKAUt5kTKnxDmSCamcEy3n_AEymS2Wt5Mk3N_'})

    // affichage des marqueurs pour chaque adresse de base 
    const markerArray = []
    const iconOptionsArray = []
    const iconOptions1 = L.icon({
      iconUrl: 'icone1.png',
      iconSize: [30, 30],
      iconAnchor: [0, 0]
    });
    iconOptionsArray.push(iconOptions1)

    const iconOptions2 = L.icon({
      iconUrl: 'icone2.png',
      iconSize: [30, 30],
      iconAnchor: [0, 0]
    });
    iconOptionsArray.push(iconOptions2)
    const iconOptions3= L.icon({
      iconUrl: 'icone3.png',
      iconSize: [30, 30],
      iconAnchor: [0, 0]
    });
    iconOptionsArray.push(iconOptions3)
    const iconOptions4 = L.icon({
      iconUrl: 'icone4.png',
      iconSize: [30, 30],
      iconAnchor: [0, 0]
    });
    iconOptionsArray.push(iconOptions4)
    console.log(iconOptionsArray)

    for(let i in patientsObjectsArray){
      console.log(patientsObjectsArray[i].adresse)
      geocode.text(patientsObjectsArray[i].adresse)
      geocode.run(function (err, results) {
        if (err) {
          console.log(err);
          return;
        }
        const lat = results.results[0].latlng.lat
        const lng = results.results[0].latlng.lng
        const marker = L.marker([lat,lng], {icon: iconOptionsArray[i] })
        markerArray.push(marker)
      }); 
    }
    // ajout ds markers initiaux pour chaque patients
    setTimeout(()=>{
      for (let i in markerArray){
        markerArray[i].addTo(diva)
      }
    },500)
    
    // misea a jour marker patient
    const adressInputNodeList = document.getElementsByClassName("adresse")
    const adressInputArray = Array.from(adressInputNodeList)
    for (let i in adressInputArray){

      adressInputArray[i].addEventListener("blur",(e)=>{
        // suppréssion de tous les marker patient et vidage de markerArray
        for (let i in markerArray){
        markerArray[i].remove()
        }
        markerArray.splice(0)
        console.log(markerArray)

        // ajout des marker patient
        for(let i in patientsObjectsArray){
          geocode.text(patientsObjectsArray[i].adresse)
          geocode.run(function (err, results) {
        if (err) {
          console.log(err);
          return;
        }
        const lat = results.results[0].latlng.lat
        const lng = results.results[0].latlng.lng
        const marker = L.marker([lat,lng], {icon: iconOptionsArray[i] })
        markerArray.push(marker)
      }); 
    }
      setTimeout(()=>{
        for (let i in markerArray){
          markerArray[i].addTo(diva)
        }
        console.log(markerArray)
      },200) 
        
      })
    }
  }
})





// HELPERS

// exemple de SD message
const SDMessageExpmle = 
`Monday 26/10, Vahe

1.
Prénom: Valérie
Nom: ANTOINE
Heure: 16:00-17:00
Adresse: 92 Gd Rue Charles de Gaulle, 91250 Saintry-sur-Seine
Tel: 0782708809
Date de naissance: 31.05.1967
Poids: 110
Taille: 158
Numéro sécurité sociale: 267057817409840

2. 
Prénom: Aaron
Nom: HENNEL
Heure: 18:00-19:00
Adresse: Haras de mes couille Rue du Moulin, 77670 Vernou-la-Celle-sur-Seine
Tel: +33626374814
Date de naissance: 23.12.1984
Poids: N/A 
Taille: N/A 
Numéro sécurité sociale: 184127635117352

3.
Prénom: Tra Aime
Nom: TRA BI
Heure : 19:00-19:30 
Adresse : 41 Rue Lavoisier, 77000 Melun
Tel : 0605872080
Date de naissance: 01/01/1986
Poids: 69
Taille: 169
Numéro sécurité sociale: 186019932614631"

4. 
Prénom: Bernard
Nom: KLINGON
Heure: 22:00-13:00
Adresse: 4 rue de la poupé qui tousse
Tel: +336777777777
Date de naissance: 24.03.1965
Poids: 16678
Taille: 2839 
Numéro sécurité sociale: 18412XXXXXXXXX52
`;

function creatArrayMissions(missions){
  const regMission =/Prénom.+\nNom.+\nHeure.+\nAdresse.+\nTel.+\nNaissance.+\nPoids.+\nTaille.+\nSécu.+/g;
  const ArrayMissions = missions.match(regMission);
  return ArrayMissions;
}

function extractOneData(source,regex,string){
  return source.match(regex)[0].slice(string.length).trim()
}

function extractAllDatafromOnePaitient(patientPara){
  const firstname = extractOneData(patientPara,/Prénom.+\n/g,"Prénom:")
  const lastname = extractOneData(patientPara,/Nom.+\n/g,"Nom:")
  const time = extractOneData(patientPara,/Heure.+\n/g,"Heure:")
  const adresse = extractOneData(patientPara,/Adresse.+\n/g,"Adresse:")
  const phone = extractOneData(patientPara,/Tel.+\n/g,"Tel:")
  const birthday = extractOneData(patientPara,/Naissance.+\n/g,"Naissance:")
  const weight = extractOneData(patientPara,/Poids.+\n/g,"Poids:")
  const hight = extractOneData(patientPara,/Taille.+\n/g,"Taille:")
  const ID = extractOneData(patientPara,/Sécu.+/g,"Sécu:")
  return{
    patientFolderLabel: null,
    PG: null,
    marker: null,
    date,
    firstname,
    lastname,
    time,
    adresse,
    phone,
    birthday,
    weight,
    hight,
    ID
  }
}

function creatPatientObjectsArray(SDMessage){
  const patientsArray = creatArrayMissions(SDMessage)
  console.log(patientsArray)
  return patientsArray.map(patient => extractAllDatafromOnePaitient(patient))
}


// réccupération et formatage de la date du jour
function getStringDay(){
  const local = "fr-FR";
const options = {
  "day"   : "2-digit",
  "month" : "2-digit",
  "year"  : "numeric"
};
const today = new Date();
return today.toLocaleString(local,options);
}

//déstructuration d'une date
function getJsonDay(stringDay){
  return {
    year  : stringDay.slice(6),
    month : stringDay.slice(3,5),
    day   : stringDay.slice(0,2),
  }
}

//création du DailyFolderLabel
function creatDailyFolderLabel(){
  return `${getJsonDay(getStringDay()).year}${getJsonDay(getStringDay()).month}${getJsonDay(getStringDay()).day}`
}

//création du PatientFolderLabel
function creatPatientFolderLabel(firstName, lastName, ID){
  return `${dailyFolderLabel.value} ${firstName} ${lastName} ${ID}`
}

// DocsLaucherFonctions
function consentFormLaucher(){
  window.open("docsGeneration/consentForm/consentForm.html");
}
function sleepQualityLaucher(){
  window.open("docsGeneration/sleepQuality/sleepQuality.html");
}

// SENDMAIL function
function sendMail1(){
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "v.serdjanian@gmail.com",
    Password : "742CD1E4EBC61C08DBC59BEA31301D913DF8",
    To : 'v.serdjanian@gmail.com',
    From : "v.serdjanian@gmail.com",
    Subject : "Consomables",
    Body : 
    `Bonjour! j'arrive bientôt à cours de sangles.
    Pourrais-tu m'en renvoyer des stokc supplémentaires s'il-te-plait?
    Peux-tu également accuser récepetion en me répondant direcement à ce mail?
    Merci !
    Vahé`
  }).then(
    message => alert(message)
  );
}

function sendMail2(){
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "v.serdjanian@gmail.com",
    Password : "742CD1E4EBC61C08DBC59BEA31301D913DF8",
    To : 'v.serdjanian@gmail.com',
    From : "v.serdjanian@gmail.com",
    Subject : "Consomables",
    Body : `Bonjour! j'arrive bientôt à cours de canules.
    Pourrais-tu m'en renvoyer des stokc supplémentaires s'il-te-plait?
    Peux-tu également accuser récepetion en me répondant direcement à ce mail?
    Merci !
    Vahé`
  }).then(
    message => alert(message)
  );
}

function sendMail3(){
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "v.serdjanian@gmail.com",
    Password : "742CD1E4EBC61C08DBC59BEA31301D913DF8",
    To : 'v.serdjanian@gmail.com',
    From : "v.serdjanian@gmail.com",
    Subject : "Consomables",
    Body : `Bonjour! j'arrive bientôt à cours de sparadras.
    Pourrais-tu m'en renvoyer des stokc supplémentaires s'il-te-plait?
    Peux-tu également accuser récepetion en me répondant direcement à ce mail?
    Merci !
    Vahé`
  }).then(
    message => alert(message)
  );
}

function orderSetting1(){
  orderSanglesBtn.classList.add("hidden")
  sentArray[0].classList.remove("hidden")
  order[0] = true
  localStorage.setItem("order",JSON.stringify(order))
  console.log("succes")
  location.reload()
}

function orderSetting2(){
  orderSanglesBtn.classList.add("hidden")
  sentArray[1].classList.remove("hidden")
  order[1] = true
  localStorage.setItem("order",JSON.stringify(order))
  console.log("succes")
  location.reload()
}

function orderSetting3(){
  orderSanglesBtn.classList.add("hidden")
  sentArray[2].classList.remove("hidden")
  order[2] = true
  localStorage.setItem("order",JSON.stringify(order))
  console.log("succes")
  location.reload()
}







