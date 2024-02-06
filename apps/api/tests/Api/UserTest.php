<?php

namespace App\Tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\DataFixtures\Factory\UserFactory;
use App\Entity\User;
use App\Tests\Api\Trait\SecurityTrait;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class UserTest extends ApiTestCase
{
    use ResetDatabase;
    use Factories;
    use SecurityTrait;

    public function testAuthenticatedUserCanViewHisProfile(): void
    {
        $user1 = UserFactory::createOne()->object();
        $user2 = UserFactory::createOne()->object();
        static::ensureKernelShutdown();

        $client = $this->createAuthenticatedClient($user1);

        $client->request('GET', $this->getIriFromResource($user1));
        $this->assertResponseStatusCodeSame(200);
        $this->assertMatchesResourceItemJsonSchema(User::class);

        $client->request('GET', $this->getIriFromResource($user2));
        $this->assertResponseStatusCodeSame(Response::HTTP_FORBIDDEN);
    }

    public function testAuthenticatedUserCanUpdateHisProfile(): void
    {
        $user1 = UserFactory::createOne([
            'username' => 'john',
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john@domain.tld',
        ])->object();
        $user2 = UserFactory::createOne()->object();

        static::ensureKernelShutdown();

        $client = $this->createAuthenticatedClient($user1);

        $client->request('PATCH', $this->getIriFromResource($user1), [
            'headers' => [
                'Content-Type' => 'application/merge-patch+json',
            ],
            'json' => [
                'username' => 'michel',
                'firstname' => 'Michel',
            ],
        ]);

        $this->assertResponseStatusCodeSame(200);
        $this->assertMatchesResourceItemJsonSchema(User::class);
        $this->assertJsonContains([
            '@id' => "/users/{$user1->getId()}",
            'username' => 'michel',
            'firstname' => 'Michel',
            'lastname' => 'Doe',
            'email' => 'john@domain.tld',
        ]);
    }

    /**
     * @test
     * @expectedException AccessDeniedHttpException
     */
    public function testAuthenticatedUserCantUpdateOthersProfile(): void
    {
        $user1 = UserFactory::createOne()->object();
        $user2 = UserFactory::createOne()->object();

        static::ensureKernelShutdown();

        $client = $this->createAuthenticatedClient($user1);

        $client->request('PATCH', $this->getIriFromResource($user2), [
            'headers' => [
                'Content-Type' => 'application/merge-patch+json',
            ],
            'json' => [],
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_FORBIDDEN);
    }

    public function testAuthenticatedUserMustReconnectAfterUpdateHisIdentifier(): void
    {
        $user = UserFactory::createOne([
            'username' => 'john',
        ])->object();

        static::ensureKernelShutdown();

        $client = $this->createAuthenticatedClient($user);

        $client->request('PATCH', $this->getIriFromResource($user), [
            'headers' => [
                'Content-Type' => 'application/merge-patch+json',
            ],
            'json' => [
                'username' => 'jim',
            ],
        ]);

        $this->assertResponseStatusCodeSame(200);
        $this->assertJsonContains([
            '@id' => "/users/{$user->getId()}",
            'username' => 'jim',
        ]);

        $client->request('GET', $this->getIriFromResource($user));

        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
    }
}
