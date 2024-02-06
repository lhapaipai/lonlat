<?php

namespace App\Tests\Api\Trait;

use ApiPlatform\Symfony\Bundle\Test\Client;

trait SecurityTrait
{
    /**
     * @param User|Proxy $user
     */
    public function createAuthenticatedClient(mixed $user, $plainPassword = 's3cr3t'): Client
    {
        $client = static::createClient();
        $response = $client->request('POST', '/login', [
            'json' => [
                'username' => $user->getUserIdentifier(),
                'password' => $plainPassword,
            ],
        ]);
        $data = $response->toArray();
        $client->setDefaultOptions([
            'headers' => [
                'Authorization' => 'Bearer '.$data['token'],
            ],
        ]);

        return $client;
    }
}
