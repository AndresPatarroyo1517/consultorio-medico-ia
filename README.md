# Prototipo de Consultorio Médico Virtual con IA
## Descripción
En este proyecto consta de dos partes. Una es la codificación del API haciendo uso de FastAPI como backend, y la segunda parte consta de realizar el HTML, CSS, JS usando JQuery y en nuestro caso TailWind CSS en vez de Bootstrap. El API tiene dos Endpoints los cuales nos permiten cargar imágenes frame a frame de la cámara usando CV2 y el otro es la captura de audio con la librería SpeechRecognition. El frontend consiste en un HTML, Tailwind para los estilos de este y un archivo JavaScript que contiene los cambios dinámicos visibles del HTML y la petición post usando JQuery, para obtener el audio recolectado con la librería y posteriormente mandarlo como un prompt a Ollama.

## Instrucciones de uso
Para hacer uso del proyecto debe clonar el repositorio de GitHub con el link: [https://github.com/AndresPatarroyo1517/Consultorio-Medico-IA](https://github.com/AndresPatarroyo1517/Consultorio-Medico-IA).
Primeramente, antes de ejecutar y visualizar el proyecto con las páginas web, usted debe tener instalado en su máquina Python (Recomendable la versión 3.11.2 debido a que el desarrollo del proyecto se hizo en base a esta versión).

1. (Opcional/Windows): Activamos las políticas de ejecución de Scripts con: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` (Se ejecuta en el powerShell de Visual Studio Code, una vez se cierra el proyecto, la política se restablecerá).

   (Opcional/MacOS): Activamos las políticas de ejecución de Scripts con: `chmod +x script.sh`.

2.Descargamos e instalamos Ollama en nuestra maquina, link: `https://ollama.com/download`.

3.Una vez descargado e instalado, ejecutamos Ollama y abrimos el cmd (Command Prompt) o en el caso de MacOS la terminal, posteriomente ejecutamos el siguiente código: `ollama pull llama3:8b`.

4. Creamos un entorno virtual de Python para la instalación de dependencias siguiendo los comandos:
- Ejecutamos en nuestra terminal `pip install virtualenv`.
- Creamos el entorno virtual en la terminal `python -m virtualenv chatbot-medico`.
- Iniciamos el entorno virtual `chatbot-medico\Scripts\activate`, en el caso de MacOS usamos `source chatbot-medico/bin/activate`.

5. Con el entorno virtual, procedemos a instalar las dependencias correspondientes en el `requirements.txt` usando este comando en la terminal: `pip install -r requirements.txt`

6. Una vez que se hayan instalado las librerías necesarias en el proyecto, ejecutaremos el proyecto con el siguiente comando: `uvicorn main:app --port 8000 --reload`.

7. Con el servidor de uvicorn iniciado, iremos a la URL: `http://127.0.0.1:8000`.

## Tecnologías usadas

- HTML y Tailwind CSS para la maquetación, diseño y decoración de la página web.
- Python para la estructuración de todo el código y la base del framework.
- FastAPI para el backend y la construcción de endpoints.
- Uvicorn se usó para el despliegue del servidor en un puerto local.
- JavaScript para los efectos visuales de la página y los elementos interactivos.
- JQuery se usó para la carga y envío de información que recibimos del API.
- SpeechRecognition para el reconocimiento de voz a la hora de mandar el prompt a Ollama.
- OpenCV para la captura de imagenes por camara.

## Autores

- Andrés Felipe Patarroyo Muñoz  
- Santiago Jair Torres Rivera
 
