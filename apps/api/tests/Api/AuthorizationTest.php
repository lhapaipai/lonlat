<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\DataFixtures\Factory\UserFactory;
use App\Tests\Api\Trait\SecurityTrait;
use Symfony\Component\HttpFoundation\Response;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class AuthorizationTest extends ApiTestCase
{
    use ResetDatabase;
    use Factories;
    use SecurityTrait;

    public function testAnonymousUserHaveNotAccessAdminZone(): void
    {
        $client = static::createClient();
        $client->request('GET', '/admin/users');

        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
    }

    public function testSimpleUserHaveNotAccessAdminZone(): void
    {
        $user = UserFactory::createOne([
            'roles' => [],
        ]);
        static::ensureKernelShutdown();

        $client = $this->createAuthenticatedClient($user);
        $client->request('GET', '/admin/users');

        $this->assertResponseStatusCodeSame(Response::HTTP_FORBIDDEN);
    }

    public function testAdminUserHaveAccessAdminZone(): void
    {
        $user = UserFactory::createOne([
            'roles' => ['ROLE_ADMIN'],
        ]);
        static::ensureKernelShutdown();

        $client = $this->createAuthenticatedClient($user);
        $client->request('GET', '/admin/users');

        $this->assertResponseStatusCodeSame(200);
    }
}
