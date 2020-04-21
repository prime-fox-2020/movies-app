function getAgeReleased(movieReleased, castAge) {
    let ageWhenReleased = movieReleased - castAge
    return ageWhenReleased
}
module.exports = getAgeReleased