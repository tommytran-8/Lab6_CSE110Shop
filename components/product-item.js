// product-item.js
const sample = document.getElementsByClassName('product')[0];
const cart = document.getElementById('cart-count');
const localStorage = window.localStorage;
if (!localStorage.getItem('data-*')){
  localStorage.setItem('data-*', "");
}
class ProductItem extends HTMLElement {
  // TODO
  constructor(){
    super();


    this.attachShadow({mode: 'open'});
    const wrapper = document.createElement('li');
    wrapper.setAttribute('class','product');
    
    const img = wrapper.appendChild(document.createElement('img'));
    img.src = sample.children[0].src;
    
    const title = wrapper.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');
    title.textContent = sample.children[1].textContent;

    const price = wrapper.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');
    price.textContent = sample.children[2].textContent;

    const button = wrapper.appendChild(document.createElement('button'));
    button.textContent = sample.children[3].textContent;
    button.onclick = ()=>{
      if (button.textContent == "Add to Cart"){
        button.textContent = "Remove from Cart";
        cart.textContent = parseInt(cart.textContent) + 1;
        localStorage.setItem('data-*', 
          localStorage.getItem('data-*') + "~~~" + this.getTitle()
        );
      }
      else{
        button.textContent = "Add to Cart";
        cart.textContent = parseInt(cart.textContent) - 1;
        const itemlist = localStorage.getItem('data-*').split("~~~");
        for (let i = 0; i < itemlist.length; i++){
          if (itemlist[i] == this.getTitle()){
            itemlist.splice(i, 1);
            break;
          }
        }
        localStorage.setItem('data-*', itemlist.join("~~~"));
      }
    }

    const style = document.createElement('style');
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `;
    this.shadowRoot.append(style, wrapper);
  
  }
  setImage(src){
    this.shadowRoot.children[1].children[0].src = src;
  }
  
  setTitle(title){
    this.shadowRoot.children[1].children[1].textContent = title;
  }
  setPrice(price){
    this.shadowRoot.children[1].children[2].textContent = '$' + price;
  }
  


  getTitle(){
    return this.shadowRoot.children[1].children[1].textContent;
  }
  getButton(){
    return this.shadowRoot.children[1].children[3];
  }
}

customElements.define('product-item', ProductItem);
