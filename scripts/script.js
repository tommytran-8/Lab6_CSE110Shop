// Script.js
const productlist = document.getElementById('product-list');
const item = document.getElementsByClassName('product');
productlist.removeChild(item[0]);


window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('data')){
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('data', JSON.stringify(data));
      renderComponent(data);
    })
  }
  else{
    const data = JSON.parse(localStorage.getItem('data'));
    renderComponent(data);
  }
  const itemlist = JSON.parse(localStorage.getItem('data-*'));
  localStorage.setItem('data-*', JSON.stringify({}));
  const products = productlist.children;
  for (let i = 0; i < products.length; i++) {
    if (itemlist[products[i].itemname.textContent]){
      products[i].button.click();
    }
  }
});


function renderComponent(data){
  data.forEach(element =>{
    let newitem = document.createElement('product-item');
    newitem.setAttribute('img', element.image);
    newitem.setAttribute('title', element.title);
    newitem.setAttribute('price', element.price);
    productlist.appendChild(newitem);
  });
}
