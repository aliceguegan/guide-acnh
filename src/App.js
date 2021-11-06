import React from 'react';
import './App.css';
import logo from "./images/Logo-acnh2.png";
import fish from "./images/fish-exemple.png";
import bug from "./images/bug-example.png";
import sea from "./images/sea-example.png";
import fossil from "./images/fossil-example.png";
import art from "./images/art-example.png";
import villager from "./images/villager-example.png";
import melimelo from "./images/meli-melo.png";


class Home extends React.Component {

    render(){

        return (
            <div>
            <section id="header">
            <img id="logo-index" src={logo} alt="logo acnh"></img>
            <h1 id="main-title">Guide<br/> Animal Crossing New Horizons</h1>
          </section>
    
          <h2 id="explore">Explorez les<br/>différentes catégories</h2>
    
          <section id="main">
    
            <div className="container" onClick={this.props.openFish}>
                <img src={fish} alt="poisson"></img>
                <h3>Poissons</h3>
            </div>
    
            <div className="container" onClick={this.props.openInsectes}>
                <img src={bug} alt="insecte"></img>
                <h3>Insectes</h3>
            </div>
    
            <div className="container sea" onClick={this.props.openCreatures}>
                <img src={sea} alt="créature marine"></img>
                <h3>Créatures marines</h3>
            </div>
    
            <div className="container" onClick={this.props.openFossiles}>
                <img src={fossil} alt="fossile"></img>
                <h3>Fossiles</h3>
            </div>
    
            <div className="container" onClick={this.props.openArt}>
                <img src={art} alt="art"></img>
                <h3>Art</h3>
            </div>
    
            <div className="container" onClick={this.props.openVillageois}>
                <img src={villager} alt="villageois"></img>
                <h3>Villageois</h3>
            </div>
    
          </section>

          </div>
        )
    }
};

class Art extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        data: []
      }
    }
  
    componentDidMount() {
      fetch('https://acnhapi.com/v1a/art')
          .then(res => res.json())
          .then(result => {
            this.setState({data: result});
          })
    }
  
    render(){
  
      return (
        <div>
          <h1 className="pagetitle">Guide des oeuvres d'art</h1>
  
            <div id="items">
              {this.state.data.map(item => 
                <div className="element" key={item.name["name-EUfr"]}>
                  <img className="art-photo" src={item.image_uri} alt={item.name["name-EUfr"]}></img>
                  <p className="name">{item.name["name-EUfr"].toUpperCase()}</p>
                  <div className="infos">
                    <p className="hasfake"><span className="bold">Contrefaçon : </span>{item.hasFake === true ? "Existe" : "Pas de contrefaçon"}</p>
                    <p className="price"><span className="bold">Prix : </span>{item["buy-price"]} clo.</p>
                  </div>
                </div>
              )}
              </div>
        </div>
      );
  
    }
};

