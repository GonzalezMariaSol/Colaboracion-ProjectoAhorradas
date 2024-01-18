// UTILITIES ******************************************************************************************
const just = (selector) => document.querySelector(selector);
const all = (selector) => document.querySelectorAll(selector);

const randomId = () => self.crypto.randomUUID();

const showElement = (selector) => just(selector).classList.remove("hidden");
const hideElement = (selector) => just(selector).classList.add("hidden");
const clear = (selector) => (just(selector).innerText = "");

// LOCAL STORAGE ******************************************************************************************
const getInfo = (key) => JSON.parse(localStorage.getItem(key));
const setInfo = (key, arrInfo) =>
  localStorage.setItem(key, JSON.stringify(arrInfo));

// MUESTRA - OCULTAR SECTIONS-VISTAS
const showViews = (view) => {
  all(".view").forEach((view) => {
    view.classList.add("hidden");
  });
  just(`.${view}`).classList.remove("hidden");
};


// FUNCIONALIDAD SECTOR DE OPERACIONES - NUEVA OPERACION - EDITAR OPERACION **************************************************
const showOperations = (arrOperations) => {
  just(".tbody-info-loaded").innerHTML = "";

  if (!(arrOperations.length > 0)) {
    just(".view-no-operations").classList.remove("hidden");
    just(".div-table-container").classList.add("hidden");
  }

  const categoryName = (idCategoria) => {
    for (const category of getInfo("categories")) {
      if (idCategoria === category.id) {
        return category.category;
      }
    }
  };

  for (const operation of arrOperations) {
    just(".tbody-info-loaded").innerHTML += `
    <tr>
    <td class="text-center border-r-6 p-3 border-transparent max-w-[150px] whitespace-normal break-words">${
      operation.descripcion
    }</td>
    <td class="text-center border-r-6 p-3 border-transparent"><p class="bg-[#ebfffc] text-emerald-500 text-center rounded-md">${categoryName(
      operation.categoria
    )}</p></td>
    <td class="text-center border-r-6 p-3 border-transparent">${
      operation.fecha
    }</td>
    <td class="text-center border-r-6 p-3 border-transparent break-all" id="num-amount">${
      operation.monto
    }</td>
    <td class="p-3 flex flex-col">
    <button class="bg-[#ebfffc] text-emerald-500 text-center mb-1 border-r-6 border-transparent rounded-md" onclick="ejecutionOfNewOp('${
      operation.id
    }')">Editar</button>
    <button class="bg-[#ebfffc] text-emerald-500 text-center border-r-6 border-transparent rounded-md" onclick="ejecutionDeleteBtn('${
      operation.id
    }', '${operation.descripcion}')">Eliminar</button>
    </td>
    </tr>
    <tr class="m-28 border-[1vh] border-[#ffffff92]"></tr> 
    `;
  }
};

const ejecutionDeleteBtn = (opId, opDescription) => {
  just(".header").classList.add("hidden");
  showViews("section-confirm-delete");
  just(".btn-confirm-delete").setAttribute("id", opId);
  just(".operation-description").innerText = `'' ${opDescription} ''?`;
  just(".btn-confirm-delete").addEventListener("click", () => {
    const userId = just(".btn-confirm-delete").getAttribute("id");
    runBtnConfirmDelete(userId);
    window.location.reload();
  });
};

const runBtnConfirmDelete = (opId) => {
  const currentOperations = getInfo("Operations").filter((op) => op.id != opId);
  setInfo("Operations", currentOperations);
};

const ejecutionOfNewOp = (opId) => {
  showViews("section-editOperation");
  just(".btn-confirm-edit").classList.remove("hidden");
  just("#editOp-tittle").classList.remove("hidden");
  just("#btn-add-newOp").classList.add("hidden");
  just("#newOp-tittle").classList.add("hidden");
  just(".btn-confirm-edit").setAttribute("id", opId);
  const choosenOperation = getInfo("Operations").find(
    (operation) => operation.id === opId
  );

  just("#input-description-text").value = choosenOperation.descripcion;
  just("#input-amount-numb").value = choosenOperation.monto;
  just("#select-type").value = choosenOperation.tipo;
  just("#select-category").value = choosenOperation.categoria;
  just("#op-input-date").value = choosenOperation.fecha;
};

