<?php

require '/home/vagrant/grpc/examples/php/vendor/autoload.php';
require dirname(__FILE__) . '/person.php';

$client = new person\SearchClient('localhost:50051', [
	'credentials' => Grpc\ChannelCredentials::createInsecure()
]);

$searchRequest = new person\SearchRequest();
$searchRequest->setName('Brian');

list($searchResponses, $status) = $client->SearchPerson($searchRequest)->wait();

foreach ($searchResponses as $response) {
	foreach ($response as $person) {
		print_r($person);
	}
}
