import './style.css';
import * as THREE from 'three';
import dist from 'webpack-merge';

const scene = new THREE.Scene();

const vehicleColors: number[] = [0xa52523, 0xdb638, 0x78b14b];

const trackRadius = 225;
const trackWidth = 45;
const innerTrackRadius = trackRadius - trackWidth;
const outerTrackRadius = trackRadius + trackWidth;

const arcAngle1 = (1 / 3) * Math.PI; // 60 degrees

const deltaY = Math.sin(arcAngle1) * innerTrackRadius;
const arcAngle2 = Math.asin(deltaY / outerTrackRadius);

const arcCenterX = (
    Math.cos(arcAngle1) * innerTrackRadius +
    Math.cos(arcAngle2) * outerTrackRadius
) / 2;

const arcAngle3 = Math.acos(arcCenterX / innerTrackRadius);
const arcAngle4 = Math.acos(arcCenterX / outerTrackRadius);


const playerCar = Car();
scene.add(playerCar);

// Set up light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(100, -300, 400);
scene.add(dirLight);

// Set up camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 960;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
    cameraWidth / -2, // left
    cameraWidth / 2, // right
    cameraHeight / 2, // top
    cameraHeight / -2, // bottom
    0, // near plane
    1000 // far plane
);

camera.position.set(0, -210, 300);
camera.lookAt(0, 0, 0);

renderMap(cameraWidth, cameraHeight * 2);

// Set up renderer
const renderer = new THREE.WebGL1Renderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

document.body.append(renderer.domElement);

function renderMap(mapWidth: number, mapHeight: number): void {
    // Plane with line markings
    const lineMarkingsTexture = getLineMarkings(mapWidth, mapHeight);

    const planeGeometry = new THREE.PlaneBufferGeometry(mapWidth, mapHeight);
    const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0x546e90,
        map: lineMarkingsTexture
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);

    // extruded geometry 
    const islandLeft = getLeftIsland();
    const islandRight = getRightIsland();
    const islandMiddle = getMiddleIsland();
    const outerField = getOuterField(mapWidth, mapHeight);

    const fieldGeometry = new THREE.ExtrudeBufferGeometry(
        [islandLeft, islandMiddle, islandRight, outerField],
        { depth: 6, bevelEnabled: false }
    );

    const fieldMesh = new THREE.Mesh(fieldGeometry, [
        new THREE.MeshLambertMaterial({ color: 0x67c240 }),
        new THREE.MeshLambertMaterial( {color: 0x23311c})
    ]);

    scene.add(fieldMesh);
}

function getLeftIsland(): THREE.Shape {
    const islandLeft = new THREE.Shape();

    islandLeft.absarc(
        -arcCenterX,
        0,
        innerTrackRadius,
        arcAngle1,
        -arcAngle1,
        false
    );

    islandLeft.absarc(
        arcCenterX,
        0,
        outerTrackRadius,
        Math.PI + arcAngle2,
        Math.PI - arcAngle2,
        true
    );

    return islandLeft;
}

function getMiddleIsland(): THREE.Shape {
    const islandMiddle = new THREE.Shape();

    islandMiddle.absarc(
        -arcCenterX,
        0,
        innerTrackRadius,
        arcAngle3,
        -arcAngle3,
        true
    );

    islandMiddle.absarc(
        arcCenterX,
        0,
        innerTrackRadius,
        Math.PI + arcAngle3,
        Math.PI - arcAngle3,
        true
    );

    return islandMiddle;
}

function getRightIsland(): THREE.Shape {
    const islandRight = new THREE.Shape();

    islandRight.absarc(
        arcCenterX,
        0,
        innerTrackRadius,
        Math.PI - arcAngle1,
        Math.PI + arcAngle1,
        true
    );

    islandRight.absarc(
        -arcCenterX,
        0,
        outerTrackRadius,
        -arcAngle2,
        arcAngle2,
        false
    );

    return islandRight;
}

function getOuterField(mapWidth, mapHeight): THREE.Shape {
    const field = new THREE.Shape();

    field.moveTo(-mapWidth / 2, -mapHeight / 2);
    field.lineTo(0, -mapHeight / 2);

    field.absarc(
        -arcCenterX,
        0,
        outerTrackRadius,
        -arcAngle4,
        arcAngle4,
        true,
    );

    field.absarc(
        arcCenterX,
        0,
        outerTrackRadius,
        Math.PI - arcAngle4,
        Math.PI + arcAngle4,
        true,
    );

    field.lineTo(0, -mapHeight / 2);
    field.lineTo(mapWidth / 2, -mapHeight / 2);
    field.lineTo(mapWidth / 2, mapHeight / 2);
    field.lineTo(-mapWidth / 2, mapHeight / 2);
    
    return field;
}

