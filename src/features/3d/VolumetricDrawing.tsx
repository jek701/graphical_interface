import React, {useEffect, useRef, useState} from "react"
import styles from "../../components/style.module.css"
import * as THREE from "three"

interface VolumetricDrawingProps {

}

const VolumetricDrawing: React.FC<VolumetricDrawingProps> = ({}) => {
    const [width, setWidth] = useState(2)
    const [height, setHeight] = useState(2)
    const [depth, setDepth] = useState(2)
    const [cameraZoom, setCameraZoom] = useState(75)
    const ref = useRef<HTMLDivElement>(null)
    const scene = new THREE.Scene()

    const changeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWidth(Number(e.target.value))
    }
    const changeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(Number(e.target.value))
    }
    const changeDepth = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDepth(Number(e.target.value))
    }
    const changeCameraZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCameraZoom(Number(e.target.value))
    }

    const renderer = new THREE.WebGLRenderer({alpha: true})
    renderer.setSize(window.innerWidth * .9, window.innerHeight * .9)
    const camera = new THREE.PerspectiveCamera(cameraZoom, window.innerWidth / window.innerHeight, 1, 100)
    camera.position.z = 5

    useEffect(() => {
        const geometry = new THREE.BoxGeometry(width, height, depth)
        const material = new THREE.MeshBasicMaterial({color: 0xa9a9a9})
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)
        if (ref.current) {
            // Not add but update
            ref.current.innerHTML = ""
            ref.current.appendChild(renderer.domElement)
        }
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, {
            format: THREE.RGBAFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter,
        });

        const cubeCamera = new THREE.CubeCamera(10, 1000, cubeRenderTarget);
        scene.add(cubeCamera);

        // Add wireframe (border) to the object
        const wireframeGeometry = new THREE.WireframeGeometry(geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
        cube.add(wireframe);

        if (ref.current) {
            let isMouseDown = false
            window.addEventListener("mousedown", () => {
                isMouseDown = true
            })
            window.addEventListener("mouseup", () => {
                isMouseDown = false
            })

            window.addEventListener("mousemove", (e) => {
                if (isMouseDown) {
                    cube.rotation.x += e.movementY / 100
                    cube.rotation.y += e.movementX / 100
                    cubeCamera.update(renderer, scene);
                    renderer.render(scene, camera)
                }
            })
        }
        cubeCamera.update(renderer, scene);
        renderer.render(scene, camera)
    }, [width, height, depth, ref, cameraZoom])

    return (
        <div className={styles.container}>
            <div ref={ref}/>
            <div className={styles.inputs}>
                <input type="number" value={width} onChange={changeWidth}/>
                <input type="number" value={height} onChange={changeHeight}/>
                <input type="number" value={depth} onChange={changeDepth}/>
                <input type="number" value={cameraZoom} onChange={changeCameraZoom}/>
            </div>
        </div>
    )
}

export default VolumetricDrawing