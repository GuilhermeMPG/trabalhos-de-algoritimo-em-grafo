const lineReader = require("line-reader");
let lista_Adjacencia = [{ arr: [], pred:[] }];
let contador_Linha = 0;

let vertice = null;
let aresta = null;


//loop para ler cada linha, e separar os numeros 
lineReader.eachLine("./graph-test-50000.txt", (line, last) => { //escolha do arquivo a ser lido 
  let linha = line + ";";
  var i = 0;
  let origemAresta = null;
  let destinoAresta = null;
  flag1 = true;

  while (linha.charAt(i) != ";" && flag1 == true) {
    let flag2 = true;
    let controle = 1;
    let numero = null;
    let letra = linha.charAt(i);

    if (letra != " ") {
      numero = linha.charAt(i);

      while (flag2 === true) {
        i++;
        if (linha.charAt(i) != " ") {
          if (linha.charAt(i) != ";") {
            numero = numero + linha.charAt(i);
          } else {
            flag2 = false;
            flag1 = false;
          }
        } else {
          flag2 = false;
        }
      }
    }

    if (contador_Linha > 0) {
      if (origemAresta != null) {
        destinoAresta = numero;
      } else {
        origemAresta = numero;
      }
    } else {
      if (vertice == null) {
        vertice = numero;
        // criar_ListaDeAdjacencia(vertice);
      } else {
        aresta = numero;
      }
    }

    i++;
  }

  contador_Linha++;

  // console.log("transfirmado: "+Number(origemAresta)+"  "+Number(destinoAresta))
  adicionar_ListaDeAdjacencia(Number(origemAresta), Number(destinoAresta)); // chama a funçao para adicionar os valores de cada linha no lugar certo
  // console.log(lista_Adjacencia);

  if (last == true) {
    //interface_Dados();
    teste();
    // console.log(lista_Adjacencia);
  }
});

// function criar_ListaDeAdjacencia(vertice){
//     for(let j=0;j<=vertice; j++){

//     let objeto = {
//         arr: []
//     }

//     lista_Adjacencia [j] = objeto;
// }

// }


//funçao que adicionaos valores no arrey 
function adicionar_ListaDeAdjacencia(origemAresta, destinoAresta) {

  if (lista_Adjacencia[origemAresta] && lista_Adjacencia[destinoAresta]) {
    lista_Adjacencia[origemAresta].arr.push(destinoAresta);
    lista_Adjacencia[destinoAresta].pred.push(origemAresta);
  } else {
    if (!lista_Adjacencia[origemAresta]) {
      let objeto = {
        arr: [destinoAresta],
        pred: [],
      };

      lista_Adjacencia[origemAresta] = objeto;
    } else {
      lista_Adjacencia[origemAresta].arr.push(destinoAresta);
    }
    if (!lista_Adjacencia[destinoAresta]) {
      let objeto = {
        arr: [],
        pred: [origemAresta],
      };

      lista_Adjacencia[destinoAresta] = objeto;
    } else {
      lista_Adjacencia[destinoAresta].pred.push(origemAresta);
    }
  }
}
// apaenas para teste, mostra os resultados referentes ao vertice escolhido 
function teste (){
   
   let numero_Escolhido = 3;
    console.log('Tamanho lista: '+(lista_Adjacencia.length-1)) ;

    console.log('Grau de Saida: '+lista_Adjacencia[numero_Escolhido].arr.length)
    console.log( 'Sucessores: '+lista_Adjacencia[numero_Escolhido].arr)
    console.log('Grau de Entrada: '+lista_Adjacencia[numero_Escolhido].pred.length)
    console.log('Predecessores: '+lista_Adjacencia[numero_Escolhido].pred)


}
// nao usei ainda , mas era pra escolher o que mostrar e tals 
function interface_Dados() {
  let escolha = 0;
  let vertice_escolhido = 0;

  switch (escolha) {
    case 1:
      grau_DeEntrada(vertice_escolhido);
    case 2:
      grau_DeSaida(vertice_escolhido);
    case 3:
      conjunto_DeSucessores(vertice_escolhido);
    case 4:
      conjunto_DePredecessores(vertice_escolhido);
    case 5:
      mostrar_Todos(vertice_escolhido);
    case 5:
      sair();
  }
}
