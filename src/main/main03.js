import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 设置3D午评的位置和缩放

// 场景
const scene = new THREE.Scene()

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加物体
const geometry = new THREE.BoxGeometry(2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: '#3366ff' })
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(geometry, material)
// 修改物体的位置
// cube.position.set(2, 3, 4)
cube.position.x = 0
// 缩放
cube.scale.set(3, 2, 1)
scene.add(cube)

// 初始化渲染器
const render = new THREE.WebGL1Renderer({ antialias: true })
// 设置渲染的尺寸和大小
render.setSize(window.innerWidth, window.innerHeight)
// 将渲染的canvas内容添加到body上
document.body.append(render.domElement)

// //使用渲染器，通过相机将场景渲染进来
// render.render(scene, camera)

// 创建轨道控制器
const controls = new OrbitControls(camera, render.domElement)
controls.update()

// 添加坐标轴辅助器 
const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)

function animate() {
  cube.position.x += 0.1
  if (cube.position.x > 5) {

    cube.position.x = 0
  }

  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  render.render(scene, camera);

}
animate()