class Bugs extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        data: [],
        value: "tous",
        filteredData: []
      }
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    componentDidMount() {
      fetch('https://acnhapi.com/v1a/bugs')
          .then(res => res.json())
          .then(result => {
            this.setState({data: result, filteredData: result});
          })
    }
  
    handleChange(event){
      this.setState({value: event.target.value});
  
      if(event.target.value === "tous"){
        this.setState({filteredData: this.state.data})
  
      } else if(event.target.value === "mois"){
        let now = new Date().getMonth() + 1;
  
        this.setState({filteredData: this.state.data.filter(item => item.availability["month-array-northern"].includes(now))});
  
      } else if(event.target.value === "maintenant"){
        let mois = new Date().getMonth() +1;
        let heure = new Date().getHours();
  
        this.setState({filteredData: this.state.data.filter(item => item.availability["month-array-northern"].includes(mois) && item.availability["time-array"].includes(heure))});
      }
    }
  
    render(){
  
      return (
        <div>
            <h1 className="pagetitle">Guide des insectes</h1>
  
            <div id="tri">
              <label htmlFor="trier-par" id="tri-label">Trier par :</label>
              <div id="select">
                <select name="trier-par" id="trier-par" value={this.state.value} onChange={this.handleChange}>
                  <option value="tous">Tous</option>
                  <option value="mois">Ce mois-ci</option>
                  <option value="maintenant">Maintenant</option>
                </select>
              </div>
            </div>
  
            <div id="items">
              {this.state.filteredData.map(item => 
                <div className="element" key={item.name["name-EUfr"]}>
                  <img className="bug-photo" src={item.image_uri} alt={item.name["name-EUfr"]}></img>
                  <p className="name">{item.name["name-EUfr"].toUpperCase()}</p>
                  <div className="infos">
  
                    <p className="month"><span className="bold">Mois : </span>
                    {(() => {if(item.availability.isAllYear === true){return ("Toute l'année")}
                            else{
                              let str = item.availability["month-northern"];
                              let nums = item.availability["month-northern"].match(/\d+/g);
                              const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
                              
                              for(let i = 0; i < nums.length; i++){
                                str = str.replace(nums[i], months[parseInt(nums[i] - 1 )]);
                              }
  
                              str = str[0].toUpperCase() + str.slice(1).replaceAll("-", " à ");
                              return str;
                            }})()}</p>
  
                    <p className="heure"><span className="bold">Heures : </span>
                    {(() => {if(item.availability.isAllDay === true){return ("Toute la journée")}
                            else{
                              let newTime = item.availability.time.split(' ');
                              let amRegex = /\d+am/;
                              let pmRegex = /\d+pm/;
                              for(let i = 0; i < newTime.length; i++){
                                if(amRegex.test(newTime[i])){
                                  newTime[i] = newTime[i].replace("am", "h");
                                } else if (pmRegex.test(newTime[i])){
                                  newTime[i] = (parseInt(newTime[i]) + 12) + "h";
                                }
                              }
                              return newTime.join(' ');
                            }})()}</p>
  
                    <p className="location"><span className="bold">Location : </span>
                    {(() => {if(item.availability.location === "Flying"){return ("Ciel")}
                            else if(item.availability.location === "Flying near hybrid flowers"){return ("Près des fleurs hybrides")}
                            else if(item.availability.location === "Flying by light"){return ("Près des lumières")}
                            else if(item.availability.location === "On trees"){return ("Arbres")}
                            else if(item.availability.location === "On the ground"){return ("Sol")}
                            else if(item.availability.location === "On flowers"){return ("Fleurs")}
                            else if(item.availability.location === "On white flowers"){return ("Fleurs blanches")}
                            else if(item.availability.location === "Shaking trees"){return ("En secouant les arbres")}
                            else if(item.availability.location === "Flying (near water)"){return ("Ciel (près de l'eau)")}
                            else if(item.availability.location === "Underground"){return ("Sous terre")}
                            else if(item.availability.location === "On ponds and rivers"){return ("Sur l'eau")}
                            else if(item.availability.location === "On tree stumps"){return ("Souches d'arbres")}
                            else if(item.availability.location === "On palm trees"){return ("Palmiers")}
                            else if(item.availability.location === "Under trees"){return ("Sous les arbres")}
                            else if(item.availability.location === "On rotten food"){return ("Nourriture pourrie")}
                            else if(item.availability.location === "On the beach"){return ("Plage")}
                            else if(item.availability.location === "On beach rocks"){return ("Plage (rochers)")}
                            else if(item.availability.location === "Near trash"){return ("Déchets")}
                            else if(item.availability.location === "On villagers"){return ("Villageois")}
                            else if(item.availability.location === "On rocks and bush (when raining)"){return ("Rochers et buissons (pluie)")}
                            else if(item.availability.location === "Hitting rocks"){return ("En tapant sur les rochers")}})()}</p>
  
                    <p className="rarity"><span className="bold">Rareté : </span>
                    {(() => {if(item.availability.rarity === "Common"){return ("Commun")}
                              else if(item.availability.rarity === "Uncommon"){return ("Peu commun")}
                              else if(item.availability.rarity === "Rare"){return ("Rare")}
                              else if(item.availability.rarity === "Ultra-rare"){return ("Très rare")}})()}</p>
  
                    <p className="price"><span className="bold">Prix : </span>{item.price} clo.</p>
                  </div>
                </div>
              )}
              </div>
        </div>
      );
  
    }
};

