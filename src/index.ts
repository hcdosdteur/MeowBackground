import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class cube {
    _divContainer: HTMLDivElement;
    _renderer: THREE.WebGLRenderer;
    _scene: THREE.Scene;
    _camera: THREE.PerspectiveCamera;
    _cube: THREE.Mesh<THREE.BoxGeometry, THREE.Material>
    constructor() {
        const divContainer = document.querySelector<HTMLDivElement>("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        const params = {
            color: '#ffffff'
        };
        scene.background = new THREE.Color(params.color);
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupCamera() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        const controls = new OrbitControls(camera, this._renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 1;
        controls.maxDistance = 10;
        controls.maxPolarAngle = Math.PI;
        camera.position.z = 5;
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 10;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }

    _setupModel() {
        const geometry = new THREE.BoxGeometry(3, 3, 3);

        const loader = new THREE.CubeTextureLoader();
        loader.setPath('../img/');
        const textureCube = loader.load([
            'cat1.jpg', 'cat1.jpg',
            'cat1.jpg', 'cat1.jpg',
            'cat1.jpg', 'cat1.jpg'
        ]);

        // controls.mouseButtons = {
        //     LEFT: THREE.MOUSE.ROTATE,
        //     MIDDLE: THREE.MOUSE.DOLLY,
        //     RIGHT: THREE.MOUSE.PAN
        // }
        const material = new THREE.MeshBasicMaterial({envMap: textureCube});

        const cube = new THREE.Mesh(geometry, material);

        this._scene.add(cube);
        this._cube = cube;
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    render(time: number) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time: number) {
        time *= 0.0001;
        this._cube.rotation.x = time;
        this._cube.rotation.y = time;
    }
}

window.onload = function () {
    new cube();
}

const warningToHacking = document.querySelector<HTMLDivElement>("#warning");
const body = document.querySelector<HTMLBodyElement>('body');
body.addEventListener('mousemove', () => {
    warningToHacking.style.display = "block";
    setTimeout(() => {
        warningToHacking.style.display = "none";
    }, 3000);
})