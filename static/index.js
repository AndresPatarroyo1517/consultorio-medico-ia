$(document).ready(function () {
    var promptsAnteriores = [];
    $("#buscar").on("click", () => {
        var promptActual = $("#inputPregunta").val();
        promptsAnteriores.push(promptActual);
        var cuerpo = {
            "model": "llama3:8b",
            "prompt": promptActual,
            "stream": true
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:11434/api/generate",
            data: JSON.stringify(cuerpo),
            xhrFields: {
                onprogress: function(e) {
                    $("#titulo").text('¡Tu análisis medico ha llegado!')
                    var response = e.currentTarget.response;
                    var lines = response.split('\n');
                    var textoAnterior = $("#textaRespuesta").text()
                    lines.forEach(function(line) {
                        if (line.trim() !== '') {
                            var responseObject = JSON.parse(line);
                            console.log(responseObject);
                            $("#textaRespuesta").text(`${textoAnterior}${responseObject.response}`);
                        }
                    });
                }
            },
        }).done(function(data){
            console.log(data)
        });
    });
});

