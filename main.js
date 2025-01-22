let dolar = 6.11
let usdInput = document.querySelector('#usd')
let brlInput = document.querySelector('#brl')

usdInput.addEventListener('keyup', () => {
    usdInput.value = formatCurrency(usdInput.value)//Como funciona? Estou pegando o que o usuário digitou, jogando dentro da função que formata, e depois devolvendo no próprio input que o usuário está digitando, mas já de forma formatada em tempo real.
})
brlInput.addEventListener('keyup', () => {
    brlInput.value = formatCurrency(brlInput.value)//Como funciona? Estou pegando o que o usuário digitou, jogando dentro da função que formata, e depois devolvendo no próprio input que o usuário está digitando, mas já de forma formatada em tempo real.
})

usdInput.value = '1000,00'
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
    }
    if(type == 'brl-to-usd'){

    }
}