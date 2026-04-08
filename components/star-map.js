/**
 * CahyASTRO Portal - 3D Star Map Component (Three.js)
 */

class StarMapComponent {
  constructor() {
    this.canvas = document.getElementById('starMapCanvas');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.stars = [];
    this.showConstellations = true;
    this.showGrid = true;
    this.showLabels = true;
    
    this.init();
  }
  
  init() {
    if (!this.canvas || typeof THREE === 'undefined') return;
    
    // Setup scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 10000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    
    this.camera.position.z = 100;
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setClearColor(0x000a1628);
    
    this.createStarField();
    this.setupControls();
    this.animate();
    
    // Setup buttons
    document.getElementById('toggleConstellations')?.addEventListener('click', () => {
      this.showConstellations = !this.showConstellations;
    });
    
    document.getElementById('toggleGrid')?.addEventListener('click', () => {
      this.showGrid = !this.showGrid;
    });
    
    document.getElementById('toggleLabels')?.addEventListener('click', () => {
      this.showLabels = !this.showLabels;
    });
    
    document.getElementById('resetCamera')?.addEventListener('click', () => {
      this.camera.position.set(0, 0, 100);
      this.camera.rotation.order = 'YXZ';
      this.camera.rotation.set(0, 0, 0);
    });
  }
  
  createStarField() {
    // Create random stars
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      vertices.push(x, y, z);
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    
    const material = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 2,
      sizeAttenuation: true
    });
    
    const points = new THREE.Points(geometry, material);
    this.scene.add(points);
  }
  
  setupControls() {
    // Basic mouse controls
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    
    this.canvas.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    this.canvas.addEventListener('mousemove', (e) => {
      if (isMouseDown) {
        const deltaX = e.clientX - mouseX;
        const deltaY = e.clientY - mouseY;
        
        this.camera.rotation.y += deltaX * 0.005;
        this.camera.rotation.x += deltaY * 0.005;
        
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
    });
    
    this.canvas.addEventListener('mouseup', () => {
      isMouseDown = false;
    });
    
    // Zoom with wheel
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.camera.position.z += e.deltaY * 0.1;
      this.camera.position.z = Math.max(10, Math.min(500, this.camera.position.z));
    });
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}

window.starMap = new StarMapComponent();
console.log('[v0] Star Map component loaded');
