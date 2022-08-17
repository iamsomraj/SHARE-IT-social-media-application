<template>
  <header
    class="fixed bottom-0 z-10 flex w-full items-center justify-center border-t bg-white px-6 py-4 shadow-2xl transition-all duration-300 dark:bg-slate-800 md:sticky md:top-0 md:border-t-0 md:border-b md:py-2 md:px-12 md:shadow"
  >
    <div class="flex w-full items-center justify-between md:w-1/2">
      <NuxtLink
        to="/"
        class="flex items-center justify-center space-x-2 rounded text-2xl font-extrabold tracking-tighter"
      >
        <span class="text-blue-400">SHARE</span>
        <span class="text-yellow-400">IT</span>
      </NuxtLink>
      <div
        v-if="!isLoggedIn"
        class="flex items-center justify-between space-x-4 font-bold"
      >
        <NuxtLink to="/register"> Register </NuxtLink>
        <NuxtLink to="/" class="rounded bg-yellow-400 px-3 py-2 text-white">
          Login
        </NuxtLink>
      </div>
      <div
        v-else
        class="flex items-center justify-between space-x-2 font-bold md:space-x-4"
      >
        <div @click="redirectToFeed">
          <feed-icon
            class="h-6 w-6 cursor-pointer fill-slate-300 stroke-slate-300 hover:fill-blue-400 hover:stroke-blue-400 active:fill-blue-400 active:stroke-blue-400 dark:fill-slate-600 dark:stroke-slate-600 dark:hover:fill-blue-400 dark:hover:stroke-blue-400 dark:active:fill-blue-400 dark:active:stroke-blue-400"
            :class="{
              'fill-blue-400 stroke-blue-400 dark:fill-blue-400 dark:stroke-blue-400':
                isActiveRoute(ROUTES.FEED),
            }"
          />
        </div>
        <div @click="redirectToSearch">
          <search-icon
            class="h-6 w-6 cursor-pointer fill-slate-300 stroke-slate-300 hover:fill-blue-400 hover:stroke-blue-400 active:fill-blue-400 active:stroke-blue-400 dark:fill-slate-600 dark:stroke-slate-600 dark:hover:fill-blue-400 dark:hover:stroke-blue-400 dark:active:fill-blue-400 dark:active:stroke-blue-400"
            :class="{
              'fill-blue-400 stroke-blue-400 dark:fill-blue-400 dark:stroke-blue-400':
                isActiveRoute(ROUTES.SEARCH),
            }"
          />
        </div>
        <div @click="redirectToProfile">
          <ProfilePicture
            :uuid="user.uuid"
            :name="user.name"
            class="h-6 w-6 text-4xl"
          />
        </div>
        <theme-button />
        <div @click="onLogout">
          <logout-icon
            class="h-6 w-6 cursor-pointer stroke-slate-300 hover:stroke-blue-400 active:stroke-blue-400 dark:stroke-slate-600 dark:hover:stroke-blue-400 dark:active:stroke-blue-400"
          >
          </logout-icon>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { MESSAGES, ROUTES } from '../../util/constants.js';
import FeedIcon from '../assets/FeedIcon.vue';
import LogoutIcon from '../assets/LogoutIcon.vue';
import SearchIcon from '../assets/SearchIcon.vue';
import UserIcon from '../assets/UserIcon.vue';
import ProfilePicture from '../persons/ProfilePicture.vue';
import TertiaryButton from '../user-interfaces/TertiaryButton.vue';
import ThemeButton from '../user-interfaces/ThemeButton.vue';

export default {
  name: 'Header',
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn'];
    },
    user() {
      return this.$store.getters['auth/user'];
    },
    routeName() {
      return this.$route.name;
    },
  },
  methods: {
    onLogout() {
      this.$store.commit('auth/clear');
      this.$store.commit('profile/setProfile', null);
      this.$router.push('/');
      this.$store.dispatch('toast/success', MESSAGES.LOGOUT_SUCCESS);
    },
    redirectToFeed() {
      this.$router.push('/feed');
    },
    redirectToProfile() {
      this.$router.push(`/profile/${this.user.uuid}`);
    },
    redirectToSearch() {
      this.$router.push('/search');
    },
    isActiveRoute(routeName) {
      return this.routeName === routeName;
    },
  },
  components: {
    TertiaryButton,
    FeedIcon,
    LogoutIcon,
    UserIcon,
    ProfilePicture,
    SearchIcon,
    ThemeButton,
  },
};
</script>
