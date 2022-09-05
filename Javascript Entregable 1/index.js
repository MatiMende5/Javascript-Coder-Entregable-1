var notas;
var promedio;
var suma=0

var nnotas= parseInt(prompt("Defina la cantidad de notas a promediar"))

    for(i=0; i < nnotas; i++) {
        var notas= parseInt(prompt("Defina la nota " + i));
        suma = suma + notas;
    }

    promedio = suma/nnotas;

    alert("El resultado es " + promedio);