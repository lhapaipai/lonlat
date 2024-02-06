<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\DataFixtures\Factory\UserFactory;
use App\Tests\Api\Trait\SecurityTrait;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class AuthentificationTest extends ApiTestCase
{
    use ResetDatabase;
    use Factories;
    use SecurityTrait;

    public function testCanAuthenticateSuccessfullyWithJWT(): void
    {
        $user = UserFactory::createOne([
            'plainPassword' => 's3cr3t',
        ]);
        static::ensureKernelShutdown();

        $client = static::createClient();
        $client->request('POST', '/login', [
            'json' => [
                'username' => $user->getUserIdentifier(),
                'password' => 's3cr3t',
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);
        $this->assertMatchesJsonSchema([
            '$schema' => 'https://json-schema.org/draft-07/schema#',
            'type' => 'object',
            'additionalProperties' => false,
            'properties' => [
                'token' => [
                    'type' => 'string',
                ],
            ],
        ]);
    }

    public function testCanAuthenticateSuccessfullyWithEmailOrUsername(): void
    {
        $this->markTestSkipped('hugues@pentatrion.com HuGuEs@etc.fr lhapaipai');
    }
}
