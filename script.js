let numero = document.querySelectorAll(".numero")
let operadores = document.querySelectorAll(".operadores")

let igual = document.querySelector(".igual")
let limpar = document.querySelector(".limpar")
let backspace = document.querySelector(".backspace")
let maisMenos = document.querySelector(".mais-ou-menos")
let ponto = document.querySelector(".ponto")

let display = document.querySelector(".display")
let output = document.querySelector(".output")

let igualPressionado = false

for (let i = 0; i < numero.length; i++) {
    numero[i].addEventListener("click", function () {
        if (igualPressionado) {
            display.textContent = "";
            igualPressionado = false
        }

        if (
            "0123456789.+-x÷".includes(
                display.textContent[display.textContent.length - 1]
            )
            ||
            display.textContent == ""
        )
            display.textContent += this.textContent
        evaluate()
    })
}

for (let i = 0; i < operadores.length; i++) {
    operadores[i].addEventListener("click", function () {
        if (display.textContent !== "." && display.textContent !== "") {
            igualPressionado = false;
            if ("+-x÷".includes(display.textContent[display.textContent.length - 1]))
                display.textContent =
                    display.textContent.substring(0, display.textContent.length
                        - 1) +
                    this.textContent
            else display.textContent += this.textContent
        }
    })
}

igual.addEventListener("click", function () {
    if (output.textContent !== "") {
        display.textContent = output.textContent
        output.textContent = ""
        igualPressionado = true
    }
})

limpar.addEventListener("click", function () {
    igualPressionado = false
    display.textContent = ""
    output.textContent = ""
})

backspace.addEventListener("click", function () {
    igualPressionado = false
    display.textContent = display.textContent.substr(0,
        display.textContent.length - 1
    )
    evaluate()
})

maisMenos.addEventListener("click", function () {
    if (display.textContent !== ".") {
        igualPressionado = false
        let expresao = display.textContent
        let flag = true

        for (let i = expresao.length - 1; i >= 0; i--) {
            if ("+-x÷".includes(expresao[i])) {
                if (expresao[1] !== "-")
                    expresao =
                        expresao.substring(0, i + 1) +
                        "-" +
                        expresao.substring(i + 1, expresao.length)
                else if ("+-x÷".includes(expresao[i - 1]) || i - 1 < 0)
                    expresao =
                        expresao.substring(0, i) +
                        expresao.substring(i + 1, expresao.length)
                else
                    expresao =
                        expresao.substring(0, i) +
                        "+" +
                        expresao.substring(i + 1, expresao.length)
                flag = false
                break
            }
        }
        if (flag) expresao = "-" + expresao
        display.textContent = expresao
        evaluate()
    }
})

ponto.addEventListener("click", function () {
    if (igualPressionado) {
        display.textContent = ""
        igualPressionado = false
    }
    let start = 0
    for (let i = display.textContent.length - 1; i >= 0; i--) {
        if ("+-x÷".includes(display.textContent[i])) {
            start = i + 1
            break
        }
    }
    if (
        !display.textContent
            .substring(start, display.textContent.length)
            .includes(".")
    )
        display.textContent += "."
})

function evaluate() {
    let expresao = display.textContent

    for (let i = 0; i < expresao.length; i++) {
        if (expresao[i] === "x")
            expresao =
                expresao.substring(0, i) +
                "*" +
                expresao.substring(0, i, expresao.length)
        if (expresao[i] === "÷")
            expresao =
                expresao.substring(0, i) +
                "/" +
                expresao.substring(i + 1, expresao.length)
    }
    const tempFunc = (exp) => {
        return new Function(`return ${exp}`)();
    };

    if (
        "0123456789.".includes(expresao[expresao.length - 1]) &&
        tempFunc(expresao) != expresao
    ) {

        output.textContent = tempFunc(expresao)
    } else output.textContent = ""

}

document.querySelectorAll(".row div").forEach((el) => {
    el.addEventListener("click", function () {
        this.classList.add("efeito-click")
        setTimeout(() => {
            this.classList.remove("efeito-click")
        }, 100)
    })
})