const saveUserOperation = (opId) => {
  return {
    id: opId ? opId : randomId(),
    descripcion: just("#input-description-text").value,
    monto: just("#input-amount-numb").value,
    tipo: just("#select-type").value,
    categoria: just("#select-category").value,
    fecha: just("#op-input-date").value,
  };
};

const totalOperations = getInfo("Operations") || [];

const runBtnAddNewOp = (e) => {
  e.preventDefault();
  const currentInfo = getInfo("Operations");
  currentInfo.push(saveUserOperation());
  setInfo("Operations", currentInfo);
  window.location.reload();
};

const runBtnConfirm = (e) => {
  e.preventDefault();
  const opId = just(".btn-confirm-edit").getAttribute("id");
  const currentOperations = getInfo("Operations").map((op) => {
    if (op.id === opId) {
      return saveUserOperation(opId);
    }
    return op;
  });
  setInfo("Operations", currentOperations);
  window.location.reload();
};

const validateForm = (e) => {
  const description = just("#input-description-text").value.trim();
  const amount = just("#input-amount-numb").value;
  const type = just("#select-type").value;
  const category = just("#select-category").value;
  const date = just("#op-input-date").value;

  if (description === "") {
    just(".warning-message-description").classList.remove("hidden");
    just(".warning-border-description").classList.add("border-red-500");
  } else {
    just(".warning-message-description").classList.add("hidden");
    just(".warning-border-description").classList.remove("border-red-500");
  }

  if (amount === "") {
    just(".warning-message-amount").classList.remove("hidden");
    just(".warning-border-amount").classList.add("border-red-500");
  } else {
    just(".warning-message-amount").classList.add("hidden");
    just(".warning-border-amount").classList.remove("border-red-500");
  }

  if (type === "") {
    just(".warning-message-type").classList.remove("hidden");
    just(".warning-border-type").classList.add("border-red-500");
  } else {
    just(".warning-message-type").classList.add("hidden");
    just(".warning-border-type").classList.remove("border-red-500");
  }

  if (category === "") {
    just(".warning-message-category").classList.remove("hidden");
    just(".warning-border-category").classList.add("border-red-500");
  } else {
    just(".warning-message-category").classList.add("hidden");
    just(".warning-border-category").classList.remove("border-red-500");
  }

  if (date === "") {
    just(".warning-message-date").classList.remove("hidden");
    just(".warning-border-date").classList.add("border-red-500");
  } else {
    just(".warning-message-date").classList.add("hidden");
    just(".warning-border-date").classList.remove("border-red-500");
  }

  if (
    description !== "" &&
    amount !== "" &&
    type !== "" &&
    category !== "" &&
    date !== ""
  ) {
    runBtnAddNewOp(e);
  }
}; //!PORQUE ME FUNCIONA SOLO SI CARGO DE ABAJO PARA ARRIBA PERO SI COMPLETO DE ARRIBA PARA ABAJO, ME LO CARGA IGUAL SIN IMPORTAR LOS FILTROS?

// FUNCIONALIDAD DE BALANCE *****************************************************************************************
const getEarningsBalance = () => {
  let totalEarnings = 0;
  if (getInfo("Operations")) {
    for (const operacion of getInfo("Operations")) {
      if (operacion.tipo === "ganancia") {
        totalEarnings += Number(operacion.monto);
        just(".full-earnings").innerHTML = `${totalEarnings}`;
      }
    }
    return totalEarnings;
  }
};

const getExpensesBalance = () => {
  let totalExpenses = 0;
  if (getInfo("Operations")) {
    for (const operacion of getInfo("Operations")) {
      if (operacion.tipo === "gasto") {
        totalExpenses += Number(operacion.monto);
        just(".full-expenses").innerHTML = `${totalExpenses}`;
      }
    }
    return totalExpenses;
  }
};

