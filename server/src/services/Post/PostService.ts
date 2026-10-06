import FollowingsModel from '../../models/FollowingsModel';
import PersonStatsModel from '../../models/PersonStatsModel';
import PostLikesModel from '../../models/PostLikesModel';
import PostsModel from '../../models/PostsModel';
import PostStatsModel from '../../models/PostStatsModel';
import StoriesModel from '../../models/StoriesModel';
import type { AuthUser } from '../../types';
import { HTTP_CODES } from '../../utils/constants/http-codes';
import {
  GENERAL_MESSAGES,
  PERSON_ERROR_MESSAGES,
} from '../../utils/constants/messages';
import { HttpError } from '../../utils/errors';

const postNotFound = (): HttpError =>
  new HttpError(HTTP_CODES.NOT_FOUND, GENERAL_MESSAGES.POST_NOT_FOUND);

/**
 * Handles all post-related business logic.
 */
class PostService {
  /**
   * @route POST /api/v1/posts/like/:uuid
   */
  async addLike(user: AuthUser, uuid: string): Promise<PostsModel> {
    const post = await this.findActivePost(uuid);

    const existingLike = await PostLikesModel.query().findOne({
      post_id: post.id,
      created_by: user.id,
    });

    if (!existingLike) {
      await PostsModel.transaction(async trx => {
        await PostLikesModel.query(trx).insert({
          post_id: post.id,
          created_by: user.id,
          updated_by: user.id,
        });
        await PostStatsModel.query(trx)
          .where('post_id', post.id)
          .increment('like_count', 1);
      });
    }

    return this.getPostDetailsOrThrow(uuid);
  }

  /**
   * @route POST /api/v1/posts/unlike/:uuid
   */
  async removeLike(user: AuthUser, uuid: string): Promise<PostsModel> {
    const post = await this.findActivePost(uuid);

    await PostsModel.transaction(async trx => {
      const deleted = await PostLikesModel.query(trx)
        .delete()
        .where({ post_id: post.id, created_by: user.id });

      if (deleted > 0) {
        await PostStatsModel.query(trx)
          .where('post_id', post.id)
          .decrement('like_count', deleted);
      }
    });

    return this.getPostDetailsOrThrow(uuid);
  }

  /**
   * @route POST /api/v1/posts/add-story/:post_uuid
   */
  async addStory(user: AuthUser, postUuid: string): Promise<PostsModel> {
    const post = await this.findActivePost(postUuid);

    const existingStory = await StoriesModel.query().findOne({
      post_id: post.id,
      person_id: user.id,
    });
    if (existingStory) {
      throw new HttpError(
        HTTP_CODES.BAD_REQUEST,
        GENERAL_MESSAGES.ALREADY_STORY_POST,
      );
    }

    await PostsModel.transaction(async trx => {
      await StoriesModel.query(trx).insert({
        post_id: post.id,
        person_id: user.id,
      });
      await PostStatsModel.query(trx)
        .where('post_id', post.id)
        .increment('story_count', 1);
    });

    return this.getPostDetailsOrThrow(postUuid);
  }

  /**
   * @route POST /api/v1/posts/remove-story/:post_uuid
   */
  async removeStory(user: AuthUser, postUuid: string): Promise<PostsModel> {
    const post = await this.findActivePost(postUuid);

    await PostsModel.transaction(async trx => {
      const deleted = await StoriesModel.query(trx)
        .delete()
        .where({ post_id: post.id, person_id: user.id });

      if (deleted === 0) {
        throw new HttpError(
          HTTP_CODES.BAD_REQUEST,
          GENERAL_MESSAGES.NOT_STORY_YET,
        );
      }

      await PostStatsModel.query(trx)
        .where('post_id', post.id)
        .decrement('story_count', deleted);
    });

    return this.getPostDetailsOrThrow(postUuid);
  }

  /**
   * @route POST /api/v1/posts/create
   */
  async createPost(user: AuthUser, content: string): Promise<PostsModel> {
    const post = await PostsModel.transaction(async trx => {
      const inserted = await PostsModel.query(trx).insertAndFetch({
        content,
        created_by: user.id,
        updated_by: user.id,
        is_deleted: false,
      });

      await PostStatsModel.query(trx).insert({
        post_id: inserted.id,
        like_count: 0,
        comment_count: 0,
        story_count: 0,
      });

      await PersonStatsModel.query(trx)
        .where('person_id', user.id)
        .increment('post_count', 1);

      return inserted;
    });

    const details = await PostsModel.getPostDetails(post.uuid);
    if (!details) {
      throw new HttpError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        PERSON_ERROR_MESSAGES.POST_FAILURE,
      );
    }
    return details;
  }

  /**
   * Posts from the user and everyone they follow.
   * @route GET /api/v1/posts/feed
   */
  async getFeedPosts(user: AuthUser): Promise<PostsModel[]> {
    const followings = await FollowingsModel.query()
      .select('followed_id')
      .where('follower_id', user.id);
    const personIds = [user.id, ...followings.map(f => f.followed_id)];

    return PostsModel.query()
      .whereIn('created_by', personIds)
      .where('is_deleted', false)
      .withGraphFetched(
        '[creator(defaultSelects), post_likes(orderByLatest).creator(defaultSelects), post_stats, post_stories.creator(defaultSelects)]',
      )
      .modify('orderByLatest');
  }

  /**
   * Posts the user has added to their story.
   * @route GET /api/v1/posts/stories
   */
  async getStories(user: AuthUser): Promise<PostsModel[]> {
    return PostsModel.query()
      .whereExists(
        StoriesModel.query()
          .whereColumn('stories.post_id', 'posts.id')
          .where('stories.person_id', user.id),
      )
      .where('is_deleted', false)
      .withGraphFetched(
        '[post_stories.creator(defaultSelects), creator(defaultSelects), post_stats, post_likes.creator(defaultSelects)]',
      )
      .modify('orderByLatest');
  }

  /**
   * @route GET /api/v1/posts/:uuid
   */
  async fetchPost(uuid: string): Promise<PostsModel> {
    return this.getPostDetailsOrThrow(uuid);
  }

  private async findActivePost(uuid: string): Promise<PostsModel> {
    const post = await PostsModel.query().findOne({ uuid, is_deleted: false });
    if (!post) {
      throw postNotFound();
    }
    return post;
  }

  private async getPostDetailsOrThrow(uuid: string): Promise<PostsModel> {
    const post = await PostsModel.getPostDetails(uuid);
    if (!post) {
      throw postNotFound();
    }
    return post;
  }
}

export default new PostService();
