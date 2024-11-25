
let map;


function initMap() {
    const piauiCoords = [-5.0688258407135764, -42.82611493072079]; // Teresina
    map = L.map('map').setView(piauiCoords, 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}
function criarGraficoPizza() {
    const ctx = document.getElementById('impactoChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Chumbo', 'Mercúrio', 'Outros materiais', 'Plásticos'],
            datasets: [{
                data: [40, 30, 20, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Distribuição de Materiais Tóxicos em Eletrônicos'
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initMap();
    hideLoading(); // Esconde a animação de carregamento inicialmente
    criarGraficoPizza(); // Cria o gráfico de pizza
});

function adicionarPontoReciclagem(lat, lon, nome) {
    L.marker([lat, lon]).addTo(map)
        .bindPopup(nome)
        .openPopup();
}

const pontosReciclagemPiaui = [
    { lat: -5.0892, lon: -42.8019, nome: "Ecoponto Central - Teresina" },
    { lat: -5.0935, lon: -42.8037, nome: "Cooperativa de Catadores Reciclando Vidas - Teresina" },
    { lat: -5.0584, lon: -42.7927, nome: "Ecoponto Dirceu Arcoverde - Teresina" },
    { lat: -5.1009, lon: -42.7453, nome: "Ecoponto Parque Piauí - Teresina" },
    { lat: -5.0431, lon: -42.7789, nome: "Ecoponto Mocambinho - Teresina" },
    { lat: -7.0829, lon: -41.4689, nome: "Cooperativa de Reciclagem - Picos" },
    { lat: -7.0815, lon: -41.4701, nome: "Ecoponto Central - Picos" },
    { lat: -6.7746, lon: -43.0254, nome: "Centro de Coleta Seletiva - Floriano" },
    { lat: -6.7724, lon: -43.0231, nome: "Cooperativa de Catadores de Floriano" },
    { lat: -2.9055, lon: -41.7734, nome: "Ponto de Reciclagem Parnaíba Sustentável" },
    { lat: -2.9042, lon: -41.7755, nome: "Ecoponto Parnaíba Centro" },
    { lat: -7.3221, lon: -40.8392, nome: "Ecoponto São Raimundo Nonato" },
    { lat: -5.3130, lon: -41.7775, nome: "Centro de Reciclagem - Valença do Piauí" },
    { lat: -8.2371, lon: -42.2958, nome: "Ponto de Coleta - São João do Piauí" },
    { lat: -3.9058, lon: -42.1017, nome: "Ecoponto Piripiri" },
    { lat: -4.2260, lon: -41.6897, nome: "Centro de Reciclagem - Piracuruca" },
    { lat: -6.3915, lon: -42.7969, nome: "Ponto de Coleta Seletiva - Oeiras" },
    { lat: -5.6559, lon: -42.2908, nome: "Cooperativa de Reciclagem - Água Branca" },
    { lat: -7.4525, lon: -40.9078, nome: "Ecoponto Bom Jesus" },
    { lat: -5.3203, lon: -40.6273, nome: "Centro de Coleta - Fronteiras" },
    { lat: -7.0829, lon: -41.4689, nome: "Ponto de Reciclagem - Picos" },
    { lat: -6.4003, lon: -41.7720, nome: "Ecoponto Paulistana" },
    { lat: -5.8157, lon: -43.3544, nome: "Centro de Reciclagem - Amarante" },
    { lat: -7.7289, lon: -42.5250, nome: "Ponto de Coleta - Canto do Buriti" },
    { lat: -4.4477, lon: -41.4525, nome: "Ecoponto Pedro II" },
    { lat: -5.07017249534551, lon: -42.82611493072079, nome: "Expert Coletas" },
    {lat:-5.0688258407135764, lon:  -42.824740235017686, nome: "Teresina Recicle"},
    {lat:-5.06985178022786, lon: -42.82594186460247, nome: "Teresina Reciclagem"},
    {lat:-5.099261352006494, lon: -42.803969209337815, nome:"João do lixo"},
    {lat:-5.109688558666288, lon:-42.85649768238783, nome:"Reciclagem o Lima"},
    {lat:-5.074123901516617, lon:-42.82680026550671, nome:"JM Recicladora"},
    {lat:-5.109387819680332, lon:-42.791545374903194, nome:"Doecycle"},
    {lat:-4.8282399631743464, lon:-42.83459206925573, nome:"Recicla Codipi"},
    {lat:-4.9979023076545515, lon: -42.68627664621934, nome:"HM Ambiental PI"}

];

function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distância em km
}

function mostrarPontosProximos(lat, lon, quantidade = 12) {
    const pontosOrdenados = pontosReciclagemPiaui.map(ponto => ({
        ...ponto,
        distancia: calcularDistancia(lat, lon, ponto.lat, ponto.lon)
    })).sort((a, b) => a.distancia - b.distancia);

    map.setView([lat, lon], 11);
    pontosOrdenados.slice(0, quantidade).forEach(ponto => {
        adicionarPontoReciclagem(ponto.lat, ponto.lon, `${ponto.nome} (${ponto.distancia.toFixed(2)} km)`);
    });
}

function showLoading() {
    document.getElementById('loadingAnimation').style.display = 'flex';
    document.getElementById('map').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loadingAnimation').style.display = 'none';
    document.getElementById('map').style.display = 'block';
}

async function buscarPontosReciclagem(lat, lon) {
    showLoading();
    const query = `
    [out:json];
    (
      node["amenity"="recycling"](around:50000,${lat},${lon});
      way["amenity"="recycling"](around:50000,${lat},${lon});
      relation["amenity"="recycling"](around:50000,${lat},${lon});
    );
    out center;
    `;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.elements.length > 0) {
            data.elements.forEach(element => {
                let lat, lon;
                if (element.type === 'node') {
                    lat = element.lat;
                    lon = element.lon;
                } else {
                    lat = element.center.lat;
                    lon = element.center.lon;
                }
                adicionarPontoReciclagem(lat, lon, "Ponto de Reciclagem");
            });
        } else {
            mostrarPontosProximos(lat, lon);
        }
    } catch (error) {
        console.error("Erro ao buscar pontos de reciclagem:", error);
        mostrarPontosProximos(lat, lon);
    } finally {
        hideLoading();
    }
}