const getNetBalance = () => {
  const totalBalance = getEarningsBalance() - getExpensesBalance();
  just(".full-balance-num").innerHTML = `${totalBalance}`;
  if (totalBalance < 0) {
    just(".full-balance").classList.add("text-red-600");
  } else if (totalBalance > 0) {
    just(".full-balance").classList.add("text-lime-500");
  }
};
getNetBalance();


// FUNCIONALIDAD DE FILTROS *****************************************************************************************
// OCULTAR-MOSTRAR FILTROS
just("#btn-hide-show-filters").addEventListener("click", () => hideFilters());
const hideFilters = () => {
  if (!just(".form-filters").classList.contains("hidden")) {
    just(".form-filters").classList.add("hidden");
    just("#btn-hide-show-filters").textContent = "Mostrar filtros";
  } else {
    just(".form-filters").classList.remove("hidden");
    just("#btn-hide-show-filters").textContent = "Ocultar filtros";
  }
};


// FILTRAR POR TIPO GANANCIA - GASTO
const showSelectedType = (e) => {
  const loadedOperation = getInfo("Operations");
  for (const operation of getInfo("Operations")) {
    if (operation.tipo === e.target.value) {
      showOperations(
        loadedOperation.filter((op) => op.tipo === e.target.value)
      );
    } else if (e.target.value === "todos") {
      showOperations(totalOperations);
    }
  }
};


//FILTRAR POR CATEGORIA
const showSelectedCategory = (e) => {
  const categoryFound = getInfo("Operations").some(
    (operation) => operation.categoria === e.target.value
  );
  if (categoryFound) {
    just(".view-no-operations").classList.add("hidden");
    showOperations(
      getInfo("Operations").filter((op) => op.categoria === e.target.value)
    );
  } else if (e.target.value === "todos") {
    showOperations(totalOperations);
  } else {
    just(".view-no-operations").classList.remove("hidden");
  }
};


// FILTRAR POR FECHA //a partir de la fecha seleccionada para atras hay que mostrar
const showSelectedDate = (e) => {
  const choosenDate = new Date(e.target.value);
  const selectedMonth = choosenDate.getMonth() + 1;
  const selectedYear = choosenDate.getFullYear();
  const loadedOperation = getInfo("Operations");
  const filterOperations = loadedOperation.filter(
    (op) =>
      selectedYear >= op.fecha.split("-")[0] &&
      selectedMonth >= op.fecha.split("-")[1]
  );
  showOperations(filterOperations);
};


// FILTRAR POR MAYOR-RECIENTE O ABC
const showSelectedOrder = (e) => {
  const operationsCopy = [...getInfo("Operations")];

  if (e.target.value === "masReciente") {
    operationsCopy.sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);
      return dateB - dateA;
    });
    showOperations(operationsCopy);
  } else if (e.target.value === "menosReciente") {
    operationsCopy.sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);
      return dateA - dateB;
    });
    showOperations(operationsCopy);
  } else if (e.target.value === "menorMonto") {
    operationsCopy.sort((a, b) => a.monto - b.monto);
    showOperations(operationsCopy);
  } else if (e.target.value === "mayorMonto") {
    operationsCopy.sort((a, b) => b.monto - a.monto);
    showOperations(operationsCopy);
  } else if (e.target.value === "AZ") {
    operationsCopy.sort((a, b) => {
      const descripcionA = a.descripcion.toLowerCase();
      const descripcionB = b.descripcion.toLowerCase();
      return descripcionA.localeCompare(descripcionB);
    });
    showOperations(operationsCopy);
  } else if (e.target.value === "ZA") {
    operationsCopy.sort((a, b) => {
      const descripcionA = a.descripcion.toLowerCase();
      const descripcionB = b.descripcion.toLowerCase();
      return descripcionB.localeCompare(descripcionA);
    });
    showOperations(operationsCopy);
  }
};


