function countAge(birthYear, MovieYear) {
  let totalAge = MovieYear - birthYear
  return `${totalAge} Years old`
}

module.exports = countAge