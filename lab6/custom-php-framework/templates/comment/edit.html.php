<h1>Edit Comment</h1>
<form method="post" action="?action=comment-edit&id=<?= htmlspecialchars($comment['id']) ?>">
    <label for="author">Author:</label>
    <input type="text" name="author" id="author" value="<?= htmlspecialchars($comment['author']) ?>" required>
    <label for="content">Content:</label>
    <textarea name="content" id="content" required><?= htmlspecialchars($comment['content']) ?></textarea>
    <button type="submit">Save</button>
</form>
<a href="?action=comment-list">Back to list</a>