// UTIBILIDAD BOTON RESET
const resetearFormulario = () => {
  just(".form-select-type").value = "todos";
  just(".form-select-category").value = "todos";

  const fechaFormateada = new Date().toISOString().split("T")[0];
  just("#form-input-date").value = fechaFormateada;
  just("#form-select-order").value = "masReciente";
};


// ------------------------------MENU NAVBAR -------------------------------------------------------------
const menuView = () => {
  just(".menu").classList.toggle("hidden");
  just(".icon-menu").classList.toggle("hidden");
  just(".close").classList.toggle("hidden");
};


//................................ SECCION CATEGORIA .......................................................
const category = [
  {
    id: randomId(),
    category: "Comidas",
  },

  {
    id: randomId(),
    category: "Sevicios",
  },
  {
    id: randomId(),
    category: "Salidas",
  },
  {
    id: randomId(),
    category: "Educacion",
  },
  {
    id: randomId(),
    category: "Transporte",
  },
  {
    id: randomId(),
    category: "Trabajo",
  },
];

const allCategories = getInfo("categories") || category;


//------------------------------------ RENDER  CATEGORY------------------------------------------------
const renderCategory = (arrayCategorys) => {
  clear("#container-category");
  for (const categorie of arrayCategorys) {
    just(
      "#container-category"
    ).innerHTML += `<li class=" flex  justify-between mb-[1rem]">
    <p
        class=" w-[4rem] bg-[#ebfffc] pt-[3px] rounded-[0.3rem] text-[0.8rem]  text-center text-emerald-500">
        ${categorie.category}</p>
    <div class="flex">
        <button class="edit  w-[4rem] pt-[4px] text-[0.8rem] text-cente text-[#3273df]"onclick="editCategory('${categorie.id}')" >Editar</button>
        <button  class="btn-remove w-[4rem] pt-[4px]  text-[0.8rem] text-cente text-[#3273df]" onclick="viewChangeRemove('${categorie.id}'  , '${categorie.category}')">Eliminar</button>
    </div> `;

    just(
      "#form-select-category"
    ).innerHTML += `<option value="${categorie.id}">${categorie.category}</option>`;
    just(
      "#select-category"
    ).innerHTML += `<option value="${categorie.id}">${categorie.category}</option>`;
  }
};


// --------------------------------------AGREGAR  Y EDITAR  Y BORRAR  CATEGORIA  ---------------------------------------
const saveAddcategory = (idCategori) => {
  return {
    id: idCategori ? idCategori : randomId(),
    category: just("#input-add").value,
  };
};

const saveEditCategory = () => {
  return {
    id: randomId(),
    category: just("#input-edit").value,
  };
};
const editCategory = (categoryId) => {
  showElement(".section-edit-category");
  hideElement(".section-category");
  just("#btn-edit-categorie").setAttribute("id-categori", categoryId);
  const currentData = getInfo("categories").find(
    (categories) => categories.id === categoryId
  );
  just("#input-edit").value = currentData.category;
};

const addCategory = () => {
  const currentData = getInfo("categories");
  currentData.push(saveAddcategory());
  setInfo("categories", currentData);
  renderCategory(currentData);
};

const editBtnCategory = () => {
  const dataId = just("#btn-edit-categorie").getAttribute("id-categori"); //
  const currentData = getInfo("categories").map((categorie) => {
    if (categorie.id === dataId) {
      return saveEditCategory(dataId);
    }
    return categorie;
  });
  setInfo("categories", currentData);
  renderCategory(currentData);
};

const viewChangeRemove = (categoryId, categori) => {
  showElement(".container-eliminar");
  hideElement(".section-category");
  just("#name").innerText = `${categori}`;
  just("#btn-remove-categories").setAttribute("id-categori", categoryId);
  just("#btn-remove-categories").addEventListener("click", () => {
    const IdCategoria = just("#btn-remove-categories").getAttribute(
      "id-categori"
    );
    deleteCategory(IdCategoria);
    deleteOperationWCategoryDeleted(IdCategoria);
  });
};

