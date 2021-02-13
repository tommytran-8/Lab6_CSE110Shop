// product-item.js
const cart = document.getElementById('cart-count');
const localStorage = window.localStorage;
if (!localStorage.getItem('data-*')){
  localStorage.setItem('data-*', JSON.stringify({}));
}
class ProductItem extends HTMLElement {
  // TODO
  constructor(){
    super();

    this.attachShadow({mode: 'open'});
    const wrapper = document.createElement('li');
    wrapper.setAttribute('class','product');
    
    const img = wrapper.appendChild(document.createElement('img'));
    img.src = this.hasAttribute('img') ? this.getAttribute('img') : 'default.png';
    img.alt = this.hasAttribute('itemname') ? this.getAttribute('itemname') : "no image";
    
    const title = wrapper.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');
    title.textContent = this.hasAttribute('itemname') ? this.getAttribute('itemname') : "no title";

    const price = wrapper.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');
    price.textContent = this.hasAttribute('price') ? this.getAttribute('price') : "no price";

    const button = wrapper.appendChild(document.createElement('button'));
    button.textContent = "Add to Cart";


    this.img = img;
    this.itemname = title;
    this.price = price;
    this.button = button;


    button.onclick = ()=>{
      if (button.textContent == "Add to Cart"){
        button.textContent = "Remove from Cart";
        cart.textContent = parseInt(cart.textContent) + 1;
        let itemlist  = JSON.parse(localStorage.getItem('data-*'));
        itemlist[this.itemname.textContent] = 1;
        localStorage.setItem('data-*', JSON.stringify(itemlist));
      }
      else{
        button.textContent = "Add to Cart";
        cart.textContent = parseInt(cart.textContent) - 1;
        let itemlist = JSON.parse(localStorage.getItem('data-*'));
        delete itemlist[this.itemname.textContent];
        localStorage.setItem('data-*', JSON.stringify(itemlist));
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


  static get observedAttributes() {
    return [`img`, `title`, `price`, `button`];
  }
  
  attributeChangedCallback(name, oldValue, newValue){
    if (name == "img"){
      this.img.src = newValue;
    }
    else if (name == "title"){
      this.img.alt = newValue;
      this.itemname.textContent = newValue;
    }
    else if (name == "price"){
      this.price.textContent = newValue;
    }
  }
}

customElements.define('product-item', ProductItem);

