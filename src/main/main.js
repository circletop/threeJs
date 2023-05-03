import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 目标：几何体材质及纹理属性

// 场景window.innerWidth / window.innerHeight
const scene = new THREE.Scene()

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(5, 5, 10)
scene.add(camera)

// 导入纹理加载器
const textureLoader = new THREE.TextureLoader()
const girls = textureLoader.load('./imgs/1.jpeg')
// girls.offset.setX(0.5)
// girls.offset.y = 0.5
girls.rotation = Math.PI / 2
girls.center.set(0.5, 0.5)

// 添加几何体
const geometry = new THREE.BoxGeometry(2, 2, 2)
const mesh = new THREE.MeshBasicMaterial({ map: girls })
const cube = new THREE.Mesh(geometry, mesh)
scene.add(cube)


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

// 添加坐标轴辅助器 
const axesHelper = new THREE.AxesHelper(6)

scene.add(axesHelper)


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