import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//导入动画库

import gsap from 'gsap'


// 目标：阻尼，监听画面的变化，同步更新渲染

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
const animation = gsap.to(cube.position, {
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
gsap.to(cube.rotation, { x: Math.PI, duration: 10 })
document.addEventListener('dblclick', () => {
  console.log(animation.isActive(), animation.isActive);

  if (animation.isActive()) {
    animation.pause()
  } else {
    animation.resume()
  }
})

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