class Fish extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        data: [],
        value: "tous",
        filteredData: []
      }

      this.handleChange = this.handleChange.bind(this);
    }
  
    componentDidMount() {
      fetch('https://acnhapi.com/v1a/fish')
          .then(res => res.json())
          .then(result => {
            this.setState({data: result, filteredData: result});
          })
    };
  
    handleChange(event){
      this.setState({value: event.target.value});
  
      if(event.target.value === "tous"){
        this.setState({filteredData: this.state.data})
  
      } else if(event.target.value === "mois"){
        let now = new Date().getMonth() + 1;
  
        this.setState({filteredData: this.state.data.filter(item => item.availability["month-array-northern"].includes(now))});
  
      } else if(event.target.value === "maintenant"){
        let mois = new Date().getMonth() +1;
        let heure = new Date().getHours();
  
        this.setState({filteredData: this.state.data.filter(item => item.availability["month-array-northern"].includes(mois) && item.availability["time-array"].includes(heure))});
      }
    }
  
    render(){
  
      return (
        <div>
            <h1 className="pagetitle">Guide des poissons</h1>
  
            <div id="tri">
              <label htmlFor="trier-par" id="tri-label">Trier par :</label>
              <div id="select">
                <select name="trier-par" id="trier-par" value={this.state.value} onChange={this.handleChange}>
                  <option value="tous">Tous</option>
                  <option value="mois">Ce mois-ci</option>
                  <option value="maintenant">Maintenant</option>
                </select>
              </div>
            </div>
  
            <div id="items">
              {this.state.filteredData.map(item => 
                <div className="element" key={item.name["name-EUfr"]}>
                  <img className="fish-photo" src={item.image_uri} alt={item.name["name-EUfr"]}></img>
                  <p className="name">{item.name["name-EUfr"].toUpperCase()}</p>
                  <div className="infos">
  
                    <p className="month"><span className="bold">Mois : </span>
                      {(() => {if(item.availability.isAllYear === true){return ("Toute l'année")}
                            else{
                              let str = item.availability["month-northern"];
                              let nums = item.availability["month-northern"].match(/\d+/g);
                              const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
                              
                              for(let i = 0; i < nums.length; i++){
                                str = str.replace(nums[i], months[parseInt(nums[i] - 1 )]);
                              }
  
                              str = str[0].toUpperCase() + str.slice(1).replaceAll("-", " à ");
                              return str;
                            }})()}</p>
  
                    <p className="heure"><span className="bold">Heures : </span>
                      {(() => {if(item.availability.isAllDay === true){return ("Toute la journée")}
                            else{
                              let newTime = item.availability.time.split(' ');
                              let amRegex = /\d+am/;
                              let pmRegex = /\d+pm/;
                              for(let i = 0; i < newTime.length; i++){
                                if(amRegex.test(newTime[i])){
                                  newTime[i] = newTime[i].replace("am", "h");
                                } else if (pmRegex.test(newTime[i])){
                                  newTime[i] = (parseInt(newTime[i]) + 12) + "h";
                                }
                              }
                              return newTime.join(' ');
                            }})()}</p>
  
                    <p className="location"><span className="bold">Location : </span>
                      {(() => {if(item.availability.location === "River"){return ("Rivière")}
                            else if(item.availability.location === "Pond"){return ("Étang")}
                            else if(item.availability.location === "River (Clifftop)"){return ("Rivière (falaise)")}
                            else if(item.availability.location === "River (Mouth)"){return ("Rivière (embouchure)")}
                            else if(item.availability.location === "Sea"){return ("Océan")}
                            else if(item.availability.location === "Pier"){return ("Océan (ponton)")}})()}</p>
  
                    <p className="taille"><span className="bold">Taille : </span>
                      {(() => {if(item.shadow === "Smallest (1)"){return ("Minuscule")}
                              else if(item.shadow === "Small (2)"){return ("Petit")}
                              else if(item.shadow === "Medium (3)"){return ("Moyen")}
                              else if(item.shadow === "Medium (4)"){return ("Grand")}
                              else if(item.shadow === "Medium with fin (4)"){return "Grand avec aileron"}
                              else if(item.shadow === "Large (5)"){return ("Très grand")}
                              else if(item.shadow === "Largest (6)"){return ("Énorme")}
                              else if(item.shadow === "Largest with fin (6)"){return ("Énorme avec aileron")}
                              else if(item.shadow === "Narrow"){return ("Très fin")}})()}</p>
  
                    <p className="rarity"><span className="bold">Rareté : </span>
                      {(() => {if(item.availability.rarity === "Common"){return ("Commun")}
                              else if(item.availability.rarity === "Uncommon"){return ("Peu commun")}
                              else if(item.availability.rarity === "Rare"){return ("Rare")}
                              else if(item.availability.rarity === "Ultra-rare"){return ("Très rare")}})()}</p>
  
                    <p className="price"><span className="bold">Prix : </span>{item.price} clo.</p>
                  </div>
                </div>
              )}
              </div>
        </div>
      );
  
    }
};

