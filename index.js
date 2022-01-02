
//déclare des variables 2️⃣
 const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input[type="Text"], input[type="password"]'
); //c'est un sélecteur css et j'ai sélectionné mes 4 inputs
//console.log(inputs);
const progressBar = document.getElementById("progress-bar");

// je créer une zone de stockage
let pseudo, email, password,confirmPass;




//fonction qui va gérer l'affichage des erreurs!!!!!pour éviter de créer le code en dessous qui est en //
const erroDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container"); //le point indique une class le tag est un nom que j'utilise pour aller chercher ma cible et je sélectionne tout un container associé à ma cible
  const span = document.querySelector("." + tag + "-container > span");
if (!valid) { //si c'est faux le contraire si ce n'est pas valid message d'erreur
container.classList.add("error");//CSS
span.textContent = message;
//sinon si c'est valid

}else{
  container.classList.remove("error");
  span.textContent = message
}

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//je vais créer 4 fonctions 1️⃣

// const pseudoChecker = (value) => {
// //mettre en place la logique du pseudo
// //const pseudoContainer = document.querySelector(".pseudo-container");//A) je récupére pseudo-container
// //const errorDisplay = document.querySelector(".pseudo-container > span");//B je récupère le span c'est comme cela que l'on se le récupère qui est l'enfant de pseudo-container
// //C) si la valeur da la longueur est sup à 0 et la valeur est inf à 3 ou la valeur de la longueur est sup à 20 tu fais {} 
//  if (value.length > 0 && (value.length < 3 || value.length > 20)
//  ){
//  pseudoContainer.classList.add("error");//D) cette classe que j 'injecte se situe dans le style CSS
//  errorDisplay.textContent ="Le pseudo doit faire entre 3 et 20 caractéres";//E) message qui va s'afficher quand la condition n'est pas remplit
//  }else if (!value.match(/^[a-zA-Z0-9_.-]*$/)){//E) sinon si le contraire de la valeur regex,est grace au point ! on a le contraire de ce que l'on à dans la regex c'est que l'on à un caractére spéciale qui ne correspond pas à notre regex  et on envoie un message d'ereur
//  pseudoContainer.classList.add("error");//F) on lui envoie ce message comme l'on à pas ce type de caractére
//  errorDisplay.textContent = "Le pseudo ne doit pas contenir de caractére spéciaux";
//  }else{
//    pseudoContainer.classList.remove("error");// m'enléve la class visible da mon span CSS pour faire apparaître mon hidden
//    errorDisplay.textContent ="";//vide le texte
//  }

// };


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const pseudoChecker = (value) => {

  if (value.length > 0 && (value.length < 3 || value.length > 20) //dabord on test la longueur
  
   ){

erroDisplay("pseudo" ,"Le message doit faire entre 3 et 20 caractéres");
pseudo = null;//que l'on puisse pas envoyer le formulaire si on ne respect pas le message d'erreur

  }else if (!value.match(/^[a-zA-Z0-9_.-]*$/)){//ensuite on teste un caractére spécial si il c'est glissé
    erroDisplay("pseudo", "Le pseudo ne dois pas obtenir de caractère spéciaux");
    pseudo = null;//que l'on puisse pas envoyer le formulaire si on ne respect pas le message d'erreur


}else{// sinon c'est que c'est bon!!!!!
  erroDisplay("pseudo", "", true); // true qui permet d'actionner mon paramètre valid
  pseudo = value; // value qui est ''e.target.value''qui se stock
}

};




const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)){
    erroDisplay("email", "Le mail n'est pas valide")
    email = null;
  } else{
    erroDisplay("email", "",true);//je pointe , le vide""il y a pas de message
    email=value;//qui se stocke
  }

};

const passwordChecker = (value) => {
  progressBar.classList = ""; //pour éviter que les classes s'empile les unes sur les autres on enléve tout cela veut dire que l'objet classListe n'aura plus rien à l'intérieur
 if (!value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)) {//si sa ne correspond pas à cette regex c'est qu'il y a un probléme dans le mot de pass
   erroDisplay("password",
   "Minimum de 8 caractéres, une majuscule, un chiffre et un caractére spéciale" 
   );
   progressBar.classList.add("progressRed");//CSS PAS DE ASSEZ OU DE BON CARACTERE
   password = null;
 } else if (value.length < 12 ) {
   progressBar.classList.add("progressBlue");//CSS MOT DE PASS RESPECTE
   erroDisplay("password", "", true);
   password = value;
 } else {
  progressBar.classList.add("progressGreen");// CCS MOT DE PASS RESPECTER AVEC SECURITE MAXIMUM
  erroDisplay("password", "", true);
  password = value;
}
 if (confirmPass) confirmChecker (confirmPass)//s'il y a quelque chose dan confirm pass c'est qu 'on lui a passé true eu bien tu lance le confirmChekers
};

const confirmChecker = (value) => {
  if (value !== password){
    erroDisplay("confirm", "Les mots de passe ne correspondent pas");
    confirmPass = false;
  }else {
    erroDisplay("confirm","", true);
     confirmPass = true;
  }
};
//pour travailler avec mes 4 inputs je vais utiliser la boucle for each ce qui évite de créer un addEventlistner pour chaque input
//3️⃣et celon ce que fait l'utilisateur on envoie le Checker
inputs.forEach((bruno) => {
  bruno.addEventListener("input", (e) => {
console.log(e.target.id);
     switch (
       e.target.id //le switch va tester la valeur de "e.target.id" il contrôle mes inputs
     ) {
       case "pseudo": //si tu tombes sur pseudo tu me joue pseudoChecker iem pour les autres
         pseudoChecker(e.target.value);//ces paramétres e.target.value on les retrouve en vleur de mes constantes 
        break;
       case "email":
         emailChecker(e.target.value);
         break;
      case "password":
         passwordChecker(e.target.value);
        break;
       case "confirm":
         confirmChecker(e.target.value);
        break;
      default:
         null;
     }
  });
});

 form.addEventListener("submit", (e) => {
   console.log("test");
   e.preventDefault();//évite à mon form de changer de page
   if (pseudo && email && password && confirmPass){   // si ces 4 paramétres son true en même temps
// //tu envoies tous ces éléments dans la console
 const data = {
   pseudo,
   email,
   password,
   };
console.log(data);

inputs.forEach((input) => (input.value = "")); //va effacer tout mes inputs
progressBar.classList = ""; //je vide ma progress barre pour qu'elle ne reste pas afficher dans le navigateur!!!!!!

pseudo = null;
email = null;
password = null;
confirmPass = null;

alert("Inscription validée!");
   }else{
     alert("veuillez remplir correctement les champs");
  }
 });