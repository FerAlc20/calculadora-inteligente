document.addEventListener('DOMContentLoaded', () => {

    //  URL DE NODO WEBHOOK EN N8N
    const N8N_WEBHOOK_URL = "https://fernandaalcantara.app.n8n.cloud/webhook/4866e093-f879-4557-b0e1-90657fa0e3ba";

    const btnCalcular = document.getElementById('btnCalcular');
    const textoOperacion = document.getElementById('textoOperacion');
    const divResultado = document.getElementById('divResultado');
    const loadingSpinner = document.getElementById('loadingSpinner');

    btnCalcular.addEventListener('click', () => {
        const query = textoOperacion.value;

        if (query.trim() === "") {
            alert("Por favor, escribe una operación.");
            return;
        }

        // Mostrar spinner y ocultar resultado anterior
        loadingSpinner.style.display = 'block';
        btnCalcular.disabled = true;
        divResultado.style.display = 'none';

        // 2. Enviar la solicitud a n8n
        fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                textoUsuario: query
            })
        })
        .then(response => response.json())
        .then(data => {
            // Ocultar spinner y reactivar botón
            loadingSpinner.style.display = 'none';
            btnCalcular.disabled = false;

            // 3. Mostrar el resultado que n8n nos devuelve
            divResultado.innerText = `El resultado es: ${data.respuestaCalculada}`;
            divResultado.style.display = 'block';
        })
        .catch(error => {
            // Manejo de errores
            loadingSpinner.style.display = 'none';
            btnCalcular.disabled = false;
            console.error('Error:', error);
            divResultado.innerText = 'Hubo un error al procesar la solicitud.';
            divResultado.classList.replace('alert-success', 'alert-danger');
            divResultado.style.display = 'block';
        });
    });

});
