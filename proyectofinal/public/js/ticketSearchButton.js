function getTicket(event) {
    event.preventDefault();

    const ticketId = document.getElementById('ticketId').value;

    fetch(`/api/tickets/${ticketId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        if (data.ticket.length === 0) {
            alert("Ticket no encontrado")
        }else{
            updateTicketData(data);
        }
    })
    .catch(error => {
        console.error('Error al obtener datos del ticket:', error);
    });
}

function updateTicketData(ticket) {
    const ticketDataContainer = document.getElementById('ticketDataContainer');

    ticketDataContainer.innerHTML = '';

    const data = ticket.ticket[0]; 

    const idElement = document.createElement('p');
    idElement.textContent = 'ID: ' + data._id;

    const codeElement = document.createElement('p');
    codeElement.textContent = 'Code: ' + data.code;

    const amountElement = document.createElement('p');
    amountElement.textContent = 'Amount: ' + data.amount;

    const purchaserElement = document.createElement('p');
    purchaserElement.textContent = 'Purchaser: ' + data.purchaser;

    const dateElement = document.createElement('p');
    dateElement.textContent = 'Date: ' + data.purchase_datetime;

    ticketDataContainer.append(idElement, codeElement, amountElement, purchaserElement,
        dateElement);
}