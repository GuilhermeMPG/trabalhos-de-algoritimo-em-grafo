/*
Atividade 1 de Algoritmos em Grafos
Alunos: Guilherme Marcos Pereira Goncalves e Cristian Fernandes Sena
Desenvolvido em node.js
*/


const lineReader = require("line-reader");
let lista_Adjacencia = [{ arr: [], pred:[] }];
let contador_Linha = 0;
let trash;

let vertice = null;
let aresta = null;
main();

//Ler os valores do aquivo especificado
function lerArq(name){
  //loop para ler cada linha, e separar os numeros 
  lineReader.eachLine("./"+name, (line, last) => { //escolha do arquivo a ser lido 
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
      interface_Dados();
      //teste();

      // console.log(lista_Adjacencia);
    }
  });
}

// function criar_ListaDeAdjacencia(vertice){
//     for(let j=0;j<=vertice; j++){

//     let objeto = {
//         arr: []
//     }

//     lista_Adjacencia [j] = objeto;
// }

// }


//Funçao que adiciona os valores no arrey 
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

//Interface de menu e resultados
function interface_Dados() {

  let readline = require('readline-sync'); //Para a leitura dos dados

  let escolha;
  
  console.log('Tamanho lista criada: '+(lista_Adjacencia.length-1));

  let vertice_escolhido = readline.question('Escolha um vertice para comecar:\n');

  do{
    console.clear();
    console.log('Vertice escolhido: '+vertice_escolhido);

    console.log('\nEscolha uma opcao abaixo:');
    console.log('1 - Grau de Saida');
    console.log('2 - Grau de Entrada');
    console.log('3 - Sucessores');
    console.log('4 - Predecessores');
    console.log('5 - Todas opcoes');
    console.log('6 - Sair');

    escolha = readline.question('-----------------------\n');

    switch (+escolha) {      //+ faz o cast para int
      case 1:
        console.log('Grau de Saida: '+lista_Adjacencia[vertice_escolhido].arr.length);
        trash = readline.question('Pressione qualquer tecla para continuar...') ;
        break;
      case 2:
        console.log('Grau de Entrada: '+lista_Adjacencia[vertice_escolhido].pred.length);
        trash = readline.question('Pressione qualquer tecla para continuar...') ;
        break;
      case 3:
        console.log('Sucessores: '+lista_Adjacencia[vertice_escolhido].arr);
        trash = readline.question('Pressione qualquer tecla para continuar...') ;
        break;
      case 4:
        console.log('Predecessores: '+lista_Adjacencia[vertice_escolhido].pred);
        trash = readline.question('Pressione qualquer tecla para continuar...') ;
        break;
      case 5:
        console.log('Grau de Saida: '+lista_Adjacencia[vertice_escolhido].arr.length);
        console.log('Sucessores: '+lista_Adjacencia[vertice_escolhido].arr);
        console.log('Grau de Entrada: '+lista_Adjacencia[vertice_escolhido].pred.length);
        console.log('Predecessores: '+lista_Adjacencia[vertice_escolhido].pred);
        trash = readline.question('Pressione qualquer tecla para continuar...') ;
        break;
      case 6:
        break;
      default:
        console.log('Opcao invalida');
        trash = readline.question('Pressione qualquer tecla para continuar...') ;
    }
  }while(escolha != 6);
}

function main(){
  let readline = require('readline-sync'); //Para a leitura dos dados

  let invalido = true;

  while(invalido){

    console.clear();
    let op_arquivo = readline.question('Seja bem-vindo! \n\nDigite 1 para escolher o arquivo de 100 vertices, 2 para escolher o arquivo de 50000 vertices ou digite o nome de um arquivo especifico (Ex: arq.txt):\n') ;

    if(op_arquivo == 1){
      lerArq("graph-test-100.txt");
      invalido = false;
    }else if(op_arquivo == 2){
      lerArq("graph-test-50000.txt");
      invalido = false;
    }else{
      try {
        lerArq(op_arquivo);
        invalido = false;
      }
      catch(e) { //Não conseguiu ler o arquivo
        console.log('Erro no arquivo: ' + e);
        trash = readline.question('Pressione qualquer tecla para continuar...') ;
      }
    }
  }

}