<?php

namespace App\State\Processor;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final readonly class UserPasswordHasherProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire('@api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $processor,
        private UserPasswordHasherInterface $passwordHasher
    ) {
    }

    public function process(mixed $user, Operation $operation, array $uriVariables = [], array $context = [])
    {
        assert($user instanceof User);

        if (null === $user->plainPassword) {
            return $this->processor->process($user, $operation, $uriVariables, $context);
        }

        $user->setPassword(
            $this->passwordHasher->hashPassword($user, $user->plainPassword)
        );

        $user->eraseCredentials();

        return $this->processor->process($user, $operation, $uriVariables, $context);
    }
}
