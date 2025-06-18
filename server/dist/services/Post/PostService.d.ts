import RootService from '@/services/Root/RootService';
import PostsModel from '@/models/PostsModel';
import { Person } from '@/types';
declare class PostService extends RootService {
    constructor();
    addLike(user: Person, uuid: string): Promise<PostsModel>;
    addStory(user: Person, post_uuid: string): Promise<PostsModel>;
    removeStory(user: Person, post_uuid: string): Promise<PostsModel>;
    removeLike(user: Person, uuid: string): Promise<PostsModel>;
    createPost(user: Person, content: string): Promise<PostsModel>;
    getFeedPosts(user: Person): Promise<PostsModel[]>;
    getStories(user: Person): Promise<PostsModel[]>;
    fetchPost(uuid: string): Promise<PostsModel>;
}
export default PostService;
//# sourceMappingURL=PostService.d.ts.map