import { promises as fs } from "fs";

let citiesInStates = [];
let listNamesBiggest = [];
let listNamesSmallest = [];

Promise.all([
createUFsJsons(),
quantityCitiesInJSON(),
fiveStatesThatHaveMoreCities(),
fiveStatesleastCities(),
biggestCityInEachState(),
smallestCityOfEachState(),
]);

// biggestCityAmongAllStates();


async function createUFsJsons() {
  try {
    let cities = JSON.parse(
      await fs.readFile("./assets/Cidades.json", "utf-8")
    );
    const states = JSON.parse(
      await fs.readFile("./assets/Estados.json", "utf-8")
    );

    citiesInStates = states.map((currentState) => {
      cities = cities.map(currentCity => {
        if(currentCity.Estado === currentState.ID) {
          return currentCity  = Object.assign(currentCity, {
            Sigla: currentState.Sigla})} else {
              return cities = currentCity;
            };
      });
      return cities.filter(
        currentCity => currentCity.Estado === currentState.ID);
    });

    for await (let currentState of states) {
      fs.writeFile(
        `./UFsJson/${currentState.Sigla}.json`,
        JSON.stringify(citiesInStates[currentState.ID - 1])
      );
    }
    return citiesInStates;
  } catch (error) {
    console.log(error);
  }
}

async function quantityCitiesInJSON() {
  let quantityCitiesInState = [];
  try {
    const paths = await fs.readdir("UFsJson");
    for await (let path of paths) {
      quantityCitiesInState = JSON.parse(
        await fs.readFile(`UFsJson/${path}`, "utf-8")
      );
      // console.log(
      //   `UF: ${path.slice(0, 2)}, Quantide de Cidades: ${
      //     quantityCitiesInState.length
      //   }`
      // );
    }
  } catch (error) {
    console.log(error);
  }
}

function fiveStatesThatHaveMoreCities() {
  let fiveStates = [];
  createUFsJsons().then((citiesInStates) => {
    fiveStates = citiesInStates.map(currentCity => {
        return {"UF": currentCity[0].Sigla, "TotalCidades": currentCity.length};
      });
  fiveStates.sort((a, b) => b.TotalCidades - a.TotalCidades);
  // console.log("Cinco estados que mais possuem cidades");    
  // console.log(`${[JSON.stringify(fiveStates.slice(0, 5))]}`);
});
}

function fiveStatesleastCities() {
  let fiveStates = [];
  createUFsJsons().then(citiesInStates => {
    fiveStates = citiesInStates.map(currentCity => {
        return {"UF": currentCity[0].Sigla, "TotalCidades": currentCity.length};
      });
  fiveStates.sort((a, b) => a.TotalCidades - b.TotalCidades);
  console.log("Cinco estados que menos possuem cidades");    
  console.log(`${[JSON.stringify(fiveStates.slice(0, 5))]}`);
});
}

function biggestCityInEachState() {
  let namesBiggest = [];
  createUFsJsons().then(citiesInStates => {
    citiesInStates.forEach(cities => {
      namesBiggest = cities.map(currentCity => {
          return {"Nome": currentCity.Nome, 
                  "TamanhoDoNome": currentCity.Nome.length,
                  "UF": currentCity.Sigla}
        });
      
      namesBiggest = namesBiggest.sort((a, b) => {
        if(b.TamanhoDoNome === a.TamanhoDoNome) {
          return b.Nome - a.Nome;
        } else {
          return b.TamanhoDoNome - a.TamanhoDoNome
        }
      });
      listNamesBiggest = namesBiggest.slice(0, 1);
      // console.log("Cidade de maior nome de cada estado");
      // console.log(listNamesBiggest);
    });
  });
}

function smallestCityOfEachState() {
  let namesSmallest = [];
  createUFsJsons().then(citiesInStates => {
    citiesInStates.forEach(cities => {
      namesSmallest = cities.map(currentCity => {
          return {"Nome": currentCity.Nome, 
                  "TamanhoDoNome": currentCity.Nome.length,
                  "UF": currentCity.Sigla}
        });
      
        namesSmallest = namesSmallest.sort((a, b) => {
        if(b.TamanhoDoNome === a.TamanhoDoNome) {
          return a.Nome - b.Nome;
        } else {
          return a.TamanhoDoNome - b.TamanhoDoNome
        }
      });
      listNamesSmallest = namesSmallest.slice(0, 1);
      // console.log("Cidade de menor nome de cada estado");
      // console.log(listNamesSmallest);
    });
  })
}

// function biggestCityAmongAllStates() {
//   let listOrder = [];
//   let OrderedNames = [];
//   createUFsJsons().then(citiesInStates => {
//     citiesInStates.forEach(cities => {
//       listOrder = cities.map(currentCity => {
//           return {"Nome": currentCity.Nome, 
//                   "TamanhoDoNome": currentCity.Nome.length,
//                   "UF": currentCity.Sigla}
//         });

//         listOrder = listOrder.sort((a, b) => {
//           if(b.TamanhoDoNome === a.TamanhoDoNome) {
//             return b.Nome - a.Nome;
//           } else {
//             return b.TamanhoDoNome - a.TamanhoDoNome
//           }
//         });
//         OrderedNames = listOrder.slice(0, 1);
        
//         OrderedNames = OrderedNames.sort((a,b) => {
//           console.log(a);
//           console.log(b);
//         });

//       //console.log(OrderedNames[0]);
//     });
//   });
// }

