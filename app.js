/*
Atividade 1 de Algoritmos em Grafos
Alunos: Guilherme Marcos Pereira Goncalves e Cristian Fernandes Sena
Desenvolvido em node.js
*/

// const busca = require("./busca")

const lineReader = require('line-reader');
let lista_Adjacencia = [{ arr: [], pred: [] }];
let contador_Linha = 0;
let trash;

let vertice = null;
let aresta = null;
main();

//Ler os valores do aquivo especificado
function lerArq(name) {
     //loop para ler cada linha, e separar os numeros
     lineReader.eachLine('./' + name, (line, last) => {
          //escolha do arquivo a ser lido
          let linha = line + ';';
          var i = 0;
          let origemAresta = null;
          let destinoAresta = null;
          flag1 = true;

          while (linha.charAt(i) != ';' && flag1 == true) {
               let flag2 = true;
               let controle = 1;
               let numero = null;
               let letra = linha.charAt(i);

               if (letra != ' ') {
                    numero = linha.charAt(i);

                    while (flag2 === true) {
                         i++;
                         if (linha.charAt(i) != ' ') {
                              if (linha.charAt(i) != ';') {
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
          adicionar_ListaDeAdjacencia(
               Number(origemAresta),
               Number(destinoAresta)
          ); // chama a funçao para adicionar os valores de cada linha no lugar certo
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

     console.log('Tamanho lista criada: ' + (lista_Adjacencia.length - 1));

     let vertice_escolhido = readline.question(
          'Escolha um vertice para comecar:\n'
     );

     do {
          console.clear();
          console.log('Vertice escolhido: ' + vertice_escolhido);

          console.log('\nEscolha uma opcao abaixo:');
          console.log('1 - Grau de Saida');
          console.log('2 - Grau de Entrada');
          console.log('3 - Sucessores');
          console.log('4 - Predecessores');
          console.log('5 - Todas opcoes');
          console.log('6 - Busca Largura');
          console.log('7 - Busca Profundidade');
          console.log('8 - Caminho Vertice');
          console.log('9 - Testa Conexo');
          console.log('10 - Testa Ciclo');
          console.log('11 - Sair');

          escolha = readline.question('-----------------------\n');

          switch (
               +escolha //+ faz o cast para int
          ) {
               case 1:
                    console.log(
                         'Grau de Saida: ' +
                              lista_Adjacencia[vertice_escolhido].arr.length
                    );
                    trash = readline.question(
                         'Pressione qualquer tecla para continuar...'
                    );
                    break;
               case 2:
                    console.log(
                         'Grau de Entrada: ' +
                              lista_Adjacencia[vertice_escolhido].pred.length
                    );
                    trash = readline.question(
                         'Pressione qualquer tecla para continuar...'
                    );
                    break;
               case 3:
                    console.log(
                         'Sucessores: ' +
                              lista_Adjacencia[vertice_escolhido].arr
                    );
                    trash = readline.question(
                         'Pressione qualquer tecla para continuar...'
                    );
                    break;
               case 4:
                    console.log(
                         'Predecessores: ' +
                              lista_Adjacencia[vertice_escolhido].pred
                    );
                    trash = readline.question(
                         'Pressione qualquer tecla para continuar...'
                    );
                    break;
               case 5:
                    console.log(
                         'Grau de Saida: ' +
                              lista_Adjacencia[vertice_escolhido].arr.length
                    );
                    console.log(
                         'Sucessores: ' +
                              lista_Adjacencia[vertice_escolhido].arr
                    );
                    console.log(
                         'Grau de Entrada: ' +
                              lista_Adjacencia[vertice_escolhido].pred.length
                    );
                    console.log(
                         'Predecessores: ' +
                              lista_Adjacencia[vertice_escolhido].pred
                    );
                    trash = readline.question(
                         'Pressione qualquer tecla para continuar...'
                    );
                    break;
               case 6:
                    console.log('Busca Largura: ');
                    console.log(
                         buscaLargura(
                              lista_Adjacencia,
                              vertice_escolhido,
                              vertice
                         )[0]
                    );
                    trash = readline.question(
                         'Pressione qualquer tecla para continuar...'
                    );
                    break;
               case 7:
                    console.log('Busca Profundidade: ');
                    console.log(
                         buscaProfundidade(
                              lista_Adjacencia,
                              vertice_escolhido,
                              vertice,
                              false
                         )[0]
                    );
                    trash = readline.question(
                         'Pressione qualquer tecla para continuar...'
                    );
                    break;
               case 8:
                    let verticeFinal = readline.question(
                         'Escolha um Vertice Destino...'
                    );
                    
                    console.log(
                         'Verificar a existência de caminho entre dois vértices: '
                    );
                    let resultado = caminhoVerticeAVertice(
                         lista_Adjacencia,
                         vertice_escolhido,
                         vertice,
                         verticeFinal
                    );
                    if (resultado[3]) {
                         console.log('Existe Caminho !!! \n Caminho: \n' + resultado[0]);
                    } else {
                         console.log('Não Existe Caminho.');
                    }
                    trash = readline.question(
                         'Pressione qualquer tecla para continuar...'
                    );
                    break;
               case 9:
                    console.log('Testar se o grafo é conexo: ');
                    if(testeConexo(lista_Adjacencia, vertice)){
                      console.log("O Grafo é Conexo!!! ")
                    }else{
                      console.log("O Grafo não é Conexo. ")
                    };
                    trash = readline.question(
                         'Pressione qualquer tecla para continuar...'
                    );
                    break;
               case 10:
                    console.log('Testar se o grafo é cíclico: ');
                    if(testeCiclo(lista_Adjacencia, vertice_escolhido, vertice)){
                      console.log("O Grafo é Cíclico!!!")
                    }else{
                      console.log("O Grafo nao é Cíclico. ")
                    };
                    trash = readline.question(
                         'Pressione qualquer tecla para continuar...'
                    );
                    break;
               case 11:
                    break;
               default:
                    console.log('Opcao invalida');
                    trash = readline.question(
                         'Pressione qualquer tecla para continuar...'
                    );
          }
     } while (escolha != 11);
}

function main() {
     let readline = require('readline-sync'); //Para a leitura dos dados

     let invalido = true;

     while (invalido) {
          console.clear();
          let op_arquivo = readline.question(
               'Seja bem-vindo! \n\nDigite 1 para escolher o arquivo de 100 vertices, 2 para escolher o arquivo de 50000 vertices ou digite o nome de um arquivo especifico (Ex: arq.txt):\n'
          );

          if (op_arquivo == 1) {
               lerArq('graph-test-100.txt');
               invalido = false;
          } else if (op_arquivo == 2) {
               lerArq('graph-test-50000.txt');
               invalido = false;
          } else {
               try {
                    lerArq(op_arquivo);
                    invalido = false;
               } catch (e) {
                    //Não conseguiu ler o arquivo
                    console.log('Erro no arquivo: ' + e);
                    trash = readline.question(
                         'Pressione qualquer tecla para continuar...'
                    );
               }
          }
     }
}






// BUSCA AQUI EM BAIXO

function buscaLargura(grafo, numeroRaiz, numerosVertice) {
     let visitado = zerarVisitados(numerosVertice);

     let filadeBusca = [];
     let verticeBusca;
     let vizinhosVertice = [];
     let listaVerticesLargura = [];

     filadeBusca.push(numeroRaiz);

     while (filadeBusca.length > 0) {
          verticeBusca = filadeBusca.shift();

          visitado[verticeBusca] = 1;
          vizinhosVertice = grafo[verticeBusca].arr;

          // listaVerticesLargura.push(verticeBusca);
          for (let i = 0; i < vizinhosVertice.length; i++) {
               if (visitado[vizinhosVertice[i]] != 1) {
                    visitado[vizinhosVertice[i]] = 1;
                    listaVerticesLargura.push(
                         `${verticeBusca} - ${vizinhosVertice[i]}`
                    );

                    filadeBusca.push(vizinhosVertice[i]);
               }
          }
     }
     let resultado = [listaVerticesLargura, visitado];
     //  console.log(listaVerticesLargura);
     return resultado;
}

function buscaProfundidade(grafo, numeroRaiz, numerosVertice, condicaoCiclo) {
     let visitado = zerarVisitados(numerosVertice);
     let pilhadeBusca = [];
     let verticeBusca;
     let vizinhosVertice = [];
     let condicaoDesempilhar = true;
     let listaVerticesProfundidade = [];
     let count = 0;
     let Ciclo = false;
     pilhadeBusca.push(numeroRaiz);
     while (pilhadeBusca.length > 0) {
          condicaoDesempilhar = true;

          verticeBusca = pilhadeBusca.at(-1);
          visitado[verticeBusca] = 1;

          vizinhosVertice = grafo[verticeBusca].arr;

          // listaVerticesProfundidade.push(verticeBusca);

          // Busca Ciclo - Inicio
          for (let i = 0; i < vizinhosVertice.length; i++) {
               if (count > 1 && condicaoCiclo == true) {
                    if (vizinhosVertice[i] == numeroRaiz) {
                         Ciclo = true;
                         i = vizinhosVertice.length;
                    }
                    // Busca Ciclo - Fim
               }
               if (visitado[vizinhosVertice[i]] != 1) {
                    pilhadeBusca.push(vizinhosVertice[i]);
                    condicaoDesempilhar = false;
                    listaVerticesProfundidade.push(
                         `${verticeBusca} - ${vizinhosVertice[i]}`
                    );
                    i = vizinhosVertice.length;
               }
          }
          if (Ciclo === true) {
               pilhadeBusca.length = 0;
          }
          count++;

          if (condicaoDesempilhar == true) {
               pilhadeBusca.pop();
          }
     }
     let resultado = [listaVerticesProfundidade, visitado, Ciclo];
     //  console.log(listaVerticesProfundidade);
     return resultado;
}

function zerarVisitados(numerosVertice) {
     let visitado = [];
     for (let i = 0; i <= numerosVertice; i++) {
          if (i == 0) {
               visitado[i] = 1;
          } else {
               visitado[i] = 0;
          }
     }
     return visitado;
}

function testeConexo(grafo, numerosVertice) {
     let conexo = true;
     for (let i = 1; i <= numerosVertice; i++) {
          let retorno = buscaLargura(grafo, i, numerosVertice);

          if (retorno[1].includes(0) == true) {
               conexo = false;
               i = numerosVertice + 1;
          }
          // console.log('Conexo:' + conexo);

          return conexo;
     }
}

function caminhoVerticeAVertice(
     grafo,
     numeroRaiz,
     numerosVertice,
     verticeFinal
) {
     let visitado = zerarVisitados(numerosVertice);
     let pilhadeBusca = [];
     let verticeBusca = 0;
     let vizinhosVertice = [];
     let condicaoDesempilhar = true;
     let listaVerticesProfundidade = [];
     let listaVerticesVisitados = [];
     let jump = false;
     let caminhoExiste = false;
     pilhadeBusca.push(numeroRaiz);
    
     while (pilhadeBusca.length > 0) {
          condicaoDesempilhar = true;

          verticeBusca = pilhadeBusca.at(-1);
          visitado[verticeBusca] = 1;

          vizinhosVertice = grafo[verticeBusca].arr;

          // listaVerticesProfundidade.push(verticeBusca);
          for (let i = 0; i < vizinhosVertice.length; i++) {
               if (vizinhosVertice[i] == verticeFinal) {
                    jump = true;
                    condicaoDesempilhar = false;
                    listaVerticesProfundidade.push(
                         `${verticeBusca} - ${vizinhosVertice[i]}`
                    );
                    listaVerticesVisitados.push(vizinhosVertice[i]);
                    i = vizinhosVertice.length;

                    pilhadeBusca.length = 0;
               }
          }

          if (jump === false) {
               for (let i = 0; i < vizinhosVertice.length; i++) {
                    if (visitado[vizinhosVertice[i]] != 1) {
                         pilhadeBusca.push(vizinhosVertice[i]);
                         condicaoDesempilhar = false;
                         listaVerticesProfundidade.push(
                              `${verticeBusca} - ${vizinhosVertice[i]}`
                         );
                         listaVerticesVisitados.push(vizinhosVertice[i]);
                         i = vizinhosVertice.length;
                    }
               }
          }

          if (condicaoDesempilhar == true) {
               pilhadeBusca.pop();
          }
     }
     if (listaVerticesVisitados.includes(Number(verticeFinal)) == true) {
          caminhoExiste = true;
     }
     let resultado = [
          listaVerticesProfundidade,
          listaVerticesVisitados,
          visitado,
          caminhoExiste,
     ];

     //  console.log(listaVerticesProfundidade);
     //  console.log(listaVerticesVisitados);
     return resultado;
}

function testeCiclo(grafo, numeroRaiz, numerosVertice) {
     let retorno = buscaProfundidade(grafo, numeroRaiz, numerosVertice, true);
     return retorno[2];
    //  console.log('Ciclo : ' + retorno[2]);
}
