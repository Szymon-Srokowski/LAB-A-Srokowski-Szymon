<h1>Comments</h1>
<ul>
    <?php foreach ($comments as $comment): ?>
        <li>
            <?= htmlspecialchars($comment['author']) ?>: <?= htmlspecialchars($comment['content']) ?>
            <a href="?action=comment-show&id=<?= $comment['id'] ?>">View</a>
            <a href="?action=comment-edit&id=<?= $comment['id'] ?>">Edit</a>
            <a href="?action=comment-delete&id=<?= $comment['id'] ?>" onclick="return confirm('Are you sure you want to delete this comment?');">Delete</a>
        </li>
    <?php endforeach; ?>
</ul>
<a href="?action=comment-create">Create new comment</a>
