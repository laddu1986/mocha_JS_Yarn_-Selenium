/* const gitPullOrClone = require('git-pull-or-clone')

gitPullOrClone('git@bitbucket.org:appcurator/segment-rules.git', '/Users/abhi/Documents/qa-automaton/test/grpc/src', (err) => {
  if (err) throw err
  console.log('SUCCESS!')
}) */



var gitCloneOrPull = require('git-clone-or-pull');
var path = require('path');
// import  path  from 'path()'
// import  gitCloneOrPull  from 'git-clone-or-pull'

gitCloneOrPull('git@bitbucket.org:appcurator/segment-rules.git', path.join(process.cwd(), '/test/grpc/src/segrules'), function (err) {
  if (err) throw err;
  console.log('SUCCESS !!!')
})

