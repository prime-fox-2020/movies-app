function ageWhenReleased(movieYear, actorYear) {
    let count = Math.abs(movieYear - actorYear)
    return count
}

module.exports = ageWhenReleased