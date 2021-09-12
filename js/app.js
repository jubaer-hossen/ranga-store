const loadProducts = () => {
    const url = `https://fakestoreapi.com/products`;
    // const url = `http://127.0.0.1:5500/db.json`;
    fetch(url)
        .then(response => response.json())
        .then(data => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = products => {
    const allProducts = products.map(pd => pd);
    for (const product of allProducts) {
        const image = product.image;
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `<div class="single-product card h-100">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>Average rating: ${product.rating.rate}</p>
      <p>Total rating: ${product.rating.count}</p>
      <h2>Price: $ ${product.price}</h2>
      <div class="mt-auto mb-3">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button> 
      <button onclick="showDetails(${product.id})" id="details-btn" class="btn btn-primary">Details</button></div></div>
      `;
        document.getElementById('all-products').appendChild(div);
    }
};

const showDetails = detailsId => {
    const url = `https://fakestoreapi.com/products/${detailsId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showIdDetails(data));
};

const showIdDetails = data => {
    // console.log(data);
    const showDetailsById = document.getElementById('show-details');
    showDetailsById.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${data.image}" class=" card-img-top" alt="..." />
                    <div class="card-body">
                        <h3 class="card-title">${data.title}</h3>
                        <p class="card-text">
                            ${data.description}
                        </p>
                        <p>Category: ${data.category}</p>
                        <h2>Price: $ ${data.price}</h2>
                    </div>
    `;
    showDetailsById.appendChild(div);
};
let count = 0;
const addToCart = (id, price) => {
    count = count + 1;
    updatePrice('price', price);

    updateTaxAndCharge();
    document.getElementById('total-Products').innerText = count;

    updateTotal();
};

const getInputValue = id => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
};

// main price update function
const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue('price');
    if (priceConverted > 200) {
        setInnerText('delivery-charge', 30);
        setInnerText('total-tax', priceConverted * 0.2);
    }
    if (priceConverted > 400) {
        setInnerText('delivery-charge', 50);
        setInnerText('total-tax', priceConverted * 0.3);
    }
    if (priceConverted > 500) {
        setInnerText('delivery-charge', 60);
        setInnerText('total-tax', priceConverted * 0.4);
    }
};

//grandTotal update function
const updateTotal = () => {
    const grandTotal =
        getInputValue('price') +
        getInputValue('delivery-charge') +
        getInputValue('total-tax');
    document.getElementById('total').innerText = grandTotal.toFixed(2);
};
