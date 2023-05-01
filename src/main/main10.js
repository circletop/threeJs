import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//导入动画库
import gsap from 'gsap'
// 导入dat.gui
import * as dat from 'dat.gui'
const gui = new dat.GUI()


// 目标：利用gui 进行开发调试
// 说明： 适用gui 来改变cube 属性的时候需要先关闭动画，和右键监听，否者不生效

// 场景window.innerWidth / window.innerHeight
const scene = new THREE.Scene()

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加物体
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#3366ff' })
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(geometry, material)
// 修改物体的位置
// cube.position.set(2, 3, 4)
cube.position.x = 0
// 旋转log
// cube.rotation.x = Math.PI / 3

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
// 设置控制器阻尼，让动画更真实
controls.enableDamping = true
controls.update()

// 添加坐标轴辅助器 
const axesHelper = new THREE.AxesHelper(6)

scene.add(axesHelper)

// 设置动画
const animation = () => {
  return gsap.to(cube.position, {
    x: 5,
    duration: 10,
    ease: 'power2.inOut',
    repeat: -1,
    yoyo: true,
    onStart: () => {
      console.log('动画开始了');
    },
    onComplete: () => {
      console.log('结束了');
    }
  })

}
// gsap.to(cube.rotation, { x: Math.PI, duration: 10 })
// document.addEventListener('dblclick', () => {
//   if (animation.isActive()) {
//     animation.pause()
//   } else {
//     animation.resume()
//   }
// })

// 监听移动
gui.add(cube.position, 'x', 0.1, 5, 0.1).name('x轴').onChange((value) => {
  console.log('change:' + value);
})
// 监听颜色
const params = {
  color: '#3366ff',
  fn: animation
}
gui.addColor(params, 'color').onChange((value) => {
  cube.material.color.set(value)
})
// 添加事件
gui.add(params, 'fn')
// 添加文件夹
const folder = gui.addFolder('文件夹')
folder.add(cube.material, 'wireframe')

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