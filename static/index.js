// $(document).ready(function () {
//     var capturaAudio;
//     $("#buscar").on("click", function () {
//         $("#textaRespuesta").text('');
//         capturaAudio = new Promise(function (resolve, reject) {
//             $.ajax({
//                 type: "GET",
//                 url: "http://localhost:8000/habla",
//                 dataType: 'json',
//                 success: function (res) {
//                     resolve(res);
//                 },
//                 error: function (err) {
//                     reject(err);
//                 }
//             });
//         });
//         capturaAudio.then(function (audioCapturado) {
//             audioEnviar = 'Supon que eres un medico IA especializado, y quiero que me respondas lo mas cientificamente lo siguiente: ' + audioCapturado
//             $.ajax({
//                 type: "POST",
//                 url: "http://localhost:11434/api/generate",
//                 data: JSON.stringify({
//                     "model": "llama3:8b",
//                     "prompt": audioEnviar,
//                     "stream": true
//                 }),
//                 xhrFields: {
//                     onprogress: function (e) {
//                         $("#titulo").text('¡Tu análisis médico ha llegado!');
//                         var response = e.currentTarget.response;
//                         var lines = response.split('\n');
//                         var textoAnterior = $("#textaRespuesta").text();

//                         lines.forEach(function (line) {
//                             if (line.trim() !== '') {
//                                 var responseObject = JSON.parse(line);
//                                 console.log(responseObject);
//                                 $("#textaRespuesta").text(`${textoAnterior}${responseObject.response}`);
//                             }
//                         });
//                     }
//                 },
//                 success: function (data) {
//                     console.log(data);
//                 },
//                 error: function (err) {
//                     console.error(err);
//                 }
//             });
//         }).catch(function (err) {
//             console.error(err);
//         });
//     });
// });


$(document).ready(function () {
    var capturaAudio;
    $("#buscar").on("click", function () {
        $("#textaRespuesta").text('');
        capturaAudio = new Promise(function (resolve, reject) {
            $.ajax({
                type: "GET",
                url: "http://localhost:8000/habla",
                dataType: 'json',
                success: function (res) {
                    resolve(res);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });

        capturaAudio.then(function (audioCapturado) {
            var audioEnviar = 'Supon que eres un medico IA especializado, y quiero que me respondas lo mas cientificamente lo siguiente: ' + audioCapturado;

            $.ajax({
                type: "POST",
                url: "http://localhost:11434/api/generate",
                data: JSON.stringify({
                    "model": "llama3:8b",
                    "prompt": audioEnviar,
                    "stream": false 
                }),
                contentType: "application/json",
                success: function (data) {
                    console.log("Respuesta completa recibida:", data);
                    textoEnviar = data.response
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8000/responde",
                        data: JSON.stringify({
                            "texto": textoEnviar
                        }),
                        contentType: "application/json",
                        success: function (responseData) {
                            console.log("Respuesta enviada al servidor:", responseData);
                        },
                        error: function (err) {
                            console.error("Error al enviar la respuesta al servidor:", err);
                        }
                    });
                    $("#titulo").text('¡Tu análisis médico ha llegado!');
                },
                error: function (err) {
                    console.error(err);
                }
            });
        }).catch(function (err) {
            console.error(err);
        });
    });
});
