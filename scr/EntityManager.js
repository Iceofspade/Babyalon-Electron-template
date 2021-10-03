class EntityManager {
    constructor(){
this.players =[]
this.enimes =[]
    }
addUnit=(unit)=>{
    unit.isPlayer === true ?
    this.players.push(unit):
    this.enimes.push(unit)
}
getActivePlayer = ()=>{
    return this.players[0]
}
getActiveEnimes = ()=>{
    return this.enimes[0]
}
updateTargets = ()=>{
    this.playerTarget = this.getActiveEnimes()
    this.enimeTarget = this.getActivePlayer()
}
stopAllTimers = ()=>{
    this.getActivePlayer().stopTimer()
    this.getActiveEnimes().stopTimer()
}
}

module.exports = EntityManager