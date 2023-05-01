import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 目标：利用bufferGeometry 创建几何体

// 场景window.innerWidth / window.innerHeight
const scene = new THREE.Scene()

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加几何体
const geometry = new THREE.BufferGeometry()
const vertices = new Float32Array([
  -1.0, -1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, 1.0, 1.0,

  1.0, 1.0, 1.0,
  -1.0, 1.0, 1.0,
  -1.0, -1.0, 1.0

])
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

const material = new THREE.MeshBasicMaterial({ color: '#3366ff' })

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh)

// 根据几何体和材质创建物体

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
// 设置控制器阻尼，让动画更真实
controls.enableDamping = true
controls.update()

// 添加坐标轴辅助器 
const axesHelper = new THREE.AxesHelper(6)

scene.add(axesHelper)


function animate() {

  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
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


// const body = document.querySelector('body')
// const canvas = document.querySelector('canvas')
// canvas.style.position = 'relative'

// document.oncontextmenu = function (event) {
//   // clientX
//   const x = event.clientX
//   const y = event.clientY
//   const button = document.querySelector('button')
//   console.log('鼠标点击');
//   if (!button) {
//     const button = document.createElement('button')
//     button.innerHTML = '全屏'
//     button.style = `position:absolute; top: ${y}px;left: ${x}px;width: 100px;height:32px;lineheight:32px;color:#3366ff;text-align:center;background:#fff;border: 1px solid #3366ff; border-radius: 12px;pointer-events:auto; `
//     button.onclick = function (e) {
//       e.stopPropagation()
//       const full = document.fullscreenElement
//       if (!full) {
//         // 进入全屏
//         document.body.requestFullscreen()
//       } else {
//         document.exitFullscreen()
//       }
//       button.style.display = 'none'
//     }
//     body.appendChild(button)
//   } else {
//     button.style.top = `${y}px`
//     button.style.left = `${x}px`
//     if (button.style.display && button.style.display === 'none') {
//       button.style.display = 'block'
//     } else {
//       button.style.display = 'none'
//     }
//   }
// }