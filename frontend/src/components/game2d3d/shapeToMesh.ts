import * as THREE from 'three';

export function createExtrudedMesh(points: Array<{ x: number; y: number }>): THREE.Mesh {
  // Normalize points to center them and scale appropriately
  const minX = Math.min(...points.map(p => p.x));
  const maxX = Math.max(...points.map(p => p.x));
  const minY = Math.min(...points.map(p => p.y));
  const maxY = Math.max(...points.map(p => p.y));
  
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const scale = Math.max(maxX - minX, maxY - minY);
  
  // Create shape from points
  const shape = new THREE.Shape();
  
  points.forEach((point, index) => {
    const x = ((point.x - centerX) / scale) * 4;
    const y = -((point.y - centerY) / scale) * 4; // Flip Y axis
    
    if (index === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  });
  
  shape.closePath();
  
  // Extrude settings
  const extrudeSettings = {
    depth: 1.5,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 3,
  };
  
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  
  // Create gradient material
  const material = new THREE.MeshStandardMaterial({
    color: 0xe85d75,
    metalness: 0.3,
    roughness: 0.4,
    flatShading: false,
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  
  // Center the mesh
  geometry.computeBoundingBox();
  const boundingBox = geometry.boundingBox!;
  const center = new THREE.Vector3();
  boundingBox.getCenter(center);
  geometry.translate(-center.x, -center.y, -center.z);
  
  return mesh;
}
