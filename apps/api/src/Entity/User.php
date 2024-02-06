<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\UserRepository;
use App\State\Processor\UserPasswordHasherProcessor;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * A person (alive, dead, undead, or fictional).
 *
 * @see https://schema.org/Person
 */
#[ApiResource(
    types: ['https://schema.org/Person'],
    operations: [
        new Get(
            security: 'is_granted("ROLE_USER") and object.getUserIdentifier() === user.getUserIdentifier()'
        ),
        new Post(
            processor: UserPasswordHasherProcessor::class,
            validationContext: [
                'groups' => ['Default', 'User:create'],
            ]
        ),
        new Patch(
            processor: UserPasswordHasherProcessor::class,
            security: 'is_granted("ROLE_USER") and object.getUserIdentifier() === user.getUserIdentifier()'
        ),
        new GetCollection(
            uriTemplate: '/admin/users{._format}',
            itemUriTemplate: '/admin/users/{id}{._format}',
            security: 'is_granted("ROLE_ADMIN")',
        ),
        new Get(
            uriTemplate: '/admin/users/{id}{._format}',
            security: 'is_granted("ROLE_ADMIN")'
        ),
    ],
    normalizationContext: [
        'groups' => ['User:read'],
        'openapi_definition_name' => 'read',
    ],
    denormalizationContext: [
        'groups' => ['User:create', 'User:update'],
        'openapi_definition_name' => 'write',
    ]
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity('email')]
#[UniqueEntity('username')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @see https://schema.org/identifier
     */
    #[ApiProperty(types: ['https://schema.org/identifier'])]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\Id]
    private ?Uuid $id = null;

    /**
     * @see https://schema.org/email
     */
    #[ApiProperty(types: ['https://schema.org/email'])]
    #[Groups(['User:read', 'User:create', 'User:update'])]
    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank]
    public ?string $email = null;

    /**
     * @see https://schema.org/identifier
     */
    #[ApiProperty(types: ['https://schema.org/identifier'])]
    #[Groups(['User:read', 'User:create', 'User:update'])]
    #[ORM\Column]
    #[Assert\NotBlank]
    public ?string $username = null;

    /**
     * @see https://schema.org/givenName
     */
    #[ApiProperty(types: ['https://schema.org/givenName'])]
    #[Groups(['User:read', 'User:create', 'User:update'])]
    #[ORM\Column]
    public ?string $firstname = null;

    /**
     * @see https://schema.org/familyName
     */
    #[ApiProperty(types: ['https://schema.org/familyName'])]
    #[Groups(['User:read', 'User:create', 'User:update'])]
    #[ORM\Column(nullable: true)]
    public ?string $lastname = null;

    #[ORM\Column(type: 'json')]
    public array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[Assert\NotBlank(groups: ['User:create'])]
    #[Groups(['User:create', 'User:update'])]
    public ?string $plainPassword = null;

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function __toString()
    {
        return "{$this->firstname} {$this->lastname}";
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }
}