async function buscarPorCEP() {
    showLoading();
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) {
        alert("Por favor, insira um CEP válido com 8 dígitos.");
        hideLoading();
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.erro) {
            throw new Error("CEP não encontrado");
        }
        
        console.log("Dados do CEP:", data);

        if (data.uf !== "PI") {
            alert("O CEP informado não pertence ao estado do Piauí. Por favor, insira um CEP do Piauí.");
            hideLoading();
            return;
        }

        // Tenta geocodificar usando o endereço completo
        let geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&country=Brazil&state=Piauí&city=${encodeURIComponent(data.localidade)}&street=${encodeURIComponent(data.logradouro)}&postalcode=${cep}`;
        let geocodeResponse = await fetch(geocodeUrl);
        let geocodeData = await geocodeResponse.json();

        // Se não encontrar, tenta apenas com a cidade
        if (geocodeData.length === 0) {
            console.log("Endereço completo não encontrado. Tentando apenas com a cidade.");
            geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&country=Brazil&state=Piauí&city=${encodeURIComponent(data.localidade)}`;
            geocodeResponse = await fetch(geocodeUrl);
            geocodeData = await geocodeResponse.json();
        }

        console.log("Dados do geocode:", geocodeData);

        if (geocodeData.length > 0) {
            const lat = parseFloat(geocodeData[0].lat);
            const lon = parseFloat(geocodeData[0].lon);
            map.eachLayer(function (layer) {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
            mostrarPontosProximos(lat, lon);
        } else {
            throw new Error("Não foi possível encontrar as coordenadas para este CEP ou cidade");
        }
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        alert("Não foi possível localizar o CEP. Mostrando pontos de reciclagem pré-definidos no Piauí.");
        mostrarPontosProximos(-5.0892, -42.8019); // Coordenadas de Teresina
    } finally {
        hideLoading();
    }
}

document.getElementById('localizarBtn').addEventListener('click', buscarPorCEP);

document.addEventListener('DOMContentLoaded', function() {
    initMap();
    hideLoading(); // Esconde a animação de carregamento inicialmente
});

document.getElementById('ondeDescartarBtn').addEventListener('click', function(event) {
    event.preventDefault();
    const descartarSection = document.getElementById('descartarSection');
    descartarSection.classList.toggle('show');
});
let currentSlide = 0;

function moveSlide(direction) {
  const slides = document.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;

  // Remove a classe 'active' do slide atual
  slides[currentSlide].classList.remove('active');

  // Calcula o próximo slide (sem rotação circular)
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

  // Adiciona a classe 'active' ao próximo slide
  slides[currentSlide].classList.add('active');
}
document.addEventListener('DOMContentLoaded', () => {
    const userMenu = document.querySelector('.user-menu')
    const trigger = userMenu.querySelector('.user-menu-trigger')
  
    trigger.addEventListener('click', () => {
      userMenu.classList.toggle('active')
    })
  
    // Fechar o menu quando clicar fora
    document.addEventListener('click', (e) => {
      if (!userMenu.contains(e.target)) {
        userMenu.classList.remove('active')
      }
    })
  })
  document.addEventListener('DOMContentLoaded', function() {
    const hamburguer = document.querySelector(".hamburguer");
    const navMenu = document.querySelector(".nav-menu");

    hamburguer.addEventListener("click", mobileMenu);

    function mobileMenu() {
        hamburguer.classList.toggle("active");
        navMenu.classList.toggle("active");
    }

    const navLink = document.querySelectorAll(".nav-link");

    navLink.forEach(n => n.addEventListener("click", closeMenu));

    function closeMenu() {
        hamburguer.classList.remove("active");
        navMenu.classList.remove("active");
    }

    // Resto do seu código JavaScript existente...
});

// Adicione esta função ao final do seu arquivo JavaScript
function toggleHamburguerIcon(hamburguer) {
    hamburguer.classList.toggle("active");
}