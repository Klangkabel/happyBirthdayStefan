import { useMatcapTexture, Center, Text3D, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()
const donutMaterial = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true })

export default function Experience()
{
    const donuts = useRef([])

    const [ matcapTexture ] = useMatcapTexture('331A0B_B17038_7D4E28_5B351A', 256)

    useFrame((state, delta) =>
    {
        for(const donut of donuts.current)
        {
            donut.rotation.y += delta * 0.2
        }
    })

    useEffect(() =>
    {
        matcapTexture.colorSpace = THREE.SRGBColorSpace
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])

    return <>

        <OrbitControls makeDefault />

        <Center>
            <Text3D
                material={ material }
                font="./fonts/helvetiker_regular.typeface.json"
                size={ 0.5 }
                height={ 0.2 }
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.02 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
            >
                Happy Birthday Stefan!
            </Text3D>
        </Center>

        { [...Array(100)].map((value, index) =>
            <mesh
                ref={ (element) => donuts.current[index] = element }
                key={ index }
                geometry={ torusGeometry }
                material={ donutMaterial }
                position={ [
                    (Math.random() - 0.5) * 11,
                    (Math.random() - 0.5) * 11,
                    (Math.random() - 0.5) * 12
                ] }
                scale={ 0.1 + Math.random() * 0.2 }
                rotation={ [
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ] }
            />
        ) }

    </>
}