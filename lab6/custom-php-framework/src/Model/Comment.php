<?php

namespace App\Model;

use PDO;

class Comment
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function findAll(): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM comment');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function find(int $id): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM comment WHERE id = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create(array $data): void
    {
        $stmt = $this->pdo->prepare('INSERT INTO comment (post_id, author, content) VALUES (:post_id, :author, :content)');
        $stmt->execute([
            ':post_id' => $data['post_id'],
            ':author' => $data['author'],
            ':content' => $data['content']
        ]);
    }

    public function update(int $id, array $data): void
    {
        $stmt = $this->pdo->prepare('UPDATE comment SET author = :author, content = :content WHERE id = :id');
        $stmt->execute([
            ':author' => $data['author'],
            ':content' => $data['content'],
            ':id' => $id
        ]);
    }

    public function delete(int $id): void
    {
        $stmt = $this->pdo->prepare('DELETE FROM comment WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }

}
