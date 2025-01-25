let dolar = 0
let usdInput = document.querySelector('#usd')
let brlInput = document.querySelector('#brl')

updateDollarRate();


usdInput.addEventListener('keyup', () => {
    convert('usd-to-brl')
})
brlInput.addEventListener('keyup', () => {
    convert('brl-to-usd')
})

usdInput.addEventListener("blur", () => {
    usdInput.value = formatCurrency(usdInput.value)
})
brlInput.addEventListener("blur", () => {
    brlInput.value = formatCurrency(brlInput.value)
})

usdInput.value = '0'
convert('usd-to-brl')

function formatCurrency(value){
    let fixedValue= fixValue(value)
    let options = {//Objeto criado para conter a Biblioteca do java script
        useGrouping: false, // Faz com que não tenha ponto no milhar ou centena
        minimumFractionDigits: 2 // Faz com que tenha 2 casas decimais ao final
    }
    let formatter = new Intl.NumberFormat("pt-BR", options)// Usando a biblioteca de internacionalização "Intl" seguido de uma função que vem dentro dela chamada NumberFormat e dentro desta função nativa passamos 2 parâmetros, o primeiro e dizendo qual a linguágem "pt-BR" e o segundo é as opções que eu defini em options
    return formatter.format(fixedValue)
}

function fixValue(value) {
    let fixedValue = value.replace(',', '.')
    let floatValue = parseFloat(fixedValue)
    if(floatValue == NaN) {
        floatValue = 0
    }
    return floatValue
}

function convert(type) {
    if(type == 'usd-to-brl'){
        let fixedValue = fixValue(usdInput.value)
        let result = fixedValue * dolar

        result = result.toFixed(2)
        brlInput.value = formatCurrency(result)
    }
    if(type == 'brl-to-usd'){
        let fixedValue = fixValue(brlInput.value)
        let result = fixedValue / dolar

        result= result.toFixed(2)
        usdInput.value = formatCurrency(result)
    }
}
function updateDollarRate() {
    const apiUrl = 'https://economia.awesomeapi.com.br/json/last/USD-BRL';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            dolar = parseFloat(data.USDBRL.bid); // Obtém a taxa de câmbio
            console.log(`Cotação atualizada do dólar: ${dolar}`);
        })
        .catch(error => {
            console.error('Erro ao buscar a cotação do dólar:', error);
            alert('Não foi possível atualizar a cotação do dólar.');
        });
}