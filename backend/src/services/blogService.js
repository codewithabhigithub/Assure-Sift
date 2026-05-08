const pool = require('../config/db');

const getAllBlogs = async () => {
    const result = await pool.query('SELECT * FROM blogs ORDER BY created_at DESC');
    return result.rows;
};

const getBlogById = async (id) => {
    const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
    return result.rows[0];
};

const createBlog = async (blogData) => {
    const { title, content, image, author_name, tags, status } = blogData;
    const result = await pool.query(
        `INSERT INTO blogs (title, content, image, author_name, tags, status) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [title, content, image, author_name, tags, status || 'draft']
    );
    return result.rows[0];
};

const updateBlog = async (id, blogData) => {
    const { title, content, image, author_name, tags, status } = blogData;
    const result = await pool.query(
        `UPDATE blogs SET 
            title = COALESCE($1, title), 
            content = COALESCE($2, content), 
            image = COALESCE($3, image), 
            author_name = COALESCE($4, author_name), 
            tags = COALESCE($5, tags), 
            status = COALESCE($6, status), 
            updated_at = CURRENT_TIMESTAMP 
        WHERE id = $7 RETURNING *`,
        [title, content, image, author_name, tags, status, id]
    );
    return result.rows[0];
};

const deleteBlog = async (id) => {
    const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
