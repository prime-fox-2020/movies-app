function getAge(birthYear, movieRelease) {
  let age = movieRelease - birthYear
  return `${age} years old`
}

module.exports = getAge