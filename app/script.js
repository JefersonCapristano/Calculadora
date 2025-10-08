const botones = document.querySelectorAll(".btn");
const operacion = document.getElementById("operacion");
const resultado = document.getElementById("resultado");

let expresion = ""; // Para ir armando la operación
let ultimaOperacion = ""; // Guarda la última operación completa
let resultadoMostrado = false; // Para saber si ya se presionó "="

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const valor = boton.textContent;
        
        

        if (boton.id === "limpiar") {
            // limpiar todo
            expresion = "";
            ultimaOperacion = "";
            operacion.textContent = "0";
            resultado.textContent = " ";
            resultadoMostrado = false;
        } else if (boton.id === "borrar") {
            // Borrar de uno en uno
            if (!resultadoMostrado) {
                expresion = expresion.slice(0, -1);
                operacion.textContent = expresion;
            }
        } else if (boton.id === "igual") {
            try {
                const evalResultado = eval(expresion);
                ultimaOperacion = expresion + " =";
                operacion.textContent = ultimaOperacion;
                resultado.textContent = evalResultado;
                expresion = evalResultado.toString();
                resultadoMostrado = true;
            } catch {
                resultado.textContent = "Error";
                expresion="";
                operacion.textContent = "0";
                
            }
        } else {
            if (resultadoMostrado) {
                if (/[+\-*/]/.test(valor)) {
                    // Si se presiona un operador, continuar desde el resultado
                    expresion = resultado.textContent + valor;
                } else {
                    // Si se presiona un número, iniciar nueva operación
                    expresion = valor;
                }
                resultadoMostrado = false;
            } else {
                //reemplazar automáticamente un operador si se presiona otro.
                if(/[+\-*/]/.test(expresion.slice(-1)) && /[+\-*/]/.test(valor)){
                    expresion = expresion.slice(0, -1) + valor;
                } else{
                    expresion += valor;
                }
                
            }
            operacion.textContent = expresion;
        }
    });
});