class Fossil extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        data: []
      }
    }
  
    componentDidMount() {
      fetch('https://acnhapi.com/v1a/fossils')
          .then(res => res.json())
          .then(result => {
            this.setState({data: result});
          })
    }
  
    render(){
  
      return (
        <div>
            <h1 className="pagetitle">Guide des fossiles</h1>
  
            <div id="items">
              {this.state.data.map(item => 
                <div className="element" key={item.name["name-EUfr"]}>
                  <img className="fossil-photo" src={item.image_uri} alt={item.name["name-EUfr"]}></img>
                  <p className="name">{item.name["name-EUfr"].toUpperCase()}</p>
                  <div className="infos">
                    <p className="price"><span className="bold">Prix : </span>{item.price} clo.</p>
                  </div>
                </div>
              )}
              </div>
        </div>
      );
  
    }
};

class SeaCreature extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        data: [],
        value: "tous",
        filteredData: []
      }
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    componentDidMount() {
      fetch('https://acnhapi.com/v1a/sea')
          .then(res => res.json())
          .then(result => {
            this.setState({data: result, filteredData: result});
          })
    }
  
    handleChange(event){
      this.setState({value: event.target.value});
  
      if(event.target.value === "tous"){
        this.setState({filteredData: this.state.data})
  
      } else if(event.target.value === "mois"){
        let now = new Date().getMonth() + 1;
  
        this.setState({filteredData: this.state.data.filter(item => item.availability["month-array-northern"].includes(now))});
  
      } else if(event.target.value === "maintenant"){
        let mois = new Date().getMonth() +1;
        let heure = new Date().getHours();
  
        this.setState({filteredData: this.state.data.filter(item => item.availability["month-array-northern"].includes(mois) && item.availability["time-array"].includes(heure))});
      }
    }
  
    render(){
  
      return (
        <div>
            <h1 className="pagetitle">Guide des créatures<br/> marines</h1>
  
            <div id="tri">
              <label htmlFor="trier-par" id="tri-label">Trier par :</label>
              <div id="select">
                <select name="trier-par" id="trier-par" value={this.state.value} onChange={this.handleChange}>
                  <option value="tous">Tous</option>
                  <option value="mois">Ce mois-ci</option>
                  <option value="maintenant">Maintenant</option>
                </select>
              </div>
            </div>
  
            <div id="items">
              {this.state.filteredData.map(item => 
                <div className="element" key={item.name["name-EUfr"]}>
                  <img className="sea-photo" src={item.image_uri} alt={item.name["name-EUfr"]}></img>
                  <p className="name">{item.name["name-EUfr"].toUpperCase()}</p>
                  <div className="infos">
  
                    <p className="month"><span className="bold">Mois : </span>
                    {(() => {if(item.availability.isAllYear === true){return ("Toute l'année")}
                            else{
                              let str = item.availability["month-northern"];
                              let nums = item.availability["month-northern"].match(/\d+/g);
                              const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
                              
                              for(let i = 0; i < nums.length; i++){
                                str = str.replace(nums[i], months[parseInt(nums[i] - 1 )]);
                              }
  
                              str = str[0].toUpperCase() + str.slice(1).replaceAll("-", " à ");
                              return str;
                            }})()}</p>
  
                    <p className="heure"><span className="bold">Heures : </span>
                    {(() => {if(item.availability.isAllDay === true){return ("Toute la journée")}
                            else{
                              let newTime = item.availability.time.split(' ');
                              let amRegex = /\d+am/;
                              let pmRegex = /\d+pm/;
                              for(let i = 0; i < newTime.length; i++){
                                if(amRegex.test(newTime[i])){
                                  newTime[i] = newTime[i].replace("am", "h");
                                } else if (pmRegex.test(newTime[i])){
                                  newTime[i] = (parseInt(newTime[i]) + 12) + "h";
                                }
                              }
                              return newTime.join(' ');
                            }})()}</p>
  
                    <p className="speed"><span className="bold">Vitesse : </span>
                    {(() => {if(item.speed === "Stationary"){return ("Immobile")}
                            else if(item.speed === "Very slow"){return ("Très lente")}
                            else if(item.speed === "Slow"){return ("Lente")}
                            else if(item.speed === "Medium"){return ("Moyenne")}
                            else if(item.speed === "Fast"){return ("Rapide")}
                            else if(item.speed === "Very fast"){return ("Très rapide")}
                    })()}</p>
  
                    <p className="taille"><span className="bold">Taille : </span>
                    {(() => {if(item.shadow === "Smallest"){return ("Très petit")}
                            else if(item.shadow === "Small"){return ("Petit")}
                            else if(item.shadow === "Medium"){return ("Moyen")}
                            else if(item.shadow === "Large"){return ("Grand")}
                            else if(item.shadow === "Largest"){return ("Très grand")}
                    })()}</p>
  
                    <p className="price"><span className="bold">Prix : </span>{item.price} clo.</p>
                  </div>
                </div>
              )}
              </div>
        </div>
      );
  
    }
};

