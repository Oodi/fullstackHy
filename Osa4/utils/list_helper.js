const dummy = (blogs) => {
    return 1
  }
  

  
const totalLikes = (blogs) => {
    var likes = 0
    for (x in blogs) {
        likes += blogs[x].likes
    } 
    return likes
}

module.exports = {
    dummy,
    totalLikes
  }