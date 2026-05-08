const blogService = require('../services/blogService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const getBlogs = async (req, res, next) => {
    try {
        const blogs = await blogService.getAllBlogs();
        return successResponse(res, blogs);
    } catch (error) {
        next(error);
    }
};

const getBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await blogService.getBlogById(id);
        if (!blog) {
            return errorResponse(res, 'Blog not found', 404);
        }
        return successResponse(res, blog);
    } catch (error) {
        next(error);
    }
};

const createBlog = async (req, res, next) => {
    try {
        if (req.fileValidationError) {
            return errorResponse(res, req.fileValidationError, 400);
        }

        const { title, content, author_name, tags, status } = req.body;
        
        if (!title || !content || !author_name) {
            return errorResponse(res, 'Title, Content, and Author Name are required', 400);
        }

        const image = req.file ? req.file.filename : null;

        const newBlog = await blogService.createBlog({ title, content, image, author_name, tags, status });
        return successResponse(res, newBlog, 'Blog created successfully', 201);
    } catch (error) {
        next(error);
    }
};

const updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content, author_name, tags, status } = req.body;
        const image = req.file ? req.file.path : null;

        const updatedBlog = await blogService.updateBlog(id, { title, content, image, author_name, tags, status });
        if (!updatedBlog) {
            return errorResponse(res, 'Blog not found', 404);
        }
        return successResponse(res, updatedBlog, 'Blog updated successfully');
    } catch (error) {
        next(error);
    }
};

const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await blogService.deleteBlog(id);
        if (!deleted) {
            return errorResponse(res, 'Blog not found', 404);
        }
        return successResponse(res, null, 'Blog deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
};