class Villager extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        menu: "invisible",
        data: []
      }
  
      this.openmenu = this.openmenu.bind(this);
    }
  
    componentDidMount() {
      fetch('https://acnhapi.com/v1a/villagers')
          .then(res => res.json())
          .then(result => {
            this.setState({data: result});
          })
    }
  
    openmenu(){
      if(this.state.menu === "invisible"){
        this.setState({menu: "visible"})
        return document.getElementById("menu").style.display = "block";
      } else if (this.state.menu === "visible"){
        this.setState({menu: "invisible"})
        return document.getElementById("menu").style.display = "none";
      }
    }
  
    render(){
  
      return (
        <div>
            <h1 className="pagetitle">Guide des villageois</h1>
  
            <div id="items">
              {this.state.data.map(item => 
                <div className="element" key={item.name["name-EUfr"]}>
                  <img className="villager-photo" src={item.image_uri} alt={item.name["name-EUfr"]}></img>
                  <p className="name">{item.name["name-EUfr"].toUpperCase()}</p>
                  <div className="infos">
  
                    <p className="personnalite"><span className="bold">Personnalité : </span>
                    {(() => {if(item.personality === "Cranky"){return ("Versatile")}
                            else if(item.personality === "Jock"){return ("Sportif")}
                            else if(item.personality === "Smug"){return ("Chic")}
                            else if(item.personality === "Lazy"){return ("Paresseux")}
                            else if(item.personality === "Peppy"){return ("Vive")}
                            else if(item.personality === "Snooty"){return ("Arrogante")}
                            else if(item.personality === "Normal"){return ("Normale")}
                            else if(item.personality === "Uchi"){return ("Grande Soeur")}
                    })()}</p>
  
                    <p className="anniversaire"><span className="bold">Anniversaire : </span>
                    {(() => {
                      let str = item.birthday;
                      let bMonth = str.match(/\d+$/);
                      const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  
                      str = str.replace(/\d+$/, months[parseInt(bMonth) - 1]).replace("/", " ");
                      return str;
                    })()}</p>
  
                    <p className="espece"><span className="bold">Espèce : </span>
                    {(() => {if(item.species === "Anteater"){return ("Fourmilier")}
                            else if(item.species === "Bear"){return ("Ours")}
                            else if(item.species === "Bird"){return ("Oiseau")}
                            else if(item.species === "Bull"){return ("Taureau")}
                            else if(item.species === "Cat"){return ("Chat")}
                            else if(item.species === "Cub"){return ("Ourson")}
                            else if(item.species === "Chicken"){return ("Poulet")}
                            else if(item.species === "Cow"){return ("Vache")}
                            else if(item.species === "Deer"){
                              if(item.gender === "Male"){return ("Cerf")}
                              else{return ("Biche")}
                            }
                            else if(item.species === "Dog"){return ("Chien")}
                            else if(item.species === "Duck"){return ("Canard")}
                            else if(item.species === "Frog"){return ("Grenouille")}
                            else if(item.species === "Goat"){return ("Chèvre")}
                            else if(item.species === "Gorilla"){return ("Gorille")}
                            else if(item.species === "Hippo"){return ("Hippopotame")}
                            else if(item.species === "Horse"){return ("Cheval")}
                            else if(item.species === "Kangaroo"){return ("Kangourou")}
                            else if(item.species === "Monkey"){return ("Singe")}
                            else if(item.species === "Mouse"){return ("Souris")}
                            else if(item.species === "Octopus"){return ("Poulpe")}
                            else if(item.species === "Ostrich"){return ("Autruche")}
                            else if(item.species === "Eagle"){return ("Aigle")}
                            else if(item.species === "Penguin"){return ("Pingouin")}
                            else if(item.species === "Pig"){return ("Cochon")}
                            else if(item.species === "Rabbit"){return ("Lapin")}
                            else if(item.species === "Rhino"){return ("Rhinocéros")}
                            else if(item.species === "Sheep"){return ("Mouton")}
                            else if(item.species === "Squirrel"){return ("Écureuil")}
                            else if(item.species === "Tiger"){return ("Tigre")}
                            else if(item.species === "Wolf"){return ("Loup")}
                            else{return item.species}
                    })()}</p>
  
                    <p className="genre"><span className="bold">Genre : </span>{item.gender === "Male" ? "Masculin" : "Féminin"}</p>
                  </div>
                </div>
              )}
              </div>
        </div>
      );
  
    }
};