function getLineMarkings(mapWidth: number, mapHeight: number): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = mapWidth;
    canvas.height = mapHeight;
    const context = canvas.getContext('2d');

    context.fillStyle = '#546E90';
    context.fillRect(0, 0, mapWidth, mapHeight);

    context.lineWidth = 2;
    context.strokeStyle = '#E0FFFF';
    context.setLineDash([10, 14]);

    // Left circle
    context.beginPath();
    context.arc(
        mapWidth / 2 - arcCenterX,
        mapHeight / 2,
        trackRadius,
        0,
        Math.PI * 2,
    );

    context.stroke();

    // Right circle
    context.beginPath();
    context.arc(
        mapWidth / 2 + arcCenterX,
        mapHeight / 2,
        trackRadius,
        0,
        Math.PI * 2,
    );

    context.stroke();

    return new THREE.CanvasTexture(canvas);
}


function Car(): THREE.Group {
    const car = new THREE.Group();

    const backWheel = Wheel();
    backWheel.position.x = -18;
    car.add(backWheel);

    const frontWheel = Wheel();
    frontWheel.position.x = 18;
    car.add(frontWheel);

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60, 30, 15),
        new THREE.MeshLambertMaterial({ color: pickRandom(vehicleColors) })
    );

    main.position.z = 12;
    car.add(main);

    const carFrontTexture = getCarFrontTexture();
    carFrontTexture.center = new THREE.Vector2(0.5, 0.5);
    carFrontTexture.rotation = Math.PI / 2;

    const carBackTexture = getCarFrontTexture();
    carBackTexture.center = new THREE.Vector2(0.5, 0.5);
    carBackTexture.rotation = -Math.PI / 2;

    const carRightSideTexture = getCarSideTexture();

    const carLeftSideTexture = getCarSideTexture();
    carLeftSideTexture.flipY = false;

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33, 24, 12), [
        new THREE.MeshLambertMaterial({ map: carFrontTexture }),
        new THREE.MeshLambertMaterial({ map: carBackTexture }),
        new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
        new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
        new THREE.MeshLambertMaterial({ color: 0xffffff }), // top
        new THREE.MeshLambertMaterial({ color: 0xffffff }) // bottom
    ]);
    
    cabin.position.x = -6;
    cabin.position.z = 25.5;
    car.add(cabin);

    return car;
}

function Wheel(): THREE.Mesh {
    const wheel = new THREE.Mesh(
        new THREE.BoxBufferGeometry(12, 33, 12),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );

    wheel.position.z = 6;
    return wheel;
}

function pickRandom(array: number[]): number {
    return array[Math.floor(Math.random() * array.length)];
}

function getCarFrontTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext('2d');

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 64, 32);

    context.fillStyle = '#666666';
    context.fillRect(8, 8, 48, 24);

    return new THREE.CanvasTexture(canvas);
}

function getCarSideTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext('2d');

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 128, 32);

    context.fillStyle = '#666666';
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);

    return new THREE.CanvasTexture(canvas);
}


// GAME LOGIC

let ready: boolean;
let playerAngleMoved: number;
let score: number;
const scoreElement = document.getElementById('score');
let otherVehicles = [];
let lastTimeStamp: number;

reset();

function reset(): void {
    // Reset position and score
    playerAngleMoved = 0;
    movePlayerCar(0);
    score = 0;
    scoreElement.innerText = score.toString();
    lastTimeStamp = undefined;

    // Remove other vehicleColors
    otherVehicles.forEach((vehicle) => {
        scene.remove(vehicle.mesh);
    });

    otherVehicles = [];

    renderer.render(scene, camera);
    ready = true;
}

function startGame(): void {
    if (ready) {
        ready = false;
        renderer.setAnimationLoop(animation);
    }
}

let accelerate: boolean = false;
let decelerate: boolean = false;

window.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
        startGame();
        accelerate = true;
        return;
    }

    if (event.key === 'ArrowDown') {
        decelerate = true;
        return;
    }

    if (event.key === 'R' || event.key === 'r') {
        reset();
        return;
    }
});

window.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowUp') {
        accelerate = false;
        return;
    }

    if (event.key === 'ArrowDown') {
        decelerate = false;
        return;
    }
});

