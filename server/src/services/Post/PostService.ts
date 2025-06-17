import RootService from '@/services/Root/RootService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import {
  PERSON_ERROR_MESSAGES,
  GENERAL_MESSAGES,
} from '@/utils/constants/messages';
import FollowingsModel from '@/models/FollowingsModel';
import PostsModel from '@/models/PostsModel';
import PostStatsModel from '@/models/PostStatsModel';
import PersonStatsModel from '@/models/PersonStatsModel';
import PostLikesModel from '@/models/PostLikesModel';
import StoriesModel from '@/models/StoriesModel';
import { Person } from '@/types';

/**
 * CLASS FOR HANDLING REQUESTS MADE BY ALL POST RELATED CONTROLLERS
 */
class PostService extends RootService {
  constructor() {
    super();
  }

  /**
   * @description ADDS LIKE ON POST
   * @param user - logged in user
   * @param uuid - post's uuid
   * @route POST /api/v1/posts/like/:uuid
   * @access private
   */
  async addLike(user: Person, uuid: string): Promise<PostsModel> {
    /* BEGIN: VALIDATIONS */
    if (!uuid) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        GENERAL_MESSAGES.PROVIDE_POST_DETAILS,
      );
    }
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE VALIDATIONS */
    /* CHECKING IF POST RECORD EXISTS OR NOT */
    const postRecord = await PostsModel.query().findOne({
      uuid,
      is_deleted: false,
    });
    if (!postRecord) {
      this.raiseError(HTTP_CODES.NOT_FOUND, GENERAL_MESSAGES.POST_NOT_FOUND);
    }

    /* CHECKING IF POST LIKE RECORD FOR THE GIVEN USER EXISTS OR NOT */
    const postLikeRecord = await PostLikesModel.query().findOne({
      post_id: postRecord.id,
      created_by: user.id,
    });
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: DATABASE OPERATIONS */
    if (!postLikeRecord) {
      /* INSERT POST LIKE RECORD ONLY IF IT DOESN'T EXIST */
      const likeRecord = await PostLikesModel.query().insert({
        post_id: postRecord.id,
        created_by: user.id,
        updated_by: user.id,
      });
      if (!likeRecord) {
        this.raiseError(
          HTTP_CODES.INTERNAL_SERVER_ERROR,
          PERSON_ERROR_MESSAGES.LIKE_FAILURE,
        );
      }

      /* UPDATE POST STAT RECORD */
      await PostStatsModel.query()
        .where('post_id', postRecord.id)
        .increment('like_count', 1);
    }
    /* END: DATABASE OPERATIONS */

    /* FETCH AND RETURN UPDATED POST DATA */
    const updatedPost = await PostsModel.getPostDetails(uuid);
    if (!updatedPost) {
      this.raiseError(HTTP_CODES.NOT_FOUND, GENERAL_MESSAGES.POST_NOT_FOUND);
    }

    return updatedPost;
  }

  /**
   * @description ADDS STORY ON POST
   * @param user - logged in user
   * @param post_uuid - post's uuid
   * @route POST /api/v1/posts/add-story/:post_uuid
   * @access private
   */
  async addStory(user: Person, post_uuid: string): Promise<void> {
    /* BEGIN: VALIDATIONS */
    if (!post_uuid) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        GENERAL_MESSAGES.PROVIDE_POST_DETAILS,
      );
    }
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE VALIDATIONS */
    /* CHECKING IF POST RECORD EXISTS OR NOT */
    const postRecord = await PostsModel.query().findOne({
      uuid: post_uuid,
      is_deleted: false,
    });
    if (!postRecord) {
      this.raiseError(HTTP_CODES.NOT_FOUND, GENERAL_MESSAGES.POST_NOT_FOUND);
    }

    /* CHECKING IF STORY RECORD FOR THE GIVEN USER EXISTS OR NOT */
    const storyRecord = await StoriesModel.query().findOne({
      post_id: postRecord.id,
      person_id: user.id,
    });
    if (storyRecord) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        GENERAL_MESSAGES.ALREADY_STORY_POST,
      );
    }
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: DATABASE OPERATIONS */
    /* INSERT STORY RECORD */
    const insertedStory = await StoriesModel.query().insert({
      post_id: postRecord.id,
      person_id: user.id,
    });
    if (!insertedStory) {
      this.raiseError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        PERSON_ERROR_MESSAGES.STORY_FAILURE,
      );
    }

    /* UPDATE POST STAT RECORD */
    await PostStatsModel.query()
      .where('post_id', postRecord.id)
      .increment('story_count', 1);
    /* END: DATABASE OPERATIONS */
  }

  /**
   * @description REMOVES STORY FROM POST
   * @param user - logged in user
   * @param post_uuid - post's uuid
   * @route POST /api/v1/posts/remove-story/:post_uuid
   * @access private
   */
  async removeStory(user: Person, post_uuid: string): Promise<void> {
    /* BEGIN: VALIDATIONS */
    if (!post_uuid) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        GENERAL_MESSAGES.PROVIDE_POST_DETAILS,
      );
    }
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE VALIDATIONS */
    /* CHECKING IF POST RECORD EXISTS OR NOT */
    const postRecord = await PostsModel.query().findOne({
      uuid: post_uuid,
      is_deleted: false,
    });
    if (!postRecord) {
      this.raiseError(HTTP_CODES.NOT_FOUND, GENERAL_MESSAGES.POST_NOT_FOUND);
    }

    /* CHECKING IF STORY RECORD FOR THE GIVEN USER EXISTS OR NOT */
    const storyRecord = await StoriesModel.query().findOne({
      post_id: postRecord.id,
      person_id: user.id,
    });
    if (!storyRecord) {
      this.raiseError(HTTP_CODES.BAD_REQUEST, GENERAL_MESSAGES.NOT_STORY_YET);
    }
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: DATABASE OPERATIONS */
    /* DELETE STORY RECORD */
    await StoriesModel.query().delete().where({
      post_id: postRecord.id,
      person_id: user.id,
    });

    /* UPDATE POST STAT RECORD */
    await PostStatsModel.query()
      .where('post_id', postRecord.id)
      .decrement('story_count', 1);
    /* END: DATABASE OPERATIONS */
  }

  /**
   * @description REMOVES LIKE FROM POST
   * @param user - logged in user
   * @param uuid - post's uuid
   * @route POST /api/v1/posts/unlike/:uuid
   * @access private
   */
  async removeLike(user: Person, uuid: string): Promise<PostsModel> {
    /* BEGIN: VALIDATIONS */
    if (!uuid) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        GENERAL_MESSAGES.PROVIDE_POST_DETAILS,
      );
    }
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE VALIDATIONS */
    /* CHECKING IF POST RECORD EXISTS OR NOT */
    const postRecord = await PostsModel.query().findOne({
      uuid,
      is_deleted: false,
    });
    if (!postRecord) {
      this.raiseError(HTTP_CODES.NOT_FOUND, GENERAL_MESSAGES.POST_NOT_FOUND);
    }

    /* CHECKING IF POST LIKE RECORD FOR THE GIVEN USER EXISTS OR NOT */
    const postLikeRecord = await PostLikesModel.query().findOne({
      post_id: postRecord.id,
      created_by: user.id,
    });
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: DATABASE OPERATIONS */
    if (postLikeRecord) {
      /* DELETE POST LIKE RECORD ONLY IF IT EXISTS */
      await PostLikesModel.query().delete().where({
        post_id: postRecord.id,
        created_by: user.id,
      });

      /* UPDATE POST STAT RECORD */
      await PostStatsModel.query()
        .where('post_id', postRecord.id)
        .decrement('like_count', 1);
    }
    /* END: DATABASE OPERATIONS */

    /* FETCH AND RETURN UPDATED POST DATA */
    const updatedPost = await PostsModel.getPostDetails(uuid);
    if (!updatedPost) {
      this.raiseError(HTTP_CODES.NOT_FOUND, GENERAL_MESSAGES.POST_NOT_FOUND);
    }

    return updatedPost;
  }

  /**
   * @description CREATES A NEW POST
   * @param user - logged in user
   * @param content - post content
   * @route POST /api/v1/posts/create
   * @access private
   */
  async createPost(user: Person, content: string): Promise<PostsModel> {
    /* BEGIN: VALIDATIONS */
    if (!content) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        GENERAL_MESSAGES.PROVIDE_POST_DETAILS,
      );
    }
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE OPERATIONS */
    /* INSERT POST RECORD */
    const postRecord = await PostsModel.query().insertAndFetch({
      content,
      created_by: user.id,
      updated_by: user.id,
      is_deleted: false,
    });
    if (!postRecord) {
      this.raiseError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        PERSON_ERROR_MESSAGES.POST_FAILURE,
      );
    }

    /* INSERT POST STATS RECORD */
    await PostStatsModel.query().insert({
      post_id: postRecord.id,
      like_count: 0,
      comment_count: 0,
      story_count: 0,
    });

    /* UPDATE PERSON STATS RECORD */
    await PersonStatsModel.query()
      .where('person_id', user.id)
      .increment('post_count', 1);
    /* END: DATABASE OPERATIONS */

    return postRecord;
  }

  /**
   * @description GET FEED POSTS FOR USER
   * @param user - logged in user
   * @route GET /api/v1/posts/feed
   * @access private
   */
  async getFeedPosts(user: Person): Promise<PostsModel[]> {
    /* GET ALL FOLLOWING IDS */
    const followingIds = await FollowingsModel.query()
      .where('follower_id', user.id)
      .select('followed_id');

    const followingPersonIds = followingIds.map(follow => follow.followed_id);
    followingPersonIds.push(user.id); // Include user's own posts

    /* GET POSTS FROM FOLLOWING PEOPLE */
    const feedPosts = await PostsModel.query()
      .whereIn('created_by', followingPersonIds)
      .where('is_deleted', false)
      .withGraphFetched(
        '[creator(defaultSelects), post_likes(orderByLatest).creator(defaultSelects), post_stats, post_stories.creator(defaultSelects)]',
      )
      .modify('orderByLatest');

    return feedPosts;
  }

  /**
   * @description GET STORIES FOR USER
   * @param user - logged in user
   * @route GET /api/v1/posts/stories
   * @access private
   */
  async getStories(user: Person): Promise<PostsModel[]> {
    /* GET ALL FOLLOWING IDS */
    const followingIds = await FollowingsModel.query()
      .where('follower_id', user.id)
      .select('followed_id');

    const followingPersonIds = followingIds.map(follow => follow.followed_id);
    followingPersonIds.push(user.id); // Include user's own stories

    /* GET POSTS WHERE USER HAS CREATED STORIES */
    const postsWithStories = await PostsModel.query()
      .whereExists(
        StoriesModel.query()
          .whereColumn('post_id', 'posts.id')
          .where('person_id', user.id),
      )
      .where('is_deleted', false)
      .withGraphFetched(
        '[post_stories.creator(defaultSelects), creator(defaultSelects), post_stats, post_likes.creator(defaultSelects)]',
      )
      .modify('orderByLatest');

    return postsWithStories;
  }

  /**
   * @description FETCH SINGLE POST BY UUID
   * @param uuid - post's uuid
   * @route GET /api/v1/posts/:uuid
   * @access private
   */
  async fetchPost(uuid: string): Promise<PostsModel> {
    /* BEGIN: VALIDATIONS */
    if (!uuid) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        GENERAL_MESSAGES.PROVIDE_POST_DETAILS,
      );
    }
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE OPERATIONS */
    const postRecord = await PostsModel.getPostDetails(uuid);
    if (!postRecord) {
      this.raiseError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        GENERAL_MESSAGES.POST_NOT_FOUND,
      );
    }
    /* END: DATABASE OPERATIONS */

    return postRecord;
  }
}

export default PostService;
