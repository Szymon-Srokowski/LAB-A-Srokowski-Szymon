<h1>Create Comment</h1>
<form method="post" action="?action=comment-create">
    <label for="post_id">Post ID:</label>
    <input type="number" name="post_id" id="post_id" required>
    <label for="author">Author:</label>
    <input type="text" name="author" id="author" required>
    <label for="content">Content:</label>
    <textarea name="content" id="content" required></textarea>
    <button type="submit">Create</button>
</form>
<a href="?action=comment-list">Back to list</a>
