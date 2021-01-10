import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators'
import store from '../index'
export type ThemeType = 'dark' | 'red'

@Module({ dynamic: true, namespaced: true, name: 'theme', store })
class Theme extends VuexModule {
    themeType: ThemeType = 'red'

    @Mutation
    changeTheme (type: ThemeType) {
      this.themeType = type
    }
}

export const themeStore = getModule(Theme)
