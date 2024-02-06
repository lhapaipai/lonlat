<?php

namespace App\DataFixtures;

use App\DataFixtures\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        UserFactory::createOne([
            'email' => 'hugues@pentatrion.com',
            'username' => 'lhapaipai',
            'firstname' => 'Hugues',
            'lastname' => 'Tavernier',
            'plainPassword' => 'admin',
            'roles' => ['ROLE_ADMIN'],
        ]);

        UserFactory::createOne([
            'email' => 'adam@ondra.com',
            'username' => 'adam',
            'firstname' => 'Adam',
            'lastname' => 'Ondra',
            'plainPassword' => 'user',
            'roles' => [],
        ]);

        UserFactory::createMany(10);
    }
}
