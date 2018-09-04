const gitPullOrClone = require('git-pull-or-clone')

gitPullOrClone('git@github.com:feross/standard.git', '/Users/abhi/Documents/qa-automaton/test/grpc/src', (err) => {
  if (err) throw err
  console.log('SUCCESS!')
})