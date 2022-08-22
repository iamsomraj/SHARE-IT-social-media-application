<template>
  <div class="w-full md:w-1/2 md:px-6">
    <div
      class="flex w-full flex-col items-start justify-center space-y-4 border-t border-b transition-all duration-300 dark:border-slate-600 md:rounded-xl md:border"
    >
      <!-- BEGIN: HEADER SECTION -->
      <post-card-header
        :ownerUUID="ownerUUID"
        :ownerName="ownerName"
        :time="time"
      ></post-card-header>
      <!-- END: HEADER SECTION -->

      <!-- BEGIN: BODY SECTION -->
      <post-card-body
        :uuid="uuid"
        :content="content"
        :numberOfLikes="numberOfLikes"
        :isLiked="isLiked"
        :likeText="likeText"
        @on-post-like="onPostLike"
        @on-post-unlike="onPostUnlike"
      ></post-card-body>
      <!-- END: BODY SECTION -->

      <!-- BEGIN: POST CARD FOOTER -->
      <div
        class="flex w-full items-center justify-start space-x-2 border-t px-6 py-2 text-xs dark:border-t-slate-600"
      >
        <!-- BEGIN: LIKE ICON -->
        <div
          v-if="!isLiked"
          class="flex cursor-pointer items-center justify-center space-x-4"
          @click="onPostLike(uuid)"
        >
          <heart-icon
            class="fill-transparent stroke-slate-400 hover:fill-slate-400 active:fill-slate-400"
          ></heart-icon>
        </div>
        <!-- END: LIKE ICON -->
        <!-- BEGIN: LIKE ICON -->
        <div
          v-else
          class="flex cursor-pointer items-center justify-center space-x-4"
          @click="onPostUnlike(uuid)"
        >
          <heart-icon
            class="fill-red-400 stroke-red-400 hover:fill-red-200 hover:stroke-red-200 active:stroke-red-200"
          ></heart-icon>
        </div>
        <!-- END: LIKE ICON -->
      </div>
      <!-- END: POST CARD FOOTER -->
    </div>
  </div>
</template>

<script>
import ProfilePicture from '../../persons/ProfilePicture.vue';
import HeartIcon from './../../assets/HeartIcon.vue';
import PostCardHeader from './PostCardHeader.vue';
import PostCardBody from './PostCardBody.vue';
import PostCardFooter from './PostCardFooter.vue';

export default {
  name: 'PostCard',
  props: [
    'uuid',
    'id',
    'ownerName',
    'ownerId',
    'ownerUUID',
    'content',
    'numberOfLikes',
    'time',
    'postLikes',
  ],
  computed: {
    likeText() {
      const names = this.postLikes
        .slice(0, 2)
        .map((post) => {
          if (post.creator.uuid === this.loggedInUserUUID) {
            return 'You';
          } else {
            return post.creator.name;
          }
        })
        .join(this.postLikes.length === 2 ? ' and ' : ', ');
      if (this.postLikes.length > 2) {
        return `${names} and ${this.postLikes.length - 2} ${
          this.postLikes.length - 2 > 1 ? 'others' : 'other'
        } liked ${
          this.loggedInUserUUID === this.ownerUUID ? 'your post' : 'this post'
        }`;
      } else if (this.postLikes.length === 0) {
        return `Be the first to like ${
          this.loggedInUserUUID === this.ownerUUID ? 'your post' : 'this post'
        }`;
      } else {
        return `${names} liked ${
          this.loggedInUserUUID === this.ownerUUID ? 'your post' : 'this post'
        }`;
      }
    },
    loggedInUserUUID() {
      return this.$store.getters['auth/uuid'];
    },
    isLiked() {
      return this.postLikes?.some(
        (likeRecord) => likeRecord?.creator?.uuid === this.loggedInUserUUID
      );
    },
  },
  methods: {
    onPostLike(uuid) {
      this.$emit('onPostLike', uuid);
    },
    onPostUnlike(uuid) {
      this.$emit('onPostUnlike', uuid);
    },
  },
  components: {
    ProfilePicture,
    HeartIcon,
    PostCardHeader,
    PostCardBody,
    PostCardFooter,
  },
};
</script>

<style lang="scss" scoped></style>
