import * as THREE from 'three'
import stats from 'stats.js'
import initOrbitControls from 'three-orbit-controls'
import OBJLoader from 'three-obj-loader'

OBJLoader(THREE)
const OrbitControls = initOrbitControls(THREE)
const {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  DirectionalLight,
  Color,
  Vector3,
  Raycaster,
  TextureLoader,
  MeshBasicMaterial,
  BackSide,
  Mesh,
  CubeGeometry,
  MeshFaceMaterial,
  DoubleSide,
  JSONLoader,
  Group,
  Geometry,
  PointsMaterial,
  AddEquation,
  Points,
  Vector2,
  MeshLambertMaterial,
  LensFlare,
  AdditiveBlending,
  ShaderMaterial,
} = THREE

export default class SimpleDemo {
  constructor(options) {
    const defaultOptions = {
      width: window.innerWidth,
      height: window.innerHeight,
      element: document.body,
      pixelRatio: window.devicePixelRatio,
      debugMode: false
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.animate = this.animate.bind(this)
    this.initThreejs()
    this.initSence()
    this.initCamera()
    this.initLight()
    this.initSeat()
    this.initControl()
    this.animate()
    this.render()
  }
  initThreejs() {
    const renderer = this.renderer = new WebGLRenderer({alpha: true, antialias: true})
    renderer.setSize(this.options.width, this.options.height)
    renderer.setPixelRatio(this.options.pixelRatio)
    this.options.element.appendChild && this.options.element.appendChild(renderer.domElement)
  }
  initSence() {
    const scene = this.scene = new Scene()
    scene.background = new Color(0x333333)
  }

  initCamera() {
    const camera = this.camera = new PerspectiveCamera(70, this.options.width/this.options.height, 1, 10000)
    camera.position.set(0, 50, 50)
    camera.lookAt(new Vector3(0, 0, 0))
    this.scene.add(camera)
  }


  initLight() {
    const light = this.light = new DirectionalLight()
    light.position.set(0, 20, 20)
    this.camera.add(light)
  }

  initSeat() {
    const loader = new THREE.OBJLoader()
    loader.load('assets/chair.obj', obj => {
      obj.traverse(child=> {
        if (child instanceof Mesh) {
          child.material.side = THREE.DoubleSide
          this.scene.add(obj)
        }
      })
    })
  }

  initControl() {
    const controls = this.controls = new OrbitControls(this.camera)
    controls.maxPolarAngle = 1.5
    controls.minPolarAngle = 0.5
    controls.rotateSpeed = 5.0
    controls.zoomSpeed = 5
    controls.panSpeed = 2
    controls.onZoom = false
    controls.noPan = false
    controls.staticMoving = true
    controls.dynamicDampingFactor = 0.3
    controls.minDistance = 10
    controls.maxDistance = 800
  }

  animate() {
    window.requestAnimationFrame(this.animate)
    this.controls.update()
    this.render()
  }


  render() {
    this.renderer.render(this.scene, this.camera)
  }
}