require('dotenv').config();
const path = require('path')
const caller = require('grpc-caller')

//setup assertion library
var chai = require('chai')

var expect = chai.expect

//define proto file location and port# of Service running locally inside K8s cluster
const PROTO_PATH = path.resolve(process.env.PROTO_DIR + 'segmentService.proto')
const LOCALHOST = process.env.LOCALHOST

//define client
const client = caller(LOCALHOST, PROTO_PATH, 'SegmentService')

describe('Segment Service', () => {

  /* before('Pull latest Proto Files from BitBucket', (done) => {

    done()
  }); */


  it('GET  /getSegmentById', async () => {
    return client.getSegmentById({ segmentContext: { orgId: '37c9ad00-855b-4882-b33a-f3d9340aa4de', spaceId: '1f78da01-b1ac-4ac3-8952-bd646c1fbe6e', segmentId: '0rvl39E' } })
      .then((response) => {
        expect(response).to.be.an('object')
        expect(Object(response).title).to.deep.equal('MY-SEGMENT')
        expect(Object(response).tagline).to.deep.equal('my tagline')
      })
  })

})
