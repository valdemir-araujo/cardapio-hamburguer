menu.addEventListener("click", function (event) {
  let parentButoon = event.target.closest(".add-to-card-btn");
  if (parentButoon) {
    const name = parentButoon.getAttribute("data-name");
    const price = parseFloat(parentButoon.getAttribute("data-price"));
    addToCard(name, price);
  }
});


function addToCard(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

  updateCartModal();
}

function updateCartModal() {
  cardItensConteiner.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemsElements = document.createElement("div");

    cartItemsElements.innerHTML = `
    
        <div>

            <div>
                <p>${item.name}</p>
                <p>${item.quantity}</p>
                <p>R$ ${item.price}</p>
            </div>

            <div>
                <butoon>
                    Remover
                </butoon>
                
            </div>

        </div>
    
    
    
    `;

    cardItensConteiner.appendChild(cartItemsElements);
  });
}