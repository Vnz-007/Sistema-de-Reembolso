//  Seleciona os elementos do formulário.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");

// Captura o evento de input para formatar o valor.
amount.oninput = () => {
  // Obtem o valor atual do input e remove os caracteres não números.
  let value = amount.value.replace(/\D/g, "");

  // Transforma o valor em centavos (exemplo: 150/100 = 1.5 que é equivalente a R$ 1,50).
  value = Number(value) / 100;

  // Atualiza o valor do input.
  amount.value = formatCurrencyBRL(value);
};

// Formatação do valor em Real.
function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return value;
}

// Não atualiza o form após clicar no botão.
form.onsubmit = (event) => {
  event.preventDefault();

  // Cria um objeto com os detalhes na nova despesa.
  const newExpense = {
    is: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  // Chama a função que irá add o item na lista.
  expenseAdd(newExpense);
};

// Add um novo item na lista.
function expenseAdd(newExpense) {
  try {
    // Cria o elemento para add o item (li) na lista (ul) de dispesa.
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Cria o icon da categoria.
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.png`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // Cria a infor. da dispesa.
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // Cria o nome da despesa.
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da dispesa.
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // Add name e category na div (expense infor.)
    expenseInfo.append(expenseName, expenseCategory);

    // Cria o valor da despesa.
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    // Cria o icon remove.
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.png");
    removeIcon.setAttribute("alt", "remover");

    // Add as infor. no item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // Add o item na lista.
    expenseList.append(expenseItem);

    // Limpa o formulário para um novo valor.
    formClear();

    // Atualiza os totais
    updateTotals();
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  }
}

// Add os valores totais de despesas.
function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul).
    const items = expenseList.children;

    // Atualiza a quantidade de itens da lista.
    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    // Variável para incrementar o total.
    let total = 0;

    // Percorre cada item (li) da lista (ul).
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      // Converte o valor para float.
      value = parseFloat(value);

      // Verifica se é um número válido.
      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular o total. O valor não parece ser um número."
        );
      }
      //   Incrementar o valor total.
      total += Number(value);
    }

    // Criar a span para add o R$ formato
    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    // Formatar o valor e remover o R$ que será exibido pela small com um estilo customizado.
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    // Limpa o conteúdo do elemento.
    expensesTotal.innerHTML = "";

    //  Add o símbolo do valor formatado.
    expensesTotal.append(symbolBRL, total);
  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar os totais");
  }
}

// Evento que captura o click nos itens (li) da lista (ul).
expenseList.addEventListener("click", function (event) {
  //  Verifica se o elemento clicado é o icon de remove.
  if (event.target.classList.contains("remove-icon")) {
    // Obtém a li do pai do elemento clicado.
    const item = event.target.closest(".expense");
    // Remove um item (li) da lista (ul).
    item.remove();
  }
  // Atualiza o valor total após a remoção do item.
  updateTotals();
});

//
function formClear() {
  expense.value = "";
  category.value = "";
  amount.value = "";
  // Coloca o foco no input de amount.
  expense.focus();
}
