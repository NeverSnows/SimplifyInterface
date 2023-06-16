
//Armazena a lista de categorias e manipula ela;
const ExpenseCategory = {
    expenseCategoryList: [],

};

//Controla entrada e saida de dados do BD. Atualmetne trabalhando com arrays para simular um BD com nome de "Fake".
const DataBaseManagement = {

    //Arrays simulando um BD.
    FakeExpenseTypeDataBase: ["Gas", "Luz", "Agua"],
    FakeExpenseDataBase: [],

    //Recebe um nome(String), um valor(numero), uma data(yyyy-mm-dd) e uma categoria(numero id da categoria)
    saveNewExpense(name, value, date, expenseTypeIndex){
        console.log(name);
        const tempExpenseType = this.FakeExpenseTypeDataBase[expenseTypeIndex];
        this.FakeExpenseDataBase.push({name, value, date, tempExpenseType});
        console.log(this.FakeExpenseDataBase);
        App.reload();
    },

    //Salva uma nova categoria de gasto.
    saveNewExpenseType(newExpenseName){
        console.log(newExpenseName)
        this.FakeExpenseTypeDataBase.push(newExpenseName);
        console.log(this.FakeExpenseTypeDataBase);
    },

    //Busca todas as categorias de gastos do BD.
    fetchExpenseTypes(){
        return this.FakeExpenseTypeDataBase;
    }
};

const Form = {
    validateNewExpenseForm(newExpenseTypeSelected){
        //Se a opção selecionada for "Nova+" e o nome da nova categoria estiver vazio, ou qualquer outro campo estiver vazio, retorne falso.
        if((newExpenseTypeSelected && document.getElementById('new-expense-type-name').value == '') ||
        document.getElementById('new-expense-name').value == '' ||
        document.getElementById('new-expense-date').value == '' ||
        document.getElementById('new-expense-value').value == ''){
            return false;
        }
        return true;
    },
};

//Lida com toda alteração visual no documento.
const DOM = {
    //Gera uma <option> com a categoria recebida e a retorna.
    generateExpenseTypeOption(type, index){
        let element = document.createElement('option');
        element.value = index;
        element.textContent = type;
        return element;
    },

    //Abre o formulario de novo gasto.
    openNewExpenseForm(){
        document.getElementById('new-expense-overlay').classList.remove('hidden');
    },

    //Fecha o formulario de novo gasto.
    closeNewExpenseForm(){
        document.getElementById('new-expense-overlay').classList.add('hidden');
    },

    //Limpa as informacoes de formulario
    clearnewExpenseForm(){
        document.getElementById('new-expense-name').value = '';
        document.getElementById('new-expense-value').value = '';
        document.getElementById('new-expense-date').value = '';
        document.getElementById('new-expense-types').value = 0;
        document.getElementById('new-expense-type-name').value = '';

    }
};

// Lida com Event Listeners.
const EventListeners = {
    //Deve ser chaamdo apenas uma vez no começo do programa, para evitar duplicidade de event listeners.
    subscribeFixedEventListeners(){
        document.getElementById('new-expense-types').addEventListener('change', (event)=>{
            const expenseNameElement = document.getElementById('expense-type-name-row');
            const selectedType = event.target.children[event.target.value].textContent;
            //Caso a categoria selecionada seja a de numero 0, ou seja, nova, adicionar campo de nome da nova categoria.
            if(selectedType == 'Nova+'){
                expenseNameElement.classList.remove('hidden-sizeless');
            } else{
                expenseNameElement.classList.add('hidden-sizeless');
            }
        });
        document.getElementById('new-expense-btn').addEventListener('click', DOM.openNewExpenseForm);
        document.getElementById('new-expense-cancel').addEventListener('click', DOM.closeNewExpenseForm);
        document.getElementById('new-expense-confirm').addEventListener('click', ()=>{
            const expenseTypesElement = document.getElementById('new-expense-types');
            const newExpenseTypeName = expenseTypesElement.children[expenseTypesElement.value].textContent;
            const newExpenseTypeSelected = newExpenseTypeName == "Nova+";

            //Valida as informações do form. Se estiverem corretas, salva elas no banco de dados, fecha e limpa o modal do formulario.
            if(Form.validateNewExpenseForm(newExpenseTypeSelected)){
                //Checa se a opção de nova categoria foi selecionada. Se sim, salva a nova categoria e a atribui ao novo gasto antes de salvar no banco de dados..
                if(newExpenseTypeSelected){
                    DataBaseManagement.saveNewExpenseType(document.getElementById('new-expense-type-name').value);
                }
                DataBaseManagement.saveNewExpense(
                    document.getElementById('new-expense-name').value,
                    document.getElementById('new-expense-value').value,
                    document.getElementById('new-expense-date').value,
                    expenseTypesElement.value);
                DOM.closeNewExpenseForm();
                DOM.clearnewExpenseForm();
            }
        });
    },

    //Deverá ser utulisado apra adicionar event listeners em elementos que surjem e desaparecem com o tempo.
    subscribeDynamicEventLisneters(){

    }
};

const App = {
    expenseTypesElement: document.getElementById('new-expense-types'),
    
    init(){
        let lastIndex;
        //salva uma copia da lista de categorias provida pelo BD.
        ExpenseCategory.expenseCategoryList = DataBaseManagement.fetchExpenseTypes();

        //Gera a lista de categorias de gastos no modal, baseado na copia local recebida.
        ExpenseCategory.expenseCategoryList.forEach((type, index) => {
            this.expenseTypesElement.appendChild(DOM.generateExpenseTypeOption(type, index));
            lastIndex = index;
        });

        //Adiciona a ultima opção da lista de categorias como sendo um "botão" de nova categoria.
        let optionNew = document.createElement('option');
        optionNew.value = lastIndex + 1;
        optionNew.textContent = 'Nova+';
        optionNew.classList.add('newExpenseTypeOption')
        this.expenseTypesElement.appendChild(optionNew);

        //Inscreve os eventos dinamicos.
        EventListeners.subscribeDynamicEventLisneters();
    },

    reload(){
        this.expenseTypesElement.innerHTML = '';
        this.init();
    }

};

App.init();
EventListeners.subscribeFixedEventListeners()