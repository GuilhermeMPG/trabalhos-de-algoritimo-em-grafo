// let grafo = [
//      { arr: [1, 2, 3, 4], pred: [] },
//      { arr: [0, 2, 3, 4], pred: [] },
//      { arr: [0, 1, 3, 4], pred: [] },
//      { arr: [0, 1, 2, 4], pred: [] },
//      { arr: [0, 1, 2, 3], pred: [] },
// ];
// let grafo2 = [
//      { arr: [1], pred: [] },
//      { arr: [2], pred: [] },
//      { arr: [3], pred: [] },
//      { arr: [4], pred: [] },
//      { arr: [0], pred: [] },
// ];
// let numerosVertice = 5;
// let aaaarrey = [1, 2, 3, 4, { arr: [1, 2], pred: [] }];
// let numeroRaiz = 2;
// let verticeFinal = 0;

// buscaProfundidade(grafo,numeroRaiz,numerosVertice);
// buscaLargura(grafo, numeroRaiz, numerosVertice);
// testeConexo (grafo,numerosVertice);
// testeCiclo(grafo,numeroRaiz,numerosVertice);
// caminhoVerticeAVertice(grafo2,numeroRaiz,numerosVertice,verticeFinal);
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





