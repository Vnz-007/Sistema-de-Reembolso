//  Seleciona os elementos do formulário.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul");

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

    // Add as infor. no item.
    expenseItem.append(expenseIcon, expenseInfo);

    // Add o item na lista.
    expenseList.append(expenseItem);
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  }
}