const deleteCategory = (categoryId) => {
  const currentData = getInfo("categories").filter(
    (category) => categoryId !== category.id
  );
  setInfo("categories", currentData);
  renderCategory(currentData);
};

const deleteOperationWCategoryDeleted = (categoriaId) => {
  const currentOperations = getInfo("Operations").filter(
    (operacion) => operacion.categoria !== categoriaId
  );
  setInfo("Operations", currentOperations);
};


// -------------------------------------------VALIDACION DE INPUT CATEGORIA---------------------------------------------------
const validateInput = () => {
  const input = just("#input-add").value;
  if (/^\s*$/.test(input)) {
    just(".validation").classList.remove("hidden");
    just(".validation").classList.add("red");
    just(".box-input").classList.add("invalid-input");
    return false;
  } else {
    just(".validation").classList.remove("red");
    just(".validation").classList.add("hidden");
    just(".box-input").classList.remove("invalid-input");
    return true;
  }
};


// ------------------------------REPORTES FILTRADOS ---------------------------------------------------------------
const renderReporte = (arrayOperation) => {
  clear("#reportes");

  if (arrayOperation.length >= 3) {
    const categoryWithHighestEarnings = getCategoryWithHighestEarnings();
    const categoryWithHighestExpenses = getCategoryWithHighestExpenses();
    const monthWithHighestBalance = getDateWithHighestEarnings();
    const monthWithHighestgasto = getDateWithHighestExpenses();
    const categoryWithHighestBalance = getCategoryWithHighestBalance();
    hideElement("#section-reports");
    showElement("#section-edit-reports");

    just("#reportes").innerHTML = `<tbody>
        <tr class="mb-[1rem] h-[20%] w-[50%]">
          <th class="w-[60%] mb-[1rem] ml-[1rem] text-[#4A4A4A] text-left">Categoría con mayor ganancia</th>
           <td ><span class="bg-violet-500 p-[0.3rem] rounded-[0.3rem] text-[0.7rem]">${categoryWithHighestEarnings.categoria}
           </span>
            </td>
          <td class="green text-[0.9rem]"> +$ ${categoryWithHighestEarnings.value}</td>
        </tr>
        <tr>
          <th class=" text-[#4A4A4A] text-left">Categoría con mayor gasto</th>
          <td><span class="bg-violet-500 p-[0.3rem] rounded-[0.3rem] text-[0.7rem]">${categoryWithHighestExpenses.categorias}
          </span>
          </td>
          <td class="red"> -$ ${categoryWithHighestExpenses.value}</td>
        </tr>
        <tr>
          <th class="text-[#4A4A4A] text-left">Categoría con mayor balance</th>
          <td><span class="bg-violet-500 p-[0.3rem] rounded-[0.3rem] text-[0.7rem]">${categoryWithHighestBalance.category}
          </span></td>
          <td class="green">$ ${categoryWithHighestBalance.value}</td>
        </tr>
        <tr>
          <th class="text-[#4A4A4A] text-left">Mes con mayor ganancia</th>
          <td>${monthWithHighestBalance.mes}</td>
          <td class="green">+ $${monthWithHighestBalance.value}</td>
        </tr>
        <tr>
          <th class="text-[#4A4A4A] text-left">Mes con mayor gasto</th>
          <td> ${monthWithHighestgasto.mes}</td>
          <td class="red">-$${monthWithHighestgasto.value}</td>
        </tr>
      </tbody>`;
  } else {
    showElement("#section-reports");
  }
};

