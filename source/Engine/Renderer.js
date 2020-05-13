import { Scene, PerspectiveCamera, WebGLRenderer, Color, FogExp2, HemisphereLight, DirectionalLight, AmbientLight, } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GameObject from './GameObject'

export default class Renderer extends GameObject {
  constructor(parent, args) {
    super(parent)

    this.scene = new Scene()
    this.scene.background = new Color( 0xcfcfcf )
    this.scene.fog = new FogExp2( 0xffffff, 0.00015 )

    this.ambientLight = new AmbientLight(0xFFFFFF, 2)
    this.scene.add(this.ambientLight)

    this.camera = new PerspectiveCamera(75, window.innerWidth, window.innerHeight, 0.1, 1000)
    this.camera.position.set(200, 200, 200)

    this.renderer = new WebGLRenderer({
      preserveDrawingBuffer: true,
      antialias: true,
    })
    this.renderer.physicallyCorrectLights = true

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.screenSpacePanning = false
    this.controls.minDistance = 0
    this.controls.maxDistance = 1000000000
    this.controls.maxPolarAngle = Math.PI / 2

    document.body.appendChild(this.renderer.domElement)
  }

  adjustCanvasSize() {
    if (this.renderer.domElement.clientWidth !== this.renderer.domElement.width || this.renderer.domElement.clientHeight !== this.renderer.domElement.height) {
      this.renderer.setSize(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight, false)
      this.camera.aspect = this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight
      this.camera.updateProjectionMatrix()
    }
  }

  onDispose() {
    this.renderer.dispose()
  }

  onUpdate(deltaTime) {
    this.adjustCanvasSize()
  }

  onRender(deltaTime) {
    this.renderer.render(this.scene, this.camera)
  }
}