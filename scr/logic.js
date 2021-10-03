let gridConfig = require("./gridConfig.json")

/**
 * Chanages the color of the numbers depending on their value
 * @param {*} set The arry of items in the grid
 */
let colorChange = (set)=>{
    set.map(tile => {
         const tileNum = parseInt(tile.content.text)

         tileNum === 0 ? tile.content.color = "white": tileNum <= 4  ? tile.content.color = "#26D50B":
         tileNum <= 16 ? tile.content.color = "#8FD50B": tileNum <= 64 ? tile.content.color = "#DCC11C":
         tileNum <= 256? tile.content.color = "#DC871C": tile.content.color = "#EE0A0A"
    })
}
/**
 * Divides an array into arrays of a fixed size
 * @param {*} array The arry of items in the grid
 * @param {*} divider The max size of the grid
 */
let rowSet = (array,divider = 2)=>{
    let newbox = []
    for (let i = 0; i < array.length/divider; i++) {
        newbox.push(array.slice(i*divider,(i+1)*divider))
    }
     
     return newbox
}
/**
 * Divides an array into arrays of a fixed size that coain every x value of max size
 * @param {*} array The arry of items in the grid
 * @param {*} divider The max size of the grid
 */
let colomSet = (array,div =2)=>{
    let grid = []
    let colom =[]
    let width = Math.floor(array.length/div)
    let piller = (mod =0)=>{
        for (let i = mod; i < array.length; i=i+width) {
            if (i !== (width*width)) {
            colom.push(array[i])
         }
    }
    grid.push(colom)
    colom=[]
}
for (let i = 0; i < width; i++) {
    piller(i)

}

    return grid
}
/**
 * Sets an emty space to a number 
 * @param {*} array The arry of items in the grid
 * @param {*} Value The number add to grid
 */
let randomNumPostion =(set,value = gridConfig.staringValue)=> {
     if(set.map(tile => parseInt(tile.content.text) >= value)
    .filter(tile => tile === false).length === 0){
        return
    }

    let randomTile = Math.round(Math.random()*(set.length-1))
    if (parseInt(set[randomTile].content.text) === 0) 
    {
    set[randomTile].content.text = `${value}`
    return
    }else {randomNumPostion(set,value)
}
} 

module.exports =  {colorChange,colomSet,rowSet,randomNumPostion}