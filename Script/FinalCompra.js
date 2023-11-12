// import { salvarLocalStorage } from "./Produtos.js";
import { salvarLocalStorage, utilidades } from "./Produtos.js";
import { idsProdutosCarrinho } from "./Produtos.js";

function habilitarRecursos() {

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
  
}
habilitarRecursos();

function manipularProdutos(){
  

  function renderizarProdutoFinal() {

    var lugarFinal = document.getElementById("carNoFinal");

    for (const idPro in idsProdutosCarrinho) {
      const product = utilidades.find((p) => p.id == idPro);
      var containerFinal = document.createElement("div");
      containerFinal.setAttribute("id", `container${idPro}`);
      containerFinal.setAttribute("class", "containerPR");
      lugarFinal.appendChild(containerFinal);
      var lugarContainerFinal = document.getElementById(`container${idPro}`);

      var modelo = `
      <img src='${product.imagem}' style='height:100px;'>
      <div>
        <p class='nome dentro' >${product.nome}</p>
        <p class='marca dentro'>${product.marca}</p>
        
        <p class='preco dentro'>R$${product.preco}</p>
      </div>
      <div class='box-quant dentro'>
          <button id='btnDiminuir${product.id}'><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-440v-80h560v80H200Z"/></svg></button>
          <p class='quantidade'>${idsProdutosCarrinho[product.id]}</p>
          <button id='btnAumentar${product.id}'><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
      </div>

        <button id='btnRemover${product.id}'class='lataLixo'> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style='width:24px;'><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg></button>
      `;
      lugarContainerFinal.innerHTML=''
      lugarContainerFinal.innerHTML += modelo;
      
  var btnRemover = document.getElementById(`btnRemover${product.id}`)
  btnRemover.addEventListener('click',()=>removerProduto(product.id))

  var btnAdicionar = document.getElementById(`btnAumentar${product.id}`)
  btnAdicionar.addEventListener('click',()=>adicionarProduto(product.id))
  
  var btnDiminuir = document.getElementById(`btnDiminuir${product.id}`)
  btnDiminuir.addEventListener('click',()=>btnDiminuirProduto(product.id))
    }
  }
  renderizarProdutoFinal();

  function atualizarPreco(){
    const lugPreco = document.getElementById("total")
    let totalPreco = 0
    for(const idProduto in idsProdutosCarrinho){
        totalPreco = totalPreco+(utilidades.find(pr => pr.id == idProduto).preco * idsProdutosCarrinho[idProduto])
    }
    lugPreco.innerText=`Total: R$ ${totalPreco.toFixed(2).replace('.',',')}`
  }
  
  atualizarPreco()

function removerProduto(idPro){
  delete idsProdutosCarrinho[idPro]
  atualizarProdutos()
  atualizarPreco()
  salvarLocalStorage('carrinho', idsProdutosCarrinho)

}

  function adicionarProduto(idPro){
    idsProdutosCarrinho[idPro]++
    atualizarProdutos()
    atualizarPreco()
    salvarLocalStorage('carrinho', idsProdutosCarrinho)

  }



  function btnDiminuirProduto(idPro){
    if(idsProdutosCarrinho[idPro] == 1){
      removerProduto(idPro)
      return
    }
    idsProdutosCarrinho[idPro]--
    atualizarProdutos()
    atualizarPreco()
    salvarLocalStorage('carrinho', idsProdutosCarrinho)

  }

  function atualizarProdutos(){
    document.getElementById('carNoFinal').innerHTML=''
    renderizarProdutoFinal()
  }

  console.log(idsProdutosCarrinho)
}
manipularProdutos()