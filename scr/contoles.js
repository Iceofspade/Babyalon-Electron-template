let gridConfig = require("./gridConfig.json")

class Controls{
    constructor(rows,coloms,raw,Rowdiv,colomDiv){
        this.rawSet = raw
        this.rowSet = rows(raw,Rowdiv)
        this.colomSet = coloms(raw,colomDiv)
        this.width = this.colomSet.length
        this.lockControles = false
    }
    horizontalCombind = ()=>{
        let total = 0
        for (let i = 0; i < this.rawSet.length-1; i++) {
             if(this.rawSet[i].content.text === this.rawSet[i+1].content.text){
                let fusedTile = parseInt(this.rawSet[i].content.text) + parseInt(this.rawSet[i+1].content.text)
                this.rawSet[i].content.text = `${fusedTile}`;
                this.rawSet[i+1].content.text = `0`;
                total+=fusedTile;
            }
            
        }
    return total
    }
    verticalCombind = ()=>{
        let total = 0

        for (let i = 0; i < this.rawSet.length-this.width; i++) {
            if(this.rawSet[i].content.text === this.rawSet[i+this.width].content.text){
               let fusedTile = parseInt(this.rawSet[i].content.text) + parseInt(this.rawSet[i+this.width].content.text);
               this.rawSet[i].content.text = `${fusedTile}`;
               this.rawSet[i+this.width].content.text = `0`;
               total+=fusedTile;
           }
       }
       return total

    }
    moveUp =()=>{
        let colomMap = this.colomSet.map(num => num.map(tile => parseInt(tile.content.text)));
        let filteredcolom = colomMap.map(num => num.filter(num => num > 0));
        let zerosOnly = colomMap.map(num => num.filter(num => num === 0));
        let newColom = zerosOnly.map((row,i) => row.concat(filteredcolom[i]));

        for (let i = 0; i < this.width; i++) {
            this.colomSet[i].map((tile,j)=> tile.content.text = `${newColom[i][j]}`);
        }
          
    }
    moveLeft =() => {
 
let rowMap = this.rowSet.map(num => num.map(tile => parseInt(tile.content.text)))
let filteredRow = rowMap.map(num => num.filter(num => num > 0))
 
let zerosOnly = rowMap.map(num => num.filter(num => num === 0))
let newRow = zerosOnly.map((row,i) => row.concat(filteredRow[i]));

for (let i = 0; i < this.width; i++) {
    this.rowSet[i].map((tile,j)=> tile.content.text = `${newRow[i][j]}`)
}

    }
    moveRight = () => {
 
let rowMap = this.rowSet.map(num => num.map(tile => parseInt(tile.content.text)))
let filteredRow = rowMap.map(num => num.filter(num => num > 0))
 
let zerosOnly = rowMap.map(num => num.filter(num => num === 0))
let newRow = zerosOnly.map((row,i) => filteredRow[i].concat(row));

for (let i = 0; i < this.width; i++) {
    this.rowSet[i].map((tile,j)=> tile.content.text = `${newRow[i][j]}`)
}
    }
    moveDown = () => {
        let colomMap = this.colomSet.map(num => num.map(tile => parseInt(tile.content.text)))
        let filteredcolom = colomMap.map(num => num.filter(num => num > 0))
        let zerosOnly = colomMap.map(num => num.filter(num => num === 0))
        let newColom = filteredcolom.map((row,i) => row.concat(zerosOnly[i]))

        for (let i = 0; i < this.width; i++) {
            this.colomSet[i].map((tile,j,arr)=> tile.content.text = `${newColom[i][j]}`);
        }
     }
}

module.exports = {Controls}