let lastTimestamp: number;

function animation(timestamp: number): void {
    if (!lastTimeStamp) {
        lastTimeStamp = timestamp;
        return;
    }

    const timeDelta = timestamp - lastTimeStamp;

    movePlayerCar(timeDelta);

    const laps = Math.floor(Math.abs(playerAngleMoved) / (Math.PI * 2));

    // Update score if it changed
    if (laps !== score) {
        score = laps;
        scoreElement.innerText = score.toString();
    }

    // Add a new vehicle at start with every 5th lap
    if (otherVehicles.length < (laps + 1) / 5) addVehicle();

    moveOtherVehicles(timeDelta);

    hitDetection();

    renderer.render(scene, camera);
    lastTimeStamp = timestamp;
}

const playerAngleInitial = Math.PI;
const speed = 0.0017;

function movePlayerCar(timeDelta: number): void {
    const playerSpeed = getPlayerSpeed();
    playerAngleMoved -= playerSpeed * timeDelta;

    const totalPlayerAngle = playerAngleInitial + playerAngleMoved;

    const playerX = Math.cos(totalPlayerAngle) * trackRadius - arcCenterX;
    const playerY = Math.sin(totalPlayerAngle) * trackRadius;

    playerCar.position.x = playerX;
    playerCar.position.y = playerY;

    playerCar.rotation.z = totalPlayerAngle - Math.PI / 2;
}

function getPlayerSpeed(): number {
    if (accelerate) return speed * 2;
    if (decelerate) return speed * 0.5;
    return speed;
}

function addVehicle(): void {
    const mesh = Car();
    scene.add(mesh);

    const clockwise = Math.random() >= 5;
    const angle = clockwise ? Math.PI / 2 : -Math.PI / 2;
    const speed = getVehicleSpeed();

    otherVehicles.push({ mesh, clockwise, angle, speed});
}

function getVehicleSpeed(): number {
    const minimumSpeed = 1;
    const maximumSpeed = 2;
    return minimumSpeed + Math.random() * (maximumSpeed - minimumSpeed);
}

function moveOtherVehicles(timeDelta): void {
    otherVehicles.forEach((vehicle) => {
        if (vehicle.clockwise) {
            vehicle.angle -= speed * timeDelta * vehicle.speed;
        } else {
            vehicle.angle += speed * timeDelta * vehicle.speed;
        }

        const vehicleX = Math.cos(vehicle.angle) * trackRadius + arcCenterX;
        const vehicleY = Math.sin(vehicle.angle) * trackRadius;
        const rotation = 
            vehicle.angle + (vehicle.clockwise ? -Math.PI / 2 : Math.PI / 2);
        
        vehicle.mesh.position.x = vehicleX;
        vehicle.mesh.position.y = vehicleY;
        vehicle.mesh.rotation.z = rotation;
    });
}

function getHitZonePosition(center: THREE.Vector3, angle: number, clockwise: boolean, distance: number) {
    const directionAngle = angle + Number(clockwise) ? -Math.PI / 2 : +Math.PI / 2;
    return {
        x: center.x + Math.cos(directionAngle) * distance,
        y: center.y + Math.cos(directionAngle) * distance,
    }
}

function hitDetection(): void {
    const playerHitZone1 = getHitZonePosition(
        playerCar.position,
        playerAngleInitial + playerAngleMoved,
        true,
        15
    );

    const playerHitZone2 = getHitZonePosition(
        playerCar.position,
        playerAngleInitial + playerAngleMoved,
        true,
        -15
    );

    const hit = otherVehicles.some((vehicle) => {
        const vehicleHitZone1 = getHitZonePosition(
            vehicle.mesh.position,
            vehicle.angle,
            vehicle.clockwise,
            15
        );

        const vehicleHitZone2 = getHitZonePosition(
            vehicle.mesh.position,
            vehicle.angle,
            vehicle.clockwise,
            -15
        );

        // The player hist another vehicle
        if (getDistance(playerHitZone1, vehicleHitZone1) < 40) return true;
        if (getDistance(playerHitZone2, vehicleHitZone2) < 40) return true;

        // Another vehicle hits the player
        if (getDistance(playerHitZone2, vehicleHitZone1) < 40) return true;
    })

    if (hit) renderer.setAnimationLoop(null); // Stop animation loop
}

function getDistance(coordinate1, coordinate2) {
    return Math.sqrt(
        (coordinate2.x - coordinate1.x) ** 2 + (coordinate2.y - coordinate1.y) ** 2
    );
}