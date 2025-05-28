/** @format */

const menu = document.getElementById("menu");
const modal = document.getElementById("card-modal");
const cardCount = document.getElementById("cart-count");
const closemodal = document.getElementById("close-modal-btn");
const checkaut = document.getElementById("checkaut-btn");
const cardItensConteiner = document.getElementById("card-itens");
const cardTotal = document.getElementById("card-total");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");
const cardBtn = document.getElementById("card-btn");
const open2 = document.getElementById("date-span");
const aberto = document.getElementById("aber-fecha");

let cart = [];

cardBtn.addEventListener("click", function () {
  modal.style.display = "flex";
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

closemodal.addEventListener("click", function () {
  modal.style.display = "none";
});

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
    
        <div class='divs-itens'>

            <div>
                <p class='pname'>${item.name}</p>
                <p class='pquant'>${item.quantity}</p>
                <p class='pprice'>R$ ${item.price.toFixed(2)}</p>
                <hr class='hr'/>
            </div>

            <div>
                <butoon class='remove-btn' data-name='${item.name}'>
                    Remover
                </butoon>
                
            </div>

        </div>
    
    
    
    `;
    total += item.quantity * item.price;

    cardItensConteiner.appendChild(cartItemsElements);
  });

  cardTotal.innerHTML = total.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  cardCount.innerHTML = cart.length;
}

cardItensConteiner.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-btn")) {
    const name = event.target.getAttribute("data-name");

    removeItenCard(name);
  }
});

function removeItenCard(name) {
  const index = cart.findIndex((iten) => iten.name === name);

  if (index !== -1) {
    const iten = cart[index];
    if (iten.quantity > 1) {
      iten.quantity -= 1;
      updateCartModal();
      return;
    }
    if (iten.quantity === 1) {
      cart.splice(index, 1);
      updateCartModal();
    }
  }
}

addressInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    addressWarn.style.display = "none";
    addressInput.style.border = "1px solid rgb(201, 199, 199)";
  }
});

checkaut.addEventListener("click", function () {
  const isopen = checkrestaurantopen();
  if (!isopen) {
    //alert("Restaurante fechado no momento!");
    Toastify({
      text: "Restaurante fechado no momento!",
      duration: 3000,
      destination: "https://github.com/valdemir-araujo",
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right,rgb(131, 2, 2))",
      },
    }).showToast();
    return;
  }

  if (cart.length === 0) {
    alert("Adicione um iten primeiro!");
  } else if (addressInput.value === "") {
    addressInput.style.border = "1px solid rgb(201, 0, 0)";
    addressWarn.style.display = "flex";
    addressInput.focus();
  } else {
    const cartItens = cart
      .map((iten) => {
        return `${iten.name} \n Quantidade: ${iten.quantity} \n Preço: ${iten.price} |`;
      })
      .join("");

    const message = encodeURIComponent(cartItens);
    const phone = "993347632";
    window.open(
      `https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`,
      "_blank"
    );

    cart = [];
    updateCartModal();
    modal.style.display = "none";
  }
});

function checkrestaurantopen() {
  //const hora = 12;
  const data = new Date();
  const hora = data.getHours();
  return hora >= 12 && hora < 22;
}

const isopen = checkrestaurantopen();

if (isopen) {
  open2.style.background = "rgb(2, 136, 2)";
  aberto.innerHTML = "/ Aberto";
} else {
  open2.style.background = "rgb(201, 0, 0)";
  aberto.innerHTML = "/ Fechado";
}