const getCategoryWithHighestEarnings = () => {
  const operations = getInfo("Operations");
  const categories = getInfo("categories");
  const earningsByCategory = {};

  operations.forEach((operation) => {
    if (operation.tipo === "ganancia") {
      const categoryName = categories.find(
        (category) => category.id === operation.categoria
      )?.category;
      if (categoryName) {
        if (!earningsByCategory[categoryName]) {
          earningsByCategory[categoryName] = 0;
        }
        earningsByCategory[categoryName] += Number(operation.monto);
      }
    }
  });
  let maxEarningsCategory = null;
  let maxEarnings = 0;
  for (const [category, earnings] of Object.entries(earningsByCategory)) {
    if (earnings > maxEarnings) {
      maxEarnings = earnings;
      maxEarningsCategory = category;
    }
  }
  return { categoria: maxEarningsCategory, value: maxEarnings };
};

const getCategoryWithHighestExpenses = () => {
  const operations = getInfo("Operations");
  const categories = getInfo("categories");
  const expensesByCategory = {};

  operations.forEach((operation) => {
    if (operation.tipo === "gasto") {
      const categoryName = categories.find(
        (category) => category.id === operation.categoria
      )?.category;
      if (categoryName) {
        if (!expensesByCategory[categoryName]) {
          expensesByCategory[categoryName] = 0;
        }
        expensesByCategory[categoryName] += Number(operation.monto);
      }
    }
  });

  let maxExpensesCategory = null;
  let maxExpenses = 0;

  for (const [category, expenses] of Object.entries(expensesByCategory)) {
    if (expenses > maxExpenses) {
      maxExpenses = expenses;
      maxExpensesCategory = category;
    }
  }
  return { categorias: maxExpensesCategory, value: maxExpenses };
};


const getDateWithHighestEarnings = () => {
  const operations = getInfo("Operations");
  const earningsByDate = {};
  operations.forEach((operation) => {
    if (operation.tipo === "ganancia") {
      const operationDate = new Date(operation.fecha);
      const formattedDate = operationDate.toLocaleDateString("es-ES");

      if (!earningsByDate[formattedDate]) {
        earningsByDate[formattedDate] = 0;
      }
      earningsByDate[formattedDate] += Number(operation.monto);
    }
  });

  let maxEarningsDate = null;
  let maxEarnings = 0;

  for (const [date, earnings] of Object.entries(earningsByDate)) {
    if (earnings > maxEarnings) {
      maxEarnings = earnings;
      maxEarningsDate = date;
    }
  }
  return { mes: maxEarningsDate, value: maxEarnings };
};

const getDateWithHighestExpenses = () => {
  const operations = getInfo("Operations");

  const expensesByDate = {};
  operations.forEach((operation) => {
    if (operation.tipo === "gasto") {
      const operationDate = new Date(operation.fecha);
      const formattedDate = operationDate.toLocaleDateString("es-ES");

      if (!expensesByDate[formattedDate]) {
        expensesByDate[formattedDate] = 0;
      }
      expensesByDate[formattedDate] += Number(operation.monto);
    }
  });

  let maxExpensesDate = null;
  let maxExpenses = 0;

  for (const [date, expenses] of Object.entries(expensesByDate)) {
    if (expenses > maxExpenses) {
      maxExpenses = expenses;
      maxExpensesDate = date;
    }
  }
  return { mes: maxExpensesDate, value: maxExpenses };
};

const getCategoryWithHighestBalance = () => {
  const operations = getInfo("Operations");
  const categories = getInfo("categories");
  const balanceByCategory = {};

  operations.forEach((operation) => {
    const categoryName = categories.find(
      (category) => category.id === operation.categoria
    )?.category;

    if (categoryName) {
      if (!balanceByCategory[categoryName]) {
        balanceByCategory[categoryName] = 0;
      }
      if (operation.tipo === "ganancia") {
        balanceByCategory[categoryName] += Number(operation.monto);
      } else if (operation.tipo === "gasto") {
        balanceByCategory[categoryName] -= Number(operation.monto);
      }
    }
  });

  let maxBalanceCategory = null;
  let maxBalance = 0;
  for (const [category, balance] of Object.entries(balanceByCategory)) {
    if (balance > maxBalance) {
      maxBalance = balance;
      maxBalanceCategory = category;
    }
  }
  return { category: maxBalanceCategory, value: maxBalance };
};


