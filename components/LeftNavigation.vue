<template>
  <v-navigation-drawer
    class="left-navigation-drawer"
    temporary
    v-model="_drawer"
    color="saber"
    width="256"
    fixed
  >
    <div class="nav-bar-header">
      <div class="nav-bar-header-btn-group">
        <v-btn
          @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
          depressed
          text
          icon
          color="elaina"
        >
          <v-icon>
            {{ $vuetify.theme.dark ? 'mdi-brightness-5' : 'mdi-brightness-2' }}
          </v-icon>
        </v-btn>
        <v-btn depressed text icon color="elaina">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </div>
      <div class="nav-bar-header-avatar">
        <v-avatar size="128">
          <v-img :src="avatar || require('~/static/images/Delta.jpg')" alt="" />
        </v-avatar>
        <v-list-item-title class="title">
          <v-icon>mdi-account</v-icon>
          <span class="username">{{ username }}</span>
        </v-list-item-title>
      </div>
    </div>
    <div class="nav-container">
      <div class="nav-content">
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="route in routes"
              :to="route.to"
              :key="route.value"
              class="rounded"
              nuxt
            >
              <v-list-item-icon>
                <v-icon>{{ route.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ route.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </div>
    <div slot="append" class="container nav-footer">
      <client-only>
        <v-btn
          block
          rounded
          color="blue"
          v-if="!authority"
          @click="_showAccount"
          >登录</v-btn
        >
        <div class="authority" v-else>
          <v-btn text>
            <v-icon>mdi-cog</v-icon>
            设置
          </v-btn>
          <v-btn text @click="onLogout">
            <v-icon>mdi-exit-to-app</v-icon>
            退出
          </v-btn>
        </div>
      </client-only>
    </div>
  </v-navigation-drawer>
</template>
<script>
import routes from '../config/routes'
import logout from '~/utils/logout'
import { mapGetters, mapState } from 'vuex'
export default {
  props: {
    value: Boolean,
  },

  data() {
    return {
      drawer: this.value,
      routes,
      onLogout: logout.bind(this)
    }
  },

  inject: {
    showAccount: {
      type: Function,
    },
  },

  computed: {
    ...mapGetters(['authority', 'username', 'avatar']),

    _drawer: {
      set(value) {
        this.drawer = value
        this.$emit('input', value)
      },
      get() {
        return this.drawer && this.$vuetify.breakpoint.mobile
      },
    },
  },

  watch: {
    value() {
      this.drawer = this.value
    },
  },

  methods: {
    _showAccount() {
      this._drawer = false
      this.showAccount()
    },
  },
}
</script>
<style lang="scss">
@import '../assets/colors.scss';
.left-navigation-drawer {
  .v-navigation-drawer__content {
    background-color: #2955ba;
  }
  .nav-bar-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: $saber;
    min-height: 0px;
    &-btn-group {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
    }

    &-avatar {
      padding: 24px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .title {
        margin-top: 18px;
        font-family: 'UniNeue' !important;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        justify-content: baseline;
        .username {
          display: inline-block;
          margin-left: 4px;
        }
      }
    }

    .nav-container {
      background-color: #1a1d53 !important;

      .nav-content {
        background-color: #242663 !important;
        border-radius: 30px 30px 0 0;
        padding: 30px 0;
      }
    }
  }
  .nav-container {
    background-color: $saber;
    .nav-content {
      background-color: #2955ba !important;
      border-radius: 30px 30px 0 0;
      padding: 30px 0;
      .v-list.v-sheet {
        background-color: #2955ba !important;
      }
      .v-list {
        margin: 0px auto;
        width: 200px;
      }
      .v-list-item {
        margin-bottom: 8px;
        min-height: 40px;
        border-radius: 32px !important;
        &__icon {
          margin: 8px 0;
          margin-right: 32px;
        }
        &__content {
          padding: 4px 0;
        }
      }
      .v-list-item:focus::before,
      .v-list-item:hover::before,
      .v-list-item--active::before {
        opacity: 0 !important;
      }
    }
  }

  .authority {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .v-btn .v-icon {
      margin-right: 8px;
    }
    .v-btn.theme--light {
      color: #ffffff;
    }
    .v-btn.theme--dark {
      color: #ffffff;
    }
  }

  &.theme--light {
    .v-list-item__title.title {
      color: #ffffff;
    }
    .v-navigation-drawer__content {
      a.v-list-item,
      .v-icon {
        color: #ffffff !important;
      }
    }
  }
  .container.nav-footer .v-btn__content {
    color: #fff;
  }
}
</style>
