<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'autoload.php';

$config = new \App\Service\Config();

$templating = new \App\Service\Templating();
$router = new \App\Service\Router();

// Połączenie z bazą danych
$pdo = new PDO('sqlite:' . __DIR__ . '/../data.db');

$action = $_REQUEST['action'] ?? null;

switch ($action) {
    // Akcje związane z Post
    case 'post-index':
    case null:
        $controller = new \App\Controller\PostController();
        $view = $controller->indexAction($templating, $router);
        break;
    case 'post-create':
        $controller = new \App\Controller\PostController();
        $view = $controller->createAction($_REQUEST['post'] ?? null, $templating, $router);
        break;
    case 'post-edit':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\PostController();
        $view = $controller->editAction($_REQUEST['id'], $_REQUEST['post'] ?? null, $templating, $router);
        break;
    case 'post-show':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\PostController();
        $view = $controller->showAction($_REQUEST['id'], $templating, $router);
        break;
    case 'post-delete':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\PostController();
        $view = $controller->deleteAction($_REQUEST['id'], $router);
        break;

    // Akcje związane z Comment
    case 'comment-list': // Wyświetlanie listy komentarzy
        $controller = new \App\Controller\CommentController(new \App\Model\Comment($pdo), $templating);
        $view = $controller->indexAction();
        break;
    case 'comment-show': // Wyświetlanie szczegółów komentarza
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\CommentController(new \App\Model\Comment($pdo), $templating);
        $view = $controller->showAction($_REQUEST['id']);
        break;
    case 'comment-create': // Tworzenie nowego komentarza
        $controller = new \App\Controller\CommentController(new \App\Model\Comment($pdo), $templating);
        $view = $controller->createAction($_POST ?? []);
        break;
    case 'comment-edit': // Edycja istniejącego komentarza
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\CommentController(new \App\Model\Comment($pdo), $templating);
        $view = $controller->editAction($_REQUEST['id'], $_POST ?? []);
        break;
    case 'comment-delete': // Usunięcie komentarza
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\CommentController(new \App\Model\Comment($pdo), $templating);
        $controller->deleteAction($_REQUEST['id']);
        header('Location: ?action=comment-list');
        exit();
        break;

    // Akcja informacyjna
    case 'info':
        $controller = new \App\Controller\InfoController();
        $view = $controller->infoAction();
        break;

    default:
        $view = 'Not found';
        break;
}

// Wyświetlanie widoku
if ($view) {
    echo $view;
}
