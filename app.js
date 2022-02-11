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
                <input type="text" name="patientFolderLabel" id="patientFolderLabel" disabled>
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                  <label for="PG">N°PG</label>
                  <input type="text" name="PG" id="PG" disabled>
                  <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="firstname">prénom</label>
                <input type="text" name="firstname" id="firstname">        
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="lastname">nom</label>
                <input type="text" name="lastname" id="lastname">        
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="ID">ID</label>
                <input type="text" name="ID" id="ID">
                <button class="copy" tabindex="-1">copier</button>
              </div>
                <div>
                <label for="time">heure</label>
                <input type="text" name="time" id="time">        
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="adresse">adresse</label>
                <input type="text" name="adresse" id="adresse">        
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="phone">tel</label>
                <input type="text" name="phone" id="phone">        
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="birthday">date de naissance</label>
                <input type="text" name="birthday" id="birthday">
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="weight">poids</label>
                <input type="text" name="weight" id="weight">
                <button class="copy" tabindex="-1">copier</button>
              </div>
              <div>
                <label for="hight">taille</label>
                <input type="text" name="hight" id="hight">
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
    const inputsNodeList = document.getElementsByTagName("input")
    const inputsArray = Array.from(inputsNodeList)
    
    //Récupération et paramétrage de chaque copyBtn 
    const copyBtnNodeList = document.getElementsByClassName("copy")
    const copyBtnArray = Array.from(copyBtnNodeList)
    for(let i in copyBtnArray){
      copyBtnArray[i].addEventListener("click",(e)=>{
        e.preventDefault();
        
        inputsArray[i].removeAttribute("disabled")
        inputsArray[i].select()
        document.execCommand("copy");
        inputsArray[i].setAttribute("disabled",true)
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
  const regMission =/Prénom.+\nNom.+\nHeure.+\nAdresse.+\nTel.+\nDate.+\nPoids.+\nTaille.+\nNum.+/g;
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
  const birthday = extractOneData(patientPara,/Date de naissance.+\n/g,"Date de naissance :")
  const weight = extractOneData(patientPara,/Poids.+\n/g,"Poids :")
  const hight = extractOneData(patientPara,/Taille.+\n/g,"Taille :")
  const ID = extractOneData(patientPara,/Numéro.+/g,"Numéro sécurité sociale:")
  return{
    patientFolderLabel: null,
    PG: null,
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






