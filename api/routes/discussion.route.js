import express from 'express';
import { createPost, getPosts } from '../controllers/discussion.controller.js';
const router = express.Router();

router.get('/posts', getPosts);
router.post('/createpost', createPost);

export default router;