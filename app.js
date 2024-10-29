
//Con la finalidad de cumplir con los puntos a evaluar, a continuacion se mostrara por bloques comentarios del codigo



//Implementación adecuada de la clase Agente y sus propiedades

class Agente {
    constructor(nombre, rol, habilidades, imagen) {
        this.nombre = nombre;
        this.rol = rol;
        this.habilidades = habilidades;
        this.imagen = imagen;
    }
}



//Se realiza correctamente el consumo del API usando fetch y async/await.
async function getAgents() {
    const response = await fetch('https://valorant-api.com/v1/agents');
    const data = await response.json();
    return data.data.map(agent => new Agente(            //El JSON del API es convertido en instancias de la clase Agente.
        agent.displayName,      
        agent.role ? agent.role.displayName : 'N/A',
        agent.abilities.map(ability => ability.displayName),
        agent.displayIcon
    ));
}


//Los agentes se muestran correctamente en el DOM a partir de los objetos creados.

function renderAgents(agents) {
    const container = document.getElementById('agents-container');
    container.innerHTML = ''; // Limpiar el contenedor

    agents.forEach(agent => {
        const agentDiv = document.createElement('div');
        agentDiv.classList.add('agent');

        const img = document.createElement('img');
        img.src = agent.imagen;
        img.alt = agent.nombre;

        const name = document.createElement('h2');
        name.textContent = agent.nombre;

        const role = document.createElement('p');
        role.textContent = `Rol: ${agent.rol}`;

        const abilities = document.createElement('ul');
        agent.habilidades.forEach(habilidad => {
            const li = document.createElement('li');
            li.textContent = habilidad;
            abilities.appendChild(li);
        });

        agentDiv.appendChild(img);
        agentDiv.appendChild(name);
        agentDiv.appendChild(role);
        agentDiv.appendChild(abilities);
        container.appendChild(agentDiv);
    });
}


//La barra de búsqueda filtra y muestra los agentes de acuerdo con el criterio ingresado

document.addEventListener('DOMContentLoaded', async () => {
    const agents = await getAgents();
    renderAgents(agents);

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredAgents = agents.filter(agent => agent.nombre.toLowerCase().includes(searchTerm));
        renderAgents(filteredAgents);
    });
});




