let {Controls} = require("../contoles.js");
let {colorChange,colomSet,rowSet,randomNumPostion} = require("../logic.js");
let gridConfig = require("../gridConfig.json")
let {PlayerUnit,OppentUnit} = require("../Units.js")
let monster = require("../units/Monsters.json")
let players = require("../units/Players.json")
let CombatUI = require("../combatUI.js")
let EntityManager  = require("../entityManager.js")
module.exports = class SceneSwitcher{
    constructor(_canvas,_engine){
this.canvas =_canvas;
this.engine =_engine;
this.scene;
    }
    MainMenu = () => {
        // create a basic BJS Scene object
        let scene = new BABYLON.Scene(this.engine);
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        let camera = new BABYLON.ArcRotateCamera("menu cam",0,0,0)
        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // attach the camera to the canvas
        camera.attachControl(this.canvas, false);
    let menuContainer = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("Main meue")
    //main container
    let menuBackground = new BABYLON.GUI.Rectangle("Background")
    menuBackground.width = 1
    menuBackground.height = 1
    menuBackground.background = "#22597E"
    menuContainer.addControl(menuBackground)
    
    //Title
    let GameTitle = new BABYLON.GUI.TextBlock("Title","Bar Keek's coin")
    GameTitle.fontSize = "50px"
    GameTitle.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    menuContainer.addControl(GameTitle)
    
    let buttonContainer = new BABYLON.GUI.StackPanel("Button container")
    buttonContainer.width = "160px"
    buttonContainer.height = "350px"
    buttonContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    menuContainer.addControl(buttonContainer)
    
    let buttonMaker = (name)=> {let buttonshell =  new BABYLON.GUI.Rectangle("Button shell")
    //buttons
    buttonshell.width = "120px"
    buttonshell.height = "40px"
    buttonshell.thickness = 0
    buttonContainer.addControl(buttonshell)
    let button = new BABYLON.GUI.Button(name+" Button")
    button.width = 0.9
    button.height = 0.7
    buttonshell.addControl(button)
    let buttonText = new BABYLON.GUI.TextBlock(name+" text",name)
    button.addControl(buttonText)
    
    return button 
    }
    let start = buttonMaker("Start")
    start.onPointerDownObservable.add( ()=>{
        scene.dispose()  
        this.Game()
    })
    let options = buttonMaker("Options")
    options.onPointerDownObservable.add( ()=>{
        console.log("No function added yet")
    })
    let exit = buttonMaker("Exit")
    exit.onPointerDownObservable.add( ()=>{
    //Closes the entire app
        let window = remote.getCurrentWindow()
        window.close()
    })
    
        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    
        // return the created scene
        this.scene = scene;
    }
    Game = async ()=>{
            // create a basic BJS Scene object
            var scene = new BABYLON.Scene(this.engine);
            // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
            var camera = new BABYLON.UniversalCamera("Main cam",new BABYLON.Vector3(10,12,-40),scene)
            var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

let unitManager = new EntityManager()
let UI = new CombatUI(scene,unitManager)
UI.initializeCombatUI()
//Grid Tiles
let manager = new BABYLON.GUI.GUI3DManager(scene);
let panel =  new BABYLON.GUI.PlanePanel();
panel.rows = gridConfig.rows;
panel.columns = gridConfig.coloms;
manager.addControl(panel)
panel.position = new BABYLON.Vector3(10,0,9)
panel.scaling = new BABYLON.Vector3(3,3,3)
panel.margin = 0.15
 for (var index = 0; index < gridConfig.rows*gridConfig.coloms; index++) {
    panel.blockLayout = true;     
let button = new BABYLON.GUI.Button3D("click me");
    button.scaling = new BABYLON.Vector3(1,2,2)
    panel.addControl(button);
let textBlock = new BABYLON.GUI.TextBlock();
    textBlock.text = `0`;
    textBlock.fontSize = 100;
    button.content = textBlock;
}
 //Spawn starting numbers    
for (let i = 0; i < gridConfig.baseSpawnNum; i++) {
        randomNumPostion(panel.children)
}
colorChange(panel.children)

let player = new PlayerUnit(players,UI,unitManager,scene)
     player.createUnit().then(()=>{
        player.startTimer()
    })
let foe = new OppentUnit(monster,UI,unitManager,scene)
     foe.createUnit().then(()=>{
        foe.startTimer()
    })

 
    unitManager.addUnit(player)
    unitManager.addUnit(foe)
    unitManager.updateTargets()
 
//Controle Movement of tiles
let movement = new Controls(rowSet,colomSet,panel.children,gridConfig.rows,gridConfig.coloms)
//Key press watchers
	scene.onKeyboardObservable.add((kbInfo) => {
		switch (kbInfo.type) {
			case BABYLON.KeyboardEventTypes.KEYDOWN:
				switch (kbInfo.event.key) {
                    case "a":
                    case "A":
                    case "ArrowLeft":
                      if (movement.lockControles === true) 
                        {return} 
                        movement.moveRight()
                        UI.damScore.text= `${parseInt(UI.damScore.text) +movement.horizontalCombind()}`
                        movement.moveRight()
                        randomNumPostion(panel.children)
                        colorChange(panel.children)
                    break
                    case "d":
                    case "D":
                    case "ArrowRight":
                        if (movement.lockControles === true) 
                        {return} 
                        movement.moveLeft()
                        UI.damScore.text = `${parseInt(UI.damScore.text) +movement.horizontalCombind()}`
                        movement.moveLeft()
                        randomNumPostion(panel.children)
                        colorChange(panel.children) 
                    break
                    case "w":
                    case "W":
                    case "ArrowUp":
                        if (movement.lockControles === true) 
                        {return} 
                        movement.moveUp()
                        UI.damScore.text = `${parseInt(UI.damScore.text) +movement.verticalCombind()}`

                        movement.moveUp()
                        randomNumPostion(panel.children)
                        colorChange(panel.children)
                    break
                    case "s":
                    case "S":
                    case "ArrowDown":
                        if (movement.lockControles === true) 
                        {return} 
                        movement.moveDown() 
                        UI.damScore.text = `${parseInt(UI.damScore.text) +movement.verticalCombind()}`
                        movement.moveDown() 
                        randomNumPostion(panel.children)
                        colorChange(panel.children)
                    break
                }
            break;
        }
		})

//Meshes in the scece.
let wall = BABYLON.Mesh.CreateGround('Wall', 140,33,24, scene);
    wall.position = new BABYLON.Vector3(9,30,40);
    wall.rotation.x = Math.PI*1.5
let wallTexture = new BABYLON.StandardMaterial("wall Texture",scene);
    wallTexture.diffuseTexture = new BABYLON.Texture("./assets/img/sky.png");
    wallTexture.emissiveTexture = new BABYLON.Texture("./assets/img/sky.png");
    wall.material = wallTexture

let ground = BABYLON.Mesh.CreateGround('Floor', 140,40,24, scene);
    ground.rotation.x = -0.1
    ground.position = new BABYLON.Vector3(9,13.3,24);

let groundTexture = new BABYLON.StandardMaterial("floor Texture",scene);
    groundTexture.diffuseTexture = new BABYLON.Texture("./assets/img/road.png");
    groundTexture.emissiveTexture = new BABYLON.Texture("./assets/img/road.png");
    ground.material = groundTexture

let gridBackground = BABYLON.Mesh.CreateGround('Grid-Background', 16, 16, 16, scene);
    gridBackground.rotation.x = -Math.PI*0.5;
    gridBackground.position = new BABYLON.Vector3(10,0,9);
    panel.parent = gridBackground;

let floorTexture = new BABYLON.StandardMaterial("Grid-Background Texture",scene);
    floorTexture.diffuseColor = new BABYLON.Color3(38/255, 215/255, 210/255);
    floorTexture.emissiveColor = new BABYLON.Color3(38/255, 215/255, 210/255);
    gridBackground.material = floorTexture;
 
let grid = BABYLON.Mesh.CreateGround('ground1', 16, 16, 16, scene);
    grid.material = new BABYLON.GridMaterial("groundMaterial", scene);
    grid.material.opacity = 0.9
    grid.material.gridRatio = 4
    grid.material.minorUnitVisibility = 1
    grid.position.y = 0.01
    grid.parent = gridBackground
    grid.material.lineColor = new BABYLON.Color3(0,0,0)
            
this.scene = scene;
        
    }
}