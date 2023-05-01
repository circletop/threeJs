import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 目标：利用bufferGeometry 创建炫酷科技感效果

// 场景window.innerWidth / window.innerHeight
const scene = new THREE.Scene()

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加几何体

for (let i = 0; i < 50; i++) {
  const geometry = new THREE.BufferGeometry()
  const positonArr = new Float32Array(18)
  //创建一个三角形需要三个顶点 每个顶点需要三个值

  const arr = [
    -i, -i, i,
    i, -i, i,
    i, i, i,
    i, i, i
    - i, i, i,
    -i, -i, i
  ]
  for (let index = 0; index < arr.length; index++) {
    positonArr[index] = arr[index]
  }

  console.log(positonArr);
  geometry.setAttribute('position', new THREE.BufferAttribute(positonArr, 3))
  let color = new THREE.Color(Math.random(), Math.random(), Math.random())
  const material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.9 })

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh)

}


// 根据几何体和材质创建物体

// 初始化渲染器
const render = new THREE.WebGL1Renderer({ antialias: true })
// 设置渲染的尺寸和大小
render.setSize(window.innerWidth, window.innerHeight)
// 将渲染的canvas内容添加到body上
document.body.append(render.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, render.domElement)
// 设置控制器阻尼，让动画更真实
controls.enableDamping = true
controls.update()

// // 添加坐标轴辅助器 
// const axesHelper = new THREE.AxesHelper(6)

// scene.add(axesHelper)


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render.render(scene, camera);

}
animate()
window.addEventListener('resize', () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像机的投影矩阵
  camera.updateMatrix()
  //更新渲染器
  render.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染比例
  render.setPixelRatio(window.innerWidth / window.innerHeight)
})