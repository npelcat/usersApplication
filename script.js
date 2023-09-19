// 3. On contient la base de données users dans une boite :
let userData = [];

// 2. Tout englober dans une fonction qui permet de récupérer les données :
// async : attention, la fonction qui va suivre est asynchrone :
const fetchUser = async () => {

    //1.Voir les données :
    //await : Attend que cette partie soit executée avant de faire la suite !
    //Convertir en .json, donc convertir le résultat en un objet lisible :
    //Passer les données dans la boite crée plus haut :
    await fetch('https://randomuser.me/api/?results=24')
    .then((res) => res.json())
    .then((data) => (userData = data.results));
    //Dans ".results" (path - chemin), on obtient un Array de 24 élèments (objets).

    //ATTENTION avec les fetch car JS avance sans forcément avoir terminé ce qu'il y a dans la fonction, ce qui renvoie des données vides ou fausses : dans ce cas, passer en ASYNCHRONE (setTimeout ou la plupart du temps : async await qui se marie bien avec le .then)
    // setTimeout(() => {
    // console.log(userData);
    // },2000);
    console.log(userData);
}

// 4. Créer une fonction d'affichage des utilisateurs :
const userDisplay = async () => {
    //Appeler la fonction qui récupère les données MAIS attend qu'elle soit exécutée avant de faire la suite !
    await fetchUser();

    //Traiter la date de naissance (qui est en ISO STRING de base) : CREER une fonction :
    const dateParser = (date) => {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        return newDate;
    }

    //Traiter la date d'inscription : CREER une fonction pour comparer des TimeStamp :
    const dayCalc = (date) => {
        //Obtenir la date du jour :
        let today = new Date();
        //Mettre la date du jour en timeStamp :
        let todayTimestamp = Date.parse(today);
        //Mettre la date d'inscription du user (donc la date que l'on passe en paramètre de la fonction dayCalc) en timeStamp pour pouvoir faire une soustraction :
        let timestamp = Date.parse(date);

        //"Math.ceil" : arrondier à l'entier supérieur & Soustraction + formule mathématique pour ramener au nombre de jours 
        return Math.ceil((todayTimestamp - timestamp) / 8.64e7);
    }

    //Injecter du HTML avec balises dans le body : le array24 (userData) prend un ".map" pour lister les choses
    //Premier paramètre : toujours comment on va appeler chaque tour de boucle
    //`` : chaque tour aura la même logique d'affichage
    //Ajouter la class CSS "card" pour le style
    //"user.x.x" : Path pour aller chercher une donnée précise
    document.body.innerHTML = userData.map((user) => 
    //Dans le <p>, utiliser la fonction de réécriture de date crée plus haut, et lui passer en paramètre le bon chemin vers la donnée à traiter
    //Même chose pour le "em"
      `
        <div class="card">
            <img src=${user.picture.large} alt="photo de ${user.name.last}">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>${user.location.city}, ${dateParser(user.dob.date)}</p>
            <em>Membre depuis : ${dayCalc(user.registered.date)} jours</em>
        </div>
      `
    )
    .join(" ");
};

userDisplay();
