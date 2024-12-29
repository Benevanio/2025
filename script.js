const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1,
    transparent: true,
    opacity: 0.8
});

for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = Math.random() * 1000 - 500;
    positions[i * 3 + 1] = Math.random() * 1000 - 500;
    positions[i * 3 + 2] = Math.random() * 1000 - 500;
    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

camera.position.z = 200;

function animateParticles() {
    particleSystem.rotation.x += 0.01;
    particleSystem.rotation.y += 0.01;

    const positions = particleSystem.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.1;
        if (positions[i + 1] < -500) {
            positions[i + 1] = 500;
        }
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;
}

function animate() {
    requestAnimationFrame(animate);
    animateParticles();
    renderer.render(scene, camera);
}

animate();

setTimeout(() => {
    document.querySelector('.title').innerText = "Feliz Ano Novo 2024";
    document.querySelector('.title').classList.add('fade-in');
}, 1000);

setTimeout(() => {
    document.querySelector('.title').innerText = "Feliz Ano Novo 2025";
    document.querySelector('.title').classList.add('fade-in');
    document.querySelector('#yearChange').classList.add('fade-in');
}, 3000);

setTimeout(() => {
    const yearElement = document.querySelector('#yearChange');
    yearElement.innerText = '2025';
    yearElement.classList.add('fade-in');
}, 5000);
