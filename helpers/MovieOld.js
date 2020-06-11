function MovieOld(birthyear, releaseyear) {
    const old = releaseyear - birthyear;
    return `${old} years old`;
}
module.exports = MovieOld;