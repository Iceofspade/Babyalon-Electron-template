let {Scene, Engine } = require("babylonjs")
let  GUI  = require("babylonjs-gui")
let loaders = require("babylonjs-loaders")
let materials = require("babylonjs-materials")

let SceneSwitcher = require("./scene/scenes.js")
window.addEventListener('DOMContentLoaded', function(){
    // get the canvas DOM element
    var canvas = document.getElementById('renderCanvas');

    // load the 3D engine
    var engine = new BABYLON.Engine(canvas, true);

    // createScene function that creates and return the scene
   let Scene = new SceneSwitcher(canvas,engine)
   Scene.Game()
    // call the createScene function
    var currentScene = Scene.scene

    // run the render loop
    engine.runRenderLoop(function(){
        currentScene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
});