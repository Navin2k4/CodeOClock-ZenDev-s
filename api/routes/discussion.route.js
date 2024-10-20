import express from 'express';
import { createPost, getPosts, reactToPost } from '../controllers/discussion.controller.js';
const router = express.Router();

router.get('/posts', getPosts);
router.post('/createpost', createPost);
router.post('/:id/react', reactToPost);

export default router;