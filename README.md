<p align="center">
      <img src="https://i.ibb.co/F5rJzH8/2024-03-04-073913638.png" alt="2024-03-04-073913638" border="0">
</p>

<p align="center">
      <img src="https://img.shields.io/badge/React_Version-18.2.0-blueviolet" alt="React Version">
      <img src="https://img.shields.io/badge/Project_Version-v1.0_(alpha)-blue" alt="Project Version">
      <img src="https://img.shields.io/badge/License-MIT-success" alt="License">
</p>

## About

This project allows you to look at the simulation of softbody, and nothing more

## Documentation

### Point:

- **-** **`constructor(x: number, y: number)`** - Create new Point object with coordinates - (x, y).

### Collosion:

- **-** **`constructor(points: Point[], elsticity: number = 0)`** - Create new Collision object from points.

### Particles:

- **-** **`constructor([x: number, y: number], mass: number, radius: number)`** - Create new Particle object with coordinates - (x, y), mass - "mass" and radius - "radius".

### Softbody:

- **-** **`constructor(particles: Particle[], connects: {a: number, b: number}[], stiffness: number)`** - Create new Softbody object consisting of connected particles. The "connections" array shows which particles are connected to each other. Stiffness shows how strong the bond between the particles is.

### Hooks:

- **-** **`useSoftbody(softbody: Softbody, collisions: Collision[])`** - Hook that returning [particlesCoordinate, springsCoordinate] and updating softbody position each frame.

### Components:

- **-** **`<ParticleComponent particle: {x: number, y: number, r: number} height: number/>`** - Drawing Particle on canvas. Set particle from field particleComponents of softbody hook. Set height of canvas in height.
- **-** **`<SpringComponent spring: {a: Point, b: Point} height: number/>`** - Drawing connection in softbody on canvas. Set spring from springsComponents of softbody hook. Set height of canvas in height.
- **-** **`<SpringComponent collision: Collision height: number/>`** - Drawing collision on canvas. Set collision from object. Set height of canvas in height.

## Developers

- [skubivi](https://github.com/skubivi)

## License

Project skubivi.softbody is distributed under the MIT license.
