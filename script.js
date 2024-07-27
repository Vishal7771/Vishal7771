function adjustContainer() {
    const widthInput = document.getElementById('width-input').value;
    const heightInput = document.getElementById('height-input').value;
    const container = document.querySelector('.container');
    
    if (widthInput) {
        container.style.width = `${widthInput}px`;
    }
    
    if (heightInput) {
        container.style.height = `${heightInput}px`;
    }
}

document.getElementById('file-upload').addEventListener('change', handleFileUpload);
 
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        displayProducts(json);
    };
    reader.readAsArrayBuffer(file);
}

function displayProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const salePriceElement = document.createElement('div');
        salePriceElement.classList.add('sale-price');
        salePriceElement.innerText = `₹ ${product.sale_price} Only`;
        productElement.appendChild(salePriceElement);

        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.innerText = product.name;
        productElement.appendChild(nameElement);

        const mrpElement = document.createElement('div');
        mrpElement.classList.add('mrp');
        mrpElement.innerText = `Mrp ${product.mrp} Rs`;
        productElement.appendChild(mrpElement);

        container.appendChild(productElement);
    });
}
