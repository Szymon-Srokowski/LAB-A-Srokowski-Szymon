<?php

namespace App\Controller;

use App\Model\Comment;
use App\Service\Templating;

class CommentController
{
    private Comment $comment;
    private Templating $templating;

    public function __construct(Comment $comment, Templating $templating)
    {
        $this->comment = $comment;
        $this->templating = $templating;
    }

    // Wyświetlanie listy komentarzy
    public function indexAction(): string
    {
        $comments = $this->comment->findAll(); // Pobiera wszystkie komentarze
        return $this->templating->render('comment/list.html.php', ['comments' => $comments]);
    }

    // Wyświetlanie pojedynczego komentarza
    public function showAction(int $id): string
    {
        $comment = $this->comment->find($id); // Pobiera komentarz o podanym ID
        return $this->templating->render('comment/show.html.php', ['comment' => $comment]);
    }

    // Tworzenie nowego komentarza
    public function createAction(array $data): string
    {
        if (!empty($data)) {
            $this->comment->create($data);
            header('Location: ?action=comment-list');
            exit();
        }
        return $this->templating->render('comment/create.html.php');
    }

    // Edycja istniejącego komentarza
    public function editAction(int $id, array $data = null): string
    {
        if (!empty($data)) {
            $this->comment->update($id, $data);
            header('Location: ?action=comment-list');
            exit();
        }
        $comment = $this->comment->find($id);
        return $this->templating->render('comment/edit.html.php', ['comment' => $comment]);
    }

    // Usuwanie komentarza
    public function deleteAction(int $id): void
    {
        $this->comment->delete($id);
        header('Location: ?action=comment-list');
        exit();
    }

}