//-------------------------------------------------TOTAL CATEGORIA POR MES------------------------------------------------------
const getTotalByCategory = () => {
  const operations = getInfo("Operations") || [];
  const categories = getInfo("categories") || [];

  const totalsByCategory = {};
  categories.forEach((category) => {
    totalsByCategory[category.category] = {
      gananciaTotal: 0,
      balanceTotal: 0,
      gastoTotal: 0,
    };
  });
  operations.forEach((operation) => {
    const categoryName = categories.find(
      (category) => category.id === operation.categoria
    )?.category;
    if (categoryName) {
      if (operation.tipo === "ganancia") {
        totalsByCategory[categoryName].gananciaTotal += Number(operation.monto);
      } else if (operation.tipo === "gasto") {
        totalsByCategory[categoryName].gastoTotal += Number(operation.monto);
      }
      totalsByCategory[categoryName].balanceTotal =
        totalsByCategory[categoryName].gananciaTotal -
        totalsByCategory[categoryName].gastoTotal;
    }
  });
  return totalsByCategory;
};




const renderTotalCategory = (arrayCategorys) => {
  const totalCategoryElement = just("#totalCategory");

  totalCategoryElement.innerHTML = "";

  totalCategoryElement.innerHTML += `<tr>
    <th class="w-[30%] text-[#4A4A4A] text-left">Categoria</th>
    <th class="w-[30%] text-[#4A4A4A] text-left">Ganancias</th>
    <th class="w-[30%] text-[#4A4A4A] text-left">Gastos</th>
    <th class="w-[30%] text-[#4A4A4A] text-left">Balance</th>
  </tr>`;

   
  for (const categorie of arrayCategorys) {
    const totals = getTotalByCategory()[categorie.category];

    if (totals && (totals.balanceTotal > 0 || totals.balanceTotal < 0)) {

      totalCategoryElement.innerHTML += `<tr>
        <td class="text-left">${categorie.category}</td>
        <td class="green">+ ${totals.gananciaTotal}</td>
        <td class="red">- ${totals.gastoTotal}</td>
        <td>${totals.balanceTotal}</td>
      </tr>`;
    }
  }
};
renderTotalCategory(category);






// ----------------------------------------------TOTAL POR MES--------------------------------------------------------
const getTotalByMonth = () => {
  const operations = getInfo("Operations") || [];
  const totalsByMonth = {};

  operations.forEach((operation) => {
    const operationDate = new Date(operation.fecha);
    const formattedMonth = `${operationDate.getFullYear()}-${
      operationDate.getMonth() + 1
    }`;

    if (!totalsByMonth[formattedMonth]) {
      totalsByMonth[formattedMonth] = {
        gananciaTotal: 0,
        gastoTotal: 0,
        balanceTotal: 0,
      };
    }

    if (operation.tipo === "ganancia") {
      totalsByMonth[formattedMonth].gananciaTotal += Number(operation.monto);
    } else if (operation.tipo === "gasto") {
      totalsByMonth[formattedMonth].gastoTotal += Number(operation.monto);
    }

    totalsByMonth[formattedMonth].balanceTotal =
      totalsByMonth[formattedMonth].gananciaTotal -
      totalsByMonth[formattedMonth].gastoTotal;
  });
  return totalsByMonth;
};

