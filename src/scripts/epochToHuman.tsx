function epochToHuman(epoch: number){
    return new Date(epoch*1000);
}

export default epochToHuman;