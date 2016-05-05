
var PROTO_PATH = __dirname + '/person.proto';

var grpc = require('grpc');
var person_proto = grpc.load(PROTO_PATH).person;

/**
 * Implements the SearchPerson RPC method.
 */
function searchPerson(call, callback) {
  callback(null, {person: [
	  new person_proto.Person({name: 'Brian Morton', id: 34}),
	  new person_proto.Person({name: 'Chris Spruck', id: 36})
  ]});
}

/**
 * Starts an RPC server that receives requests for the Person service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addProtoService(person_proto.Search.service, {searchPerson: searchPerson});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
