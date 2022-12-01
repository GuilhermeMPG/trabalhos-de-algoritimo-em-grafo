let tempoAntes= Date.now();

inicio();
function inicio() {
     let readline = require('readline-sync'); //Para a leitura dos dados

     let escolha;
     do {
          console.clear();
          console.log('\nEscolha uma opcao abaixo:');
          console.log('1 - Dolar');
          console.log('2 - Rupias Indianas');
          console.log('3 - Iene');
          console.log('4 - Real');
          console.log('5 - Sair');

          escolha = readline.question('-----------------------\n');

          switch (
               +escolha //+ faz o cast para int
          ) {
               case 1:
                    arbitragemCurrency(0);
                    break;

               case 2:
                    arbitragemCurrency(1);
                    break;
               case 3:
                    arbitragemCurrency(2);
                    break;
               case 4:
                    arbitragemCurrency(3);
                    break;
               case 5:
                    break;
               default:
                    console.log('Valor nao encontrado !!!');
          }
     } while ((escolha = !5));
}

function arbitragemCurrency(moeda) {
     let grafo = [
          { arr: [1, 2, 3], peso: [49, 93.46, 5, 40], moeda: 'Dolar' },
          {
               arr: [0, 2, 3],
               peso: [0.0204, 2, 0.066],
               moeda: 'Rupias Indianas',
          },
          { arr: [0, 1, 3], peso: [0.0107, 0.5, 0.039], moeda: 'Iene' },
          { arr: [0, 1, 2], peso: [0.19, 15.12, 25.86], moeda: 'Real' },
     ];
     buscaProfundidade(grafo, moeda, grafo.length - 1);
}
function buscaProfundidade(grafo, numeroRaiz, numerosVertice) {
     for (let repeticoes = 0; repeticoes < numerosVertice; repeticoes++) {
          let visitado = zerarVisitados(numerosVertice);
          let pilhadeBusca = [];
          let verticeBusca;
          let vizinhosVertice = [];
          let condicaoDesempilhar = true;
          let listaVerticesProfundidade = [];
          let count = 0;

          let caminhoMoedas = [];

          pilhadeBusca.push(numeroRaiz);
          while (pilhadeBusca.length > 0) {
               let pesoFinal = 1;
               caminhoMoedas = [];
               condicaoDesempilhar = true;

               verticeBusca = pilhadeBusca.at(-1);

               vizinhosVertice = grafo[verticeBusca].arr;

               // listaVerticesProfundidade.push(verticeBusca);

               // Busca Ciclo - Inicio
               for (let i = 0; i < vizinhosVertice.length; i++) {
                    if (pilhadeBusca.length > 1) {
                         if (vizinhosVertice.includes(numeroRaiz)) {
                              if (visitado[verticeBusca] != 1) {
                                   let pilhaNova = [...pilhadeBusca];
                                   pilhaNova.push(numeroRaiz);

                                   // console.log(pilhaNova);

                                   let qtdMinimadeAresta = pilhaNova.length - 1;
                                   for (let i = 0; i < qtdMinimadeAresta; i++) {
                                        let indexN = grafo[
                                             pilhaNova[i]
                                        ].arr.indexOf(pilhaNova[i + 1]);
                                        // console.log(indexN + ' index');
                                        // console.log(pilhaNova[i] + ' Pilha');
                                        pesoFinal =
                                             pesoFinal *
                                             grafo[pilhaNova[i]].peso[indexN];
                                        // console.log(
                                        //      grafo[pilhaNova[i]].peso[indexN] +
                                        //           '<---------'
                                        // );
                                        // console.log(pesoFinal);

                                        pesoFinal;
                                   }
                                   for (let i = 0; i < pilhaNova.length; i++) {
                                        let moeda = grafo[pilhaNova[i]].moeda;
                                        moeda = `${moeda} -->`;
                                        caminhoMoedas.push(moeda);
                                   }
                                   caminhoMoedas = `${caminhoMoedas}`;
                                   
                                        console.log(
                                             caminhoMoedas.replace(/,/g, ' ')
                                        );
                                        console.log(
                                             'Valor Final: ' + pesoFinal + '\n'
                                        );
                                   
                              }
                              // Busca Ciclo - Fim
                         }
                    }
                    visitado[verticeBusca] = 1;
                    if (visitado[vizinhosVertice[i]] != 1) {
                         if (count == 0) {
                              pilhadeBusca.push(
                                   vizinhosVertice[i + repeticoes]
                              );
                              condicaoDesempilhar = false;
                              listaVerticesProfundidade.push(
                                   `${verticeBusca} - ${
                                        vizinhosVertice[i + repeticoes]
                                   }`
                              );
                              i = vizinhosVertice.length;
                         } else {
                              pilhadeBusca.push(vizinhosVertice[i]);
                              condicaoDesempilhar = false;
                              listaVerticesProfundidade.push(
                                   `${verticeBusca} - ${vizinhosVertice[i]}`
                              );
                              i = vizinhosVertice.length;
                         }
                    }
               }

               count++;

               if (condicaoDesempilhar == true) {
                    pilhadeBusca.pop();
               }
          }
     }

    let tempo= Date.now() -  tempoAntes;
    console.log("Tempo Execução:" + tempo + "ms");   
}

function zerarVisitados(numerosVertice) {
     let visitado = [];
     for (let i = 0; i <= numerosVertice; i++) {
          visitado[i] = 0;
     }

     return visitado;
}
