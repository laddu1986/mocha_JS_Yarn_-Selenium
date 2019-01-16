const { execSync } = require('child_process');
const { removeSync, ensureDirSync, copySync } = require('fs-extra');

removeSync('tmp');
updateProtos('user', 'git@bitbucket.org:appcurator/user.git', '/api/protos');
updateProtos('segrules', 'git@bitbucket.org:appcurator/segment-rules.git', '/api/protos');
updateProtos('experience', 'git@bitbucket.org:appcurator/experience.git', '/spec/v1');
removeSync('tmp');

function updateProtos(serviceName, gitUrl, protoPath, branchName) {
  const target = `tmp/${serviceName}`;
  const dest = `proto/${serviceName}`;
  removeSync(dest);
  execSync(`git clone ${gitUrl} ${target}`);
  if (branchName) execSync(`cd ${target} && git checkout ${branchName} && cd ../../`);
  ensureDirSync(dest);
  copySync(`${target}${protoPath}`, dest);
}
