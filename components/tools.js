/**
 * CahyASTRO Portal - Tools & Calculators Component
 */

class ToolsComponent {
  constructor() {
    this.init();
  }
  
  init() {
    document.querySelectorAll('.tool-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleToolCalculation(e));
    });
  }
  
  handleToolCalculation(e) {
    const toolType = e.target.dataset.tool;
    const card = e.target.closest('.tool-card');
    const inputs = card.querySelectorAll('.tool-input');
    const resultDiv = card.querySelector('.tool-result');
    
    let result = '';
    
    try {
      switch(toolType) {
        case 'au-km':
          const au = parseFloat(inputs[0].value);
          if (isNaN(au)) throw new Error('Invalid input');
          result = `${au} AU = ${Math_.auToKm(au).toFixed(2)} km`;
          break;
        
        case 'km-au':
          const km = parseFloat(inputs[0].value);
          if (isNaN(km)) throw new Error('Invalid input');
          result = `${km} km = ${Math_.kmToAu(km).toFixed(6)} AU`;
          break;
        
        case 'planet-weight':
          const weight = parseFloat(inputs[0].value);
          const planet = inputs[1].value;
          if (isNaN(weight)) throw new Error('Invalid input');
          const newWeight = Math_.weightOnPlanet(weight, planet);
          result = `Your weight on ${planet}: ${newWeight} kg`;
          break;
        
        case 'escape-velocity':
          const mass = parseFloat(inputs[0].value);
          const radius = parseFloat(inputs[1].value);
          if (isNaN(mass) || isNaN(radius)) throw new Error('Invalid input');
          result = `Escape Velocity: ${Math_.escapeVelocity(mass, radius)} m/s`;
          break;
        
        case 'gravity':
          const m = parseFloat(inputs[0].value);
          const r = parseFloat(inputs[1].value);
          if (isNaN(m) || isNaN(r)) throw new Error('Invalid input');
          result = `Surface Gravity: ${Math_.surfaceGravity(m, r)} m/s²`;
          break;
        
        case 'orbital-speed':
          const mass2 = parseFloat(inputs[0].value);
          const radius2 = parseFloat(inputs[1].value);
          if (isNaN(mass2) || isNaN(radius2)) throw new Error('Invalid input');
          result = `Orbital Speed: ${Math_.orbitalSpeed(mass2, radius2)} m/s`;
          break;
        
        case 'light-travel':
          const ly = parseFloat(inputs[0].value);
          if (isNaN(ly)) throw new Error('Invalid input');
          result = `Light Travel Time: ${Math_.lightTravelTime(ly)} days`;
          break;
        
        case 'time-dilation':
          const vel = parseFloat(inputs[0].value);
          if (isNaN(vel) || vel >= 100) throw new Error('Velocity must be < 100% c');
          result = `Time Dilation Factor: ${Math_.timeDilation(vel)}`;
          break;
        
        case 'redshift':
          const z = parseFloat(inputs[0].value);
          if (isNaN(z)) throw new Error('Invalid input');
          result = `Distance: ${Math_.redshiftDistance(z)} km`;
          break;
        
        case 'star-size':
          const star = inputs[0].value;
          const size = Math_.starSizeComparison(star);
          result = `${star.toUpperCase()} is ${size} times the Sun's size`;
          break;
        
        case 'age-calc':
          const hubble = parseFloat(inputs[0].value);
          if (isNaN(hubble)) throw new Error('Invalid input');
          result = `Universe Age: ~${hubble.toFixed(1)} billion years`;
          break;
        
        case 'distance-3d':
          const x = parseFloat(inputs[0].value) || 0;
          const y = parseFloat(inputs[1].value) || 0;
          const z = parseFloat(inputs[2].value) || 0;
          result = `Distance: ${Math_.distance3D(x, y, z)} units`;
          break;
        
        case 'luminosity':
          const temp = parseFloat(inputs[0].value);
          const rad = parseFloat(inputs[1].value);
          if (isNaN(temp) || isNaN(rad)) throw new Error('Invalid input');
          result = `Luminosity: ${Math_.luminosity(temp, rad).toFixed(4)} L☉`;
          break;
        
        case 'temp-convert':
          const value = parseFloat(inputs[0].value);
          const from = inputs[1].value;
          if (isNaN(value)) throw new Error('Invalid input');
          const k = Math_.convertTemp(value, from, 'K');
          const c = Math_.convertTemp(value, from, 'C');
          const f = Math_.convertTemp(value, from, 'F');
          result = `K: ${k} | C: ${c} | F: ${f}`;
          break;
        
        case 'mass-calc':
          const dens = parseFloat(inputs[0].value);
          const vol = parseFloat(inputs[1].value);
          if (isNaN(dens) || isNaN(vol)) throw new Error('Invalid input');
          result = `Mass: ${Math_.massfromDensity(dens, vol)} kg`;
          break;
        
        case 'density-calc':
          const m2 = parseFloat(inputs[0].value);
          const v2 = parseFloat(inputs[1].value);
          if (isNaN(m2) || isNaN(v2)) throw new Error('Invalid input');
          result = `Density: ${Math_.density(m2, v2)} kg/m³`;
          break;
        
        case 'surface-gravity':
          const gravities = {
            'mercury': '3.7 m/s² (38% Earth)',
            'venus': '8.9 m/s² (91% Earth)',
            'earth': '9.8 m/s² (100%)',
            'mars': '3.7 m/s² (38% Earth)',
            'jupiter': '24.8 m/s² (248% Earth)'
          };
          result = `Surface Gravity: ${gravities[inputs[0].value] || 'Unknown'}`;
          break;
        
        case 'orbital-period':
          const m3 = parseFloat(inputs[0].value);
          const a = parseFloat(inputs[1].value);
          if (isNaN(m3) || isNaN(a)) throw new Error('Invalid input');
          result = `Orbital Period: ${Math_.orbitalPeriod(m3, a)} seconds`;
          break;
        
        case 'black-hole':
          const mSolar = parseFloat(inputs[0].value);
          if (isNaN(mSolar)) throw new Error('Invalid input');
          result = `Schwarzschild Radius: ${Math_.schwarzschildRadius(mSolar)} meters`;
          break;
        
        case 'random-generator':
          const randomFacts = [
            'The Sun is 4.6 billion years old',
            'Jupiter has 95+ moons',
            'A day on Venus is longer than its year',
            'Neutron stars are incredibly dense',
            'The Universe is 13.8 billion years old'
          ];
          result = randomFacts[Math.floor(Math.random() * randomFacts.length)];
          break;
        
        default:
          result = 'Unknown tool';
      }
    } catch (error) {
      result = `Error: ${error.message}`;
    }
    
    if (resultDiv) {
      resultDiv.innerHTML = `<p class="result-text">${result}</p>`;
    }
  }
}

window.toolsComponent = new ToolsComponent();
console.log('[v0] Tools component loaded');
