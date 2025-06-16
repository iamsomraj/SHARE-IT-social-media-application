<template>
  <header
    class="fixed bottom-0 z-10 flex w-full items-center justify-center border-t bg-white px-6 py-4 shadow-2xl transition-all duration-300 dark:border-slate-600 dark:bg-slate-800 dark:shadow-xl md:sticky md:top-0 md:border-b md:border-t-0 md:px-12 md:py-2 md:shadow dark:md:border-b-slate-600"
  >
    <div class="flex w-full items-center justify-between md:w-1/2">
      <NuxtLink
        to="/"
        class="flex items-center justify-center space-x-2 rounded text-lg font-extrabold tracking-tighter md:text-2xl"
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
      <div v-else class="flex items-center justify-between space-x-6 font-bold">
        <div @click="redirectToFeed">
          <FeedIcon
            class="h-8 w-8 cursor-pointer fill-slate-300 stroke-slate-300 hover:fill-blue-400 hover:stroke-blue-400 active:fill-blue-400 active:stroke-blue-400 dark:fill-slate-600 dark:stroke-slate-600 dark:hover:fill-blue-400 dark:hover:stroke-blue-400 dark:active:fill-blue-400 dark:active:stroke-blue-400 md:h-6 md:w-6"
            :class="{
              'fill-blue-400 stroke-blue-400 dark:fill-blue-400 dark:stroke-blue-400':
                isActiveRoute(ROUTES.FEED),
            }"
          />
        </div>
        <div @click="redirectToSearch">
          <SearchIcon
            class="h-8 w-8 cursor-pointer fill-slate-300 stroke-slate-300 hover:fill-blue-400 hover:stroke-blue-400 active:fill-blue-400 active:stroke-blue-400 dark:fill-slate-600 dark:stroke-slate-600 dark:hover:fill-blue-400 dark:hover:stroke-blue-400 dark:active:fill-blue-400 dark:active:stroke-blue-400 md:h-6 md:w-6"
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
            class="h-8 w-8 text-4xl md:h-6 md:w-6"
          />
        </div>
        <ThemeButton />
        <div @click="onLogout">
          <LogoutIcon
            class="h-8 w-8 cursor-pointer stroke-slate-300 hover:stroke-blue-400 active:stroke-blue-400 dark:stroke-slate-600 dark:hover:stroke-blue-400 dark:active:stroke-blue-400 md:h-6 md:w-6"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { MESSAGES, ROUTES } from '~/utils/constants'
  import { useAuthStore } from '~/stores/auth'
  import { useToastStore } from '~/stores/toast'

  // Components
  import FeedIcon from '~/components/assets/FeedIcon.vue'
  import LogoutIcon from '~/components/assets/LogoutIcon.vue'
  import SearchIcon from '~/components/assets/SearchIcon.vue'
  import ProfilePicture from '~/components/persons/ProfilePicture.vue'
  import ThemeButton from '~/components/user-interfaces/ThemeButton.vue'

  // Stores
  const authStore = useAuthStore()
  const toastStore = useToastStore()

  // Router
  const router = useRouter()
  const route = useRoute()

  // Computed properties
  const isLoggedIn = computed(() => authStore.isLoggedIn)
  const user = computed(() => authStore.user)
  const routeName = computed(() => route.name)

  // Methods
  const onLogout = async () => {
    authStore.clear()
    await router.push('/')
    toastStore.success(MESSAGES.LOGOUT_SUCCESS)
  }

  const redirectToFeed = async () => {
    await router.push('/feed')
  }

  const redirectToProfile = async () => {
    await router.push(`/profile/${user.value.uuid}`)
  }

  const redirectToSearch = async () => {
    await router.push('/search')
  }

  const isActiveRoute = (targetRoute: string): boolean => {
    return routeName.value === targetRoute
  }

  // Initialize auth on component mount
  onMounted(() => {
    authStore.initializeAuth()
  })
</script>
