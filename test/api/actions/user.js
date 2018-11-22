import { path, caller } from '../common';

const PROTO_PATH = path.resolve(process.env.USER_PROTO_DIR + 'spaceUserService.proto');
const client = caller(process.env.USER_HOST, PROTO_PATH, 'spaceUserService');

export function listSpaceUsers(reponseObject) {
  const req = new client.Request('listSpaceUsers', {
    spaceId: '82e166fa3-a1ce-40f1-9f4b-865d00164587',
    keyword: 'a',
    limit: 3
  }).withResponseStatus(true);

  return req.exec()
}