const renderTotalByMonth = () => {
  const totalMonthElement = just("#totalmonth");
  totalMonthElement.innerHTML = "";

  totalMonthElement.innerHTML = ` <tr>
    <th class="w-[20%] text-[#4A4A4A] text-left">Mes</th>
    <th class="w-[20%] text-[#4A4A4A] text-left">Ganancias</th>
    <th class="w-[20%] text-[#4A4A4A] text-left">Gastos</th>
    <th class="w-[20%] text-[#4A4A4A] text-left">Balance</th>
</tr>`;
  const totalsByMonth = getTotalByMonth();
  const monthsWithActivity = Object.keys(totalsByMonth).filter((month) => {
    const totals = totalsByMonth[month];
    return totals.gananciaTotal > 0 || totals.gastoTotal > 0;
  });
  monthsWithActivity.forEach((month) => {
    const totals = totalsByMonth[month];

    totalMonthElement.innerHTML += `<tr>
      <td class="w-[20%] text-left">${month}</td>
      <td class=" green">+ $${totals.gananciaTotal}</td>
      <td class="red">-$${totals.gastoTotal}</td>
      <td class""> $${totals.balanceTotal}</td>
    </tr>`;
  });
};
renderTotalByMonth();


// -----------------------------------EVENTS---------------------------------------------------
const inicializeApp = () => {
  setInfo("categories", allCategories);
  renderCategory(allCategories);

  just("#btn-add-categories").addEventListener("click", (e) => {
    if (!validateInput()) {
      e.preventDefault();

      return;
    }
    addCategory();
  });

  just("#btn-edit-categorie").addEventListener("click", (e) => {
    e.preventDefault();
    hideElement(".section-edit-category");
    showElement(".section-category");
    editBtnCategory();
  });
  just("#btn-remove-categories").addEventListener("click", () => {
    hideElement(".container-eliminar");
    showElement(".section-category");
  });

  just(".Cancel").addEventListener("click", (e) => {
    hideElement(".container-eliminar");
    showElement(".section-category");
  });

  just(".cancel-edit").addEventListener("click", (e) => {
    hideElement(".container-eliminar");
    showElement(".section-category");
    hideElement(".section-edit-category");
  });

  just("#box-icon-menu").addEventListener("click", (e) => {
    menuView();
  });
  just("#menu-report").addEventListener("click", () => {
    hideElement(".main-page");
    showElement(".section-edit-reports");
    hideElement(".section-category");
    renderReporte(totalOperations);
  });
  just("#balance").addEventListener("click", () => {
    showElement(".main-page");
    hideElement(".section-category");
    hideElement(".section-edit-reports");
  });
  just("#category").addEventListener("click", () => {
    hideElement(".main-page");
    showElement(".section-category");
    hideElement(".section-edit-reports");
  });
  setInfo("Operations", totalOperations);

  showOperations(totalOperations);

  just("#btn-balance-navb").addEventListener("click", () =>
    showViews("main-page")
  );
  just("#btn-category-navb").addEventListener("click", () =>
    showViews("section-category")
  );
  just("#btn-reports-navb").addEventListener("click", () => {
    showViews("section-reports");
    renderReporte(totalOperations);
  });

  // BTN + NUEVA OPERACION
  just("#btn-newOp").addEventListener("click", () => {
    showViews("section-editOperation");
    just(".btn-confirm-edit").classList.add("hidden");
    just("#editOp-tittle").classList.add("hidden");
    just("#btn-add-newOp").classList.remove("hidden");
    just("#newOp-tittle").classList.remove("hidden");
  });

  // BTN AGREGAR - NUEVA OPERACION
  just("#btn-add-newOp").addEventListener("click", (e) => {
    validateForm(e);
  });

  // -----------BOTON CANCELAR OPERACION
  just("#btn-cancel-newOp").addEventListener("click", () => {
    showViews("main-page");
    window.location.reload();
  });

  just(".btn-confirm-edit").addEventListener("click", (e) => runBtnConfirm(e));

  just(".btn-cancel-delete").addEventListener("click", () => {
    showViews("main-page");
    window.location.reload();
  });

  just(".form-select-type").addEventListener("input", (e) =>
    showSelectedType(e)
  );
  just("#form-select-category").addEventListener("input", (e) =>
    showSelectedCategory(e)
  );
  just("#form-input-date").addEventListener("input", (e) =>
    showSelectedDate(e)
  );
  just("#form-select-order").addEventListener("input", (e) =>
    showSelectedOrder(e)
  );
};
window.addEventListener("load", inicializeApp);
