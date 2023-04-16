import * as THREE from 'three'
import { Camera } from 'three'

// 场景
const scene = new THREE.Scene()

// 相机
const comera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
comera.position.set(0, 0, 10)
scene.add(comera)

// 添加物体
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#3366ff' })
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// 初始化渲染器
const render = new THREE.WebGL1Renderer()
// 设置渲染的尺寸和大小
render.setSize(window.innerWidth, window.innerHeight)
// 将渲染的canvas内容添加到body上
document.body.append(render.domElement)

//使用渲染器，通过相机将场景渲染进来
render.render(scene, comera)
