import { getBoutiqueLists } from '@/api/playlist'
import { VuexModule, Module, Mutation, getModule, Action } from 'vuex-module-decorators'
import store from '../index'
@Module({ dynamic: true, namespaced: true, name: 'playlist', store })
class Playlist extends VuexModule {
    activeCat = ''
    currentBoutiquelists: PlayListItem[] = []

    @Mutation
    CHANGE_ACTIVECAT (cat: string) {
      this.activeCat = cat
    }

    @Mutation
    CHANGE_BOUTQUELISTS (list: PlayListItem[]) {
      this.currentBoutiquelists = list
    }

    @Action
    getBoutiquelists (cat: string) {
      getBoutiqueLists(cat)
        .then(({ playlists }) => {
          this.CHANGE_BOUTQUELISTS(playlists)
        })
    }
}

export const playlistStore = getModule(Playlist)
