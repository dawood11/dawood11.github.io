import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJSCanvas = ({ bvbs }) => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!bvbs) return;

    // Dispose of any existing renderer and context
    if (rendererRef.current) {
      rendererRef.current.dispose();
      canvasRef.current.innerHTML = '';  // Clear the canvas content
    }

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -150, 150, 100, -100, 1, 1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(300, 200);  // Adjust as needed
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create material and geometry
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const points = [];

    // Parse BVBS data and convert to 2D points
    const parsedBVBS = parseBVBS(bvbs);
    const length1 = parseInt(parsedBVBS.G.slice(1)) || 0;
    const angle1 = parseInt(parsedBVBS.w) || 0;
    const length2 = parseInt(parsedBVBS.l) || 0;

    // Add points for the 2D shape
    points.push(new THREE.Vector2(0, 0)); // Starting point
    points.push(new THREE.Vector2(length1, 0)); // First segment
    const x2 = length1 + length2 * Math.cos((angle1 * Math.PI) / 180);
    const y2 = -length2 * Math.sin((angle1 * Math.PI) / 180);
    points.push(new THREE.Vector2(x2, y2)); // Second segment

    // Create the geometry and the line
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);

    // Add the line to the scene
    scene.add(line);

    // Adjust camera position
    camera.position.z = 500;

    // Render the scene
    const animate = () => {
      renderer.render(scene, camera);
    };
    animate();

    // Clean up on component unmount or when a new BVBS string is provided
    return () => {
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [bvbs]);

  const parseBVBS = (bvbsString) => {
    const segments = bvbsString.split('@');
    const data = {};
    segments.forEach(segment => {
      const key = segment[0];
      const value = segment.slice(1);
      data[key] = value;
    });
    return data;
  };

  return <div ref={canvasRef} />;
};

ThreeJSCanvas.propTypes = {
  bvbs: PropTypes.string.isRequired,
};

export default ThreeJSCanvas;
