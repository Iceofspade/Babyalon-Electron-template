class Unit{
    constructor({_name,_health,_damage,_defence,_blockChance,_actionTimer,_path},_UI,_queue,_scene){
this.scene = _scene;
this.name = _name;
this.health = _health;
this.damage = _damage;
this.defence = _defence;
this.blockChance = _blockChance;
this.actionTimer = _actionTimer;
this.UI =_UI;
this.queue = _queue
this.mesh;
this.isDead = false;
this.unitBars;
this.healthBar;
this.healthText;
this.path= _path
     }

//Load meshes for units
unitMesh = async () => {

    const assetsManager = new BABYLON.AssetsManager(this.scene);
       const meshTask = assetsManager.addMeshTask("unit task", "", "./assets/imports/",this.path);
        meshTask.onSuccess = (task) =>{
            //  console.log(task.loadedMeshes[0].name+" was loaded!")
            //  console.log(task.loadedMeshes[0])
            task.loadedMeshes[0].rotationQuaternion = undefined
             let mesh = task.loadedMeshes[0]
             mesh.name = this.name+" unit"
             this.mesh = mesh
            this.skeleton = task.loadedSkeletons[0]
             
          }
          meshTask.onError =()=>{
              console.log("Mesh not loaded")
          }
   await assetsManager.loadAsync()
    return meshTask
}
deleteUnit = ()=>{
    this.mesh.dispose()
    this.unitBars.dispose()
}

startTimer = ()=>{
let dropper = parseInt(this.timerText.text)
this.interval= setInterval(() => {

    if (this.isPlayer === true) {
            this.UI.plyTimer.text = `${dropper}`
            if (parseInt(this.UI.plyTimer.text) <= 0) {
                dropper = this.actionTimer+1
                this.attack()
                this.UI.damScore.text = "0"
             }
    }
    else{
             this.UI.oppTimer.text = `${dropper}`
            if (parseInt(this.UI.oppTimer.text) <= 0) {
                 dropper = this.actionTimer+1
                 this.attack()
                }
     }
     dropper--

}, 1000);
}
stopTimer = ()=>{
    clearInterval(this.interval)
}
//sets up units to be either  player or enemy
createUnit = async () => {
    let teamColor;
    let teamSide;
    let outwardSide;
    let inwardSide;
    let teamPos;
    let teamRota
    if (this.isPlayer === true )
   {teamColor = "green",
   outwardSide = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
   inwardSide = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,    
   this.UI.plyTimer.text = `${this.actionTimer}`,
   teamPos = new BABYLON.Vector3(-9,13,18),
   teamRota = Math.PI,
   teamSide = this.UI.plyParty
}
   else{
   teamColor = "red",
   outwardSide = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
   inwardSide = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
   teamPos = new BABYLON.Vector3(27,13,18),
   teamRota = Math.PI*2,
   this.UI.oppTimer.text = `${this.actionTimer}`,
   teamSide = this.UI.oppParty
}

await this.unitMesh()

this.health.current = this.health.max
let unitBars = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("bar");
this.unitBars = unitBars
this.skeleton.beginAnimation("Idle",true)
let unitSage = new BABYLON.Mesh.CreateCylinder("Piller",0.5,5,5,5,5,this.scene)
    unitSage.position = teamPos
    unitSage.scaling = new BABYLON.Vector3(3,3,3)
        this.mesh.position = unitSage.getAbsolutePosition()
        this.mesh.scaling = new BABYLON.Vector3(3,3,3)
        this.mesh.position.y = unitSage.getBoundingInfo().boundingBox.maximumWorld.y
        this.mesh.rotation.y = teamRota
//UI section

 console.log(this.skeleton)


//over all container
let unitDisplayContainer  = new BABYLON.GUI.Rectangle("container")
unitDisplayContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
unitDisplayContainer.paddingRightInPixels = 10
unitDisplayContainer.paddingLeftInPixels = 10
unitDisplayContainer.paddingTopInPixels = 10
unitDisplayContainer.background = "#B16600"

unitDisplayContainer.width = 1
unitDisplayContainer.height = "60px"
unitDisplayContainer.thickness = 0
teamSide.addControl(unitDisplayContainer)

//container for health
let innerBarContainer = new BABYLON.GUI.Rectangle("bar")
innerBarContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
innerBarContainer.horizontalAlignment = outwardSide
innerBarContainer.width = 0.8
innerBarContainer.height = 0.4
innerBarContainer.background = "gray"
unitDisplayContainer.addControl(innerBarContainer)

//colored strip
let bar = new BABYLON.GUI.Rectangle("bar")
bar.background = teamColor
bar.thickness = 0
bar.horizontalAlignment = outwardSide
innerBarContainer.addControl(bar)

//bar info
let barText = new BABYLON.GUI.TextBlock("health num",`${this.health.max}/${this.health.current}`)
barText.resizeToFit = true
// barText.horizontalAlignment = outwardSide
innerBarContainer.addControl(barText)
//name of mesh
let textGrid = new BABYLON.GUI.Grid("Text holder")
textGrid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
textGrid.addColumnDefinition(0.75,false)
textGrid.addColumnDefinition(0.25,false)
textGrid.height = 0.5
textGrid.width = 1
unitDisplayContainer.addControl(textGrid)
textGrid.isVertical = false
let unitTextName = new BABYLON.GUI.TextBlock(`${this.name} textName`,`${this.name}`)
unitTextName.resizeToFit = true
unitTextName.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
textGrid.addControl(unitTextName,0,0)

let unitTimerContainer = new BABYLON.GUI.Ellipse("unit Time "+this.name)
unitTimerContainer.widthInPixels = 40
unitTimerContainer.heightInPixels = 40
unitTimerContainer.background = "red"
unitTimerContainer.horizontalAlignment = inwardSide
textGrid.addControl(unitTimerContainer,0,1)

let timerText = new BABYLON.GUI.TextBlock("Timer Text",`${this.actionTimer}`);
timerText.fontSizeInPixels =15
    this.healthBar = bar
    this.healthText = barText
    unitTimerContainer.addControl(timerText)
    this.timerText = timerText
}
}
class PlayerUnit extends Unit{
    constructor({_name,_health,_damage,_defence,_blockChance,_actionTimer,_path},_UI,_queue,scene){
        super({_name,_health,_damage,_defence,_blockChance,_actionTimer,_path},_UI,_queue,scene)
        this.isPlayer = true;
        this.target; 
     }
    attack = async () => {
        this.target = this.queue.playerTarget
        let dam = parseInt(this.UI.damScore.text)-this.defence
        let hp = this.target.health
//Basic animation rigging of cubes
this.skeleton.beginAnimation("Attack",false,1,()=>{
//fight logic   
Math.floor(dam/10) <= 0 ? dam = 2 : dam = Math.floor(dam/10)
hp.current-=dam
hp.current <= 0 ? (hp.current = 0,this.target.isDead =true, this.target.stopTimer()): hp

 this.target.healthText.text =`${hp.max}/${hp.current}`
 this.target.healthBar.width = hp.current/hp.max

 if (this.queue.enimes.filter(unit => unit.isDead === true).length === this.queue.enimes.length) {
    this.queue.stopAllTimers()
    this.UI.GameOverUI(true) 
}
this.skeleton.beginAnimation("Idle",true)
 
})
  
//-------------------------------------------------------------------------------------------------------------------------------------------------


     }
}
class OppentUnit extends Unit{
    constructor({_name,_health,_damage,_defence,_blockChance,_actionTimer,_path},_UI,_queue,scene){
        super({_name,_health,_damage,_defence,_blockChance,_actionTimer,_path},_UI,_queue,scene)
        this.isPlayer = false;
         this.target;
     }
    attack = () => {
    this.target = this.queue.enimeTarget;
    let hp = this.target.health 
    //Basic animation rigging of cubes
    this.skeleton.beginAnimation("Attack",false,1,()=>{
        let dam = (Math.round(Math.random()*(this.damage.max-this.damage.min))+this.damage.min)-this.defence
        hp.current-=dam
        dam <= 0 ? dam = 1 : dam
        hp.current <= 0 ?( hp.current = 0 ,this.target.isDead =true,this.target.stopTimer()): hp   
            
        this.target.healthText.text =`${hp.max}/${hp.current}`
        this.target.healthBar.width = hp.current/hp.max
         if (this.queue.players.filter(unit => unit.isDead === true).length === this.queue.players.length) {
            this.queue.stopAllTimers()
            this.queue.players.filter(unit => unit.isDead === true)
            this.UI.GameOverUI(false) 
        } 
        this.skeleton.beginAnimation("Idle",true)

    })
     }
}
module.exports = {PlayerUnit,OppentUnit}