class CombatUI{
    constructor(_scene,entityManager){
        this.scene =_scene
        this.UIcontroler = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("Entity holder",false,this.scene)
        this.plyParty = entityManager.players;
        this.oppParty = entityManager.enimes;
        this.plyTimer;
        this.oppTimer;
        this.damScore;
    }
   ButtonMaker = (name)=>{
        let button = new BABYLON.GUI.Button(name)
            button.widthInPixels = 50
            button.heightInPixels = 25
            button.background = "green"
            button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
        UI.addControl(button)
        return button
    }
    GameOverUI =(win)=>{
        let fixedUI =new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("Entity holder",true,this.scene)
        let text = new BABYLON.GUI.TextBlock("Game over Text")
        text.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
        text.topInPixels = 50
        text.fontSizeInPixels = 100
        fixedUI.addControl(text)
        if (win === true) {
            text.text = "Clear Victory!!!"
        }
        else{
            text.text = "Defeated..."
        }
    }
   initializeCombatUI = ()=>{
let hud = new BABYLON.GUI.Rectangle("Hud menu");
    hud.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    hud.width = 1;
    hud.height =0.5;
    hud.background = "#56AF7A";
    this.UIcontroler.addControl(hud);

let scoreBox = new BABYLON.GUI.Ellipse("damage score container");
    scoreBox.width = "200px";
    scoreBox.height = "200px";
    scoreBox.background = "white";
    scoreBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    scoreBox.paddingTopInPixels = 10;
    hud.addControl(scoreBox);

let damageScore = new BABYLON.GUI.TextBlock("damage score","0");
    damageScore.fontSize = 30;
    damageScore.textVerticalAlignment =BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    damageScore.topInPixels = 20;
    this.damScore = damageScore;
    scoreBox.addControl(damageScore);

let playerTimerText = new BABYLON.GUI.TextBlock("P TimerText","0");
    playerTimerText.fontSize = 30;
    playerTimerText.textVerticalAlignment =BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    playerTimerText.textHorizontalAlignment=BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    playerTimerText.paddingLeftInPixels =25
let playerTimerContainer = new BABYLON.GUI.Rectangle("Player time container");
    playerTimerContainer.width = "75px";
    playerTimerContainer.height = "50px";
    playerTimerContainer.background = "white";
    playerTimerContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    playerTimerContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    playerTimerContainer.leftInPixels = 230
    playerTimerContainer.topInPixels = -60
    playerTimerContainer.cornerRadius = 25
    hud.addControl(playerTimerContainer);
    playerTimerContainer.addControl(playerTimerText);
    this.plyTimer = playerTimerText;

let playerStack = new BABYLON.GUI.StackPanel("Player party");
    playerStack.width = "250px";
    playerStack.height = 0.75;
    playerStack.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    playerStack.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    playerStack.paddingLeftInPixels = 25;
    playerStack.background = "grey";
    hud.addControl(playerStack);
    this.plyParty = playerStack;

let opponeTimerText = new BABYLON.GUI.TextBlock("P TimerText","0");
    opponeTimerText.fontSize = 30;
    opponeTimerText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    opponeTimerText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    opponeTimerText.paddingLeftInPixels =-20
let opponeTimerContainer = new BABYLON.GUI.Rectangle("opponent time container");
    opponeTimerContainer.width = "75px";
    opponeTimerContainer.height = "50px";
    opponeTimerContainer.background = "white";
    opponeTimerContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    opponeTimerContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    opponeTimerContainer.leftInPixels = -230
    opponeTimerContainer.topInPixels = -60
    opponeTimerContainer.cornerRadius = 25
    hud.addControl(opponeTimerContainer);
    opponeTimerContainer.addControl(opponeTimerText);
    this.oppTimer = opponeTimerText;

let opponetStack = new BABYLON.GUI.StackPanel("Player party");
    opponetStack.width = "250px";
    opponetStack.height = 0.75;
    opponetStack.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    opponetStack.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    opponetStack.paddingRightInPixels = 25;
    opponetStack.background = "grey";
    hud.addControl(opponetStack);
    opponeTimerContainer.parent = opponetStack;
    this.oppParty = opponetStack;
    }
    attachPlayerToUI = (player)=>{
         this.plyTimer = player.actionTimer;
    }
}
module.exports = CombatUI