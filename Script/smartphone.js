import { utilidades } from "./Produtos.js";
/*Renderiza os produtos*/


import { salvarLocalStorage } from "./Produtos.js";


Notfy()
export function habilitarRecursos(){
var lugarTitulo = document.getElementById("lugtitusmar");
lugarTitulo.innerHTML = `<a href='smartphones.html' style='text-align:center;'><h1 id='titsec'>Smartphones</h1><br><br><br></a>`;

var lugSmartphones = document.getElementById("Smartphones1");
function renderizarProduto() {
  for (const dados of utilidades) {
    if (dados.cate == "smartphones") {
      lugSmartphones.innerHTML += `
<div class="produto">
<img src="${dados.imagem}" alt="" style='height:20vh;width:7vw'>
<div class="nome">${dados.nome}</div>
<div class="marca" >${dados.marca}</div>
<div class="preco" style='color:green;'>R$ ${dados.preco}</div>
<button class='butAdd' style='display:flex; cursor:pointer; align-items:center;' id='pro${dados.id}')'>adicionar  <img src='./Assets/botoes/add_product_car.svg' style='height:20px;'></button>
</div>`;
    }
  }
}

renderizarProduto();

/*Renderiza os produtos*/

/*Faz o menu de itens aparecer */

function mostraMenu() {
  var menu = document.getElementById("menuLinks");
  menu.classList.toggle("menuLinksAparecendo");
}
var btnMostramenu = document.getElementById("hamburger");
btnMostramenu.addEventListener("click", () => mostraMenu());

var btnFecharMenu = document.getElementById("btnFecharMenu");
btnFecharMenu.addEventListener("click", () => mostraMenu());

/*Faz o menu profile aparecer*/
function apareceProfile() {
  var menu = document.getElementById("menuDesaparecido");
  menu.classList.toggle("menuProfileAparecendo");
}
var btnApareceProfile = document.getElementById("btnApareceProfile");
btnApareceProfile.addEventListener("click", () => apareceProfile());

var btnFecharMenuProfile = document.getElementById("btnFecharMenuProfile");
btnFecharMenuProfile.addEventListener("click", () => apareceProfile());

/*Faz o Carrinho aparecer*/

function abrirCarrinho() {
  var carrinho = document.getElementById("menuCarrinho");
  carrinho.classList.toggle("menuCarrinhoAparecendo");
}
var btnCarrinho = document.getElementById("btnAbrirCarrinho");
btnCarrinho.addEventListener("click", () => abrirCarrinho());

var btnFecharCarrinho = document.getElementById("btnFecharCarrinho");
btnFecharCarrinho.addEventListener("click", () => abrirCarrinho());


function filtrarMar() {
  var product_before_filter = document.getElementById('Smartphones1')

  var secao = document.getElementById('secao')
  var input = document.getElementById("1")
  if(input.checked){
    product_before_filter.innerHTML=''
  function renderizarProdutoFiltro() {
    for (const dados of utilidades) {
      if (dados.cate == "smartphones" && dados.marca == 'Samsung') {
        product_before_filter.innerHTML += `
  <div class="produto">
  <img src="${dados.imagem}" alt="" id='imgProduto' style='height:20vh;width:9vw'>
  <div class="nome">${dados.nome}</div>
  <div class="marca">${dados.marca}</div>
  <div class="preco"><p style='color:green;'>${dados.preco}</p></div>
  <button class='butAdd' id='pro${dados.id}'>adicionar <img src='./Assets/botoes/add_product_car.svg'></button>
  </div>`;
      }
    }
  }

  renderizarProdutoFiltro()
}

}
var btn = document.getElementById("filtrar-marca")
 btn.addEventListener('click',() => filtrarMar())

}
habilitarRecursos()

            // adiciona os produtos ao Carrinho

var conteinerCarrinho = document.createElement('article')
conteinerCarrinho.setAttribute('id','conteinerCarrinho' )
conteinerCarrinho.setAttribute('class','containerCarrinho')
const lugarCarrinho = document.getElementById('lugarProdutoCarrinho')
lugarCarrinho.appendChild(conteinerCarrinho)


import { idsProdutosCarrinho } from "./Produtos.js";

function redesenharProdutos(idpro){   
      
  const product = utilidades.find((p) => p.id == idpro) /*Acha o produto no catalogo*/
  const lugar = document.getElementById('conteinerCarrinho')
  const tagProdutoNoaCarrinho = document.createElement('div')
  tagProdutoNoaCarrinho.setAttribute('class',`produtoNoaCarrinho`)
  tagProdutoNoaCarrinho.setAttribute('id',`produtoNoaCarrinho${product.id}`)
  lugar.appendChild(tagProdutoNoaCarrinho) /*adiciona a div Pai do Produto*/

  const model = `

  <div class='caracteristicas'>
  <img src="${product.imagem}" alt="" class="imgProdutoCarrinho">

  <div class="dadosProdutoCarrinho" id="lugarDados${product.id}">
      <p class="nome" id="nomeNoCarrinho${product.id}" style='color:white;'>${product.nome}</p>
      <p class="marca" id="marcaNoCarrinho${product.id}" style='color:grey;'>${product.marca}</p>
      <p class="preco" id="precoNoCarrinho${product.id}"> R$ ${product.preco}</p>
  </div>
  </div>

  <div class="botoesDoProdutoCarrinho" id="botoesDoProdutoCarrinho${product.id}">
  <button class="fecharProdutocarrinho" id="fecharProdutocarrinho${product.id}"><img src='./Assets/botoes/delete-left-solid.svg' style='height:100%;'></button>
    <div class='infoProduto'>
      <button class="btnsQuant" id="btnAcrescentarProduto${product.id}"><img src='./Assets/botoes/add.svg'></button>
        <p class='numquantidadeprodutos' id="quantidadeProdutosCarrinhos${product.id}"  style='color:orange;'></p>
        <button class="btnsQuant" id="btnSubtrairProduto${product.id}"><img src='./Assets/botoes/remove.svg'></button>
          </div>
      </div>
  `   /*modelo de card para colocar no carrinho */
  const lugarTag = document.getElementById(`produtoNoaCarrinho${product.id}`)
  lugarTag.innerHTML+=model
  atualizarQuantidade(idpro)  /* recupera o elemento e coloca o modelo nele*/
  atualizarPrecoCarrinho()

  Notfy()

  document.getElementById(`btnAcrescentarProduto${idpro}`).addEventListener('click',()=> acrescentarProduto(idpro))
  document.getElementById(`btnSubtrairProduto${idpro}`).addEventListener('click',()=> subtrairProduto(idpro))
   document.getElementById(`fecharProdutocarrinho${idpro}`).addEventListener('click',()=> removerProdutoCarrinho(idpro))
                /*Adiciona funcionalidade aos botoes */

}

function removerProdutoCarrinho(idpro){
    delete idsProdutosCarrinho[idpro]
    salvarLocalStorage('carrinho', idsProdutosCarrinho)
    mostrarProdutosAtualizados()
    atualizarPrecoCarrinho()

    Notfy()
} 


function atualizarPrecoCarrinho(){
  const lugPreco = document.getElementById("txtPreco")
  let totalPreco = 0
  for(const idProduto in idsProdutosCarrinho){
      totalPreco = totalPreco+(utilidades.find(pr => pr.id == idProduto).preco * idsProdutosCarrinho[idProduto])
  }
  lugPreco.innerText=`Total: R$ ${totalPreco.toFixed(2).replace('.',',')}`
  
}



function acrescentarProduto(idpro){
  idsProdutosCarrinho[idpro]++
  
  salvarLocalStorage('carrinho', idsProdutosCarrinho)
  atualizarQuantidade(idpro)
  atualizarPrecoCarrinho()
  
Notfy()

}

function subtrairProduto(idpro){

  if(idsProdutosCarrinho[idpro] === 1){
    removerProdutoCarrinho(idpro)
    return
  }
  
  idsProdutosCarrinho[idpro]--
  
  salvarLocalStorage('carrinho', idsProdutosCarrinho)
  atualizarQuantidade(idpro)
  atualizarPrecoCarrinho()

  Notfy()
}

function atualizarQuantidade(idpro){
  document.getElementById(`quantidadeProdutosCarrinhos${idpro}`).innerText=idsProdutosCarrinho[idpro]
}

function mostrarProdutosAtualizados(){
  const lugar = document.getElementById('conteinerCarrinho')
  lugar.innerHTML=''

  for(const idProduto in idsProdutosCarrinho){
    redesenharProdutos(idProduto)
  }
} 
mostrarProdutosAtualizados()

function renderizarProdutoCarrinho(idpro){
  if(idpro in idsProdutosCarrinho){
    acrescentarProduto(idpro)
    return
  }
  idsProdutosCarrinho[idpro]=1;
  redesenharProdutos(idpro)
  
}




for(const idProduto of utilidades){
  var btnAdicionar = document.getElementById(`pro${idProduto.id}`)
  btnAdicionar.addEventListener('click',() => renderizarProdutoCarrinho(idProduto.id));

}

function Notfy(){
  var quantTotal = 0 
  for(const idpro in idsProdutosCarrinho){
    quantTotal+=idsProdutosCarrinho[idpro]
  } 
  var spanQuant = document.getElementById('spanQuant')
  spanQuant.innerText=quantTotal
}

