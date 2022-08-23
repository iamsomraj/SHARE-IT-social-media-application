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
        :personPostFavourites="personPostFavourites"
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
      ></post-card-body>
      <!-- END: BODY SECTION -->

      <!-- BEGIN: FOOTER SECTION -->
      <post-card-footer
        :uuid="uuid"
        :isLiked="isLiked"
        @on-post-like="onPostLike"
        @on-post-unlike="onPostUnlike"
      ></post-card-footer>
      <!-- END: FOOTER SECTION -->
    </div>
  </div>
</template>

<script>
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
    'personPostFavourites',
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
    PostCardHeader,
    PostCardBody,
    PostCardFooter,
  },
};
</script>

<style lang="scss" scoped></style>