class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        menu: "invisible",
        content: <Home openFish={this.openFish} openInsectes={this.openInsectes} openCreatures={this.openCreatures} openFossiles={this.openFossiles} openArt={this.openArt} openVillageois={this.openVillageois}/>
      }
  
      this.openmenu = this.openmenu.bind(this);
      this.openFish = this.openFish.bind(this);
      this.openInsectes = this.openInsectes.bind(this);
      this.openCreatures = this.openCreatures.bind(this);
      this.openFossiles = this.openFossiles.bind(this);
      this.openArt = this.openArt.bind(this);
      this.openVillageois = this.openVillageois.bind(this);
      this.openIndex = this.openIndex.bind(this);
    }

    componentDidMount(){
        this.setState({content: <Home openFish={this.openFish} openInsectes={this.openInsectes} openCreatures={this.openCreatures} openFossiles={this.openFossiles} openArt={this.openArt} openVillageois={this.openVillageois}/>})
    }

    openmenu(){
        if(this.state.menu === "invisible"){
            this.setState({menu: "visible"})
            document.getElementById("menu").style.display = "block";
        } else if (this.state.menu === "visible"){
            this.setState({menu: "invisible"})
            document.getElementById("menu").style.display = "none";
        }
    };

    openFish(){
        this.setState({content: <Fish />});
        if(this.state.menu === 'visible') this.openmenu();
    };

    openInsectes(){
        this.setState({content: <Bugs />});
        if(this.state.menu === 'visible') this.openmenu();
    };

    openCreatures(){
        this.setState({content: <SeaCreature />});
        if(this.state.menu === 'visible') this.openmenu();
    };

    openFossiles(){
        this.setState({content: <Fossil />});
        if(this.state.menu === 'visible') this.openmenu();
    };

    openArt(){
        this.setState({content: <Art />});
        if(this.state.menu === 'visible') this.openmenu();
    };

    openVillageois(){
        this.setState({content: <Villager />});
        if(this.state.menu === 'visible') this.openmenu();
    };

    openIndex(){
        this.setState({content: <Home openFish={this.openFish} openInsectes={this.openInsectes} openCreatures={this.openCreatures} openFossiles={this.openFossiles} openArt={this.openArt} openVillageois={this.openVillageois}/>});
        if(this.state.menu === 'visible') this.openmenu();
    };
  
    
  
    render(){
  
    return (
      <div>

        <nav id="nav">
            <button id="button-menu" onClick={this.openmenu}>Menu</button>
             <div id="menu">
             <ul>
              <li key="index" onClick={this.openIndex}>➤ Index</li>
              <li key="fish" onClick={this.openFish}>➤ Poissons</li>
              <li key="bugs" onClick={this.openInsectes}>➤ Insectes</li>
              <li key="sea-creatures" onClick={this.openCreatures}>➤ Créatures marines</li>
              <li key="fossils" onClick={this.openFossiles}>➤ Fossiles</li>
              <li key="art" onClick={this.openArt}>➤ Art</li>
              <li key="villagers" onClick={this.openVillageois}>➤ Villageois</li>
             </ul>
            </div>
        </nav>

        <div id="main-content">
            {this.state.content}
        </div>

        <section id="footer">
                <img id="melimelo" src={melimelo} alt="Meli et Melo"></img>
                <p>© Créé par Alice Guegan</p>
        </section>
      </div>
    );
  
    }
};

export default App;
