// Script.js
const productlist = document.getElementById('product-list');
const item = document.getElementsByClassName('product');
productlist.removeChild(item[0]);


window.addEventListener('DOMContentLoaded', () => {
  const data = {};
  const localStorage = window.localStorage;
  if (!localStorage.getItem('data')){
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('data', JSON.stringify(data));
      data.forEach(element =>{
        let newitem = document.createElement('product-item');
        newitem.setImage(element.image);
        newitem.setTitle(element.title);
        newitem.setPrice(element.price);
        productlist.appendChild(newitem);
      });

    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  else{
    const data = JSON.parse(localStorage.getItem('data'));
    data.forEach(element =>{
      let newitem = document.createElement('product-item');
      newitem.setImage(element.image);
      newitem.setTitle(element.title);
      newitem.setPrice(element.price);
      productlist.appendChild(newitem);
    });
  }
  const itemlist = localStorage.getItem('data-*').split("~~~");
  localStorage.setItem('data-*', "");
  const products = productlist.children;
  for (let i = 0; i < products.length; i++) {
    if (itemlist.includes(products[i].getTitle())){
      products[i].getButton().click();
    }
  }
  
});
