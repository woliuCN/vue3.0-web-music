import { VuexModule, Module, Mutation, getModule, Action } from 'vuex-module-decorators'
import store from '../index'
import { MODE } from '@/utils/constant'
import { getSongCommentInfo, getSongLyrics, getSimiSongs } from '@/api/player/index'
export interface Lyric {
  time: number;
  text: string;
}

export interface CurrentSongCommentInfo {
  hotComments: Comment[];
  comments: Comment[];
  total: number;
}

@Module({ dynamic: true, namespaced: true, name: 'player', store })
class Player extends VuexModule {
    currentSong: Song | null = null
    currentSongsStack: Song[] | null = null
    currentSongCommentInfo: CurrentSongCommentInfo = {
      hotComments: [],
      comments: [],
      total: 0
    }

    simiSongs: Song[] | null = null

    currentIndex = -1
    duration = 0
    playing = false
    volume = Number(window.localStorage.getItem('volume')) || 0.5
    mode = MODE.singleCycle
    lyrics: Lyric[] = []
    currentLyric = ''
    currentLineNo = 0

    // 改变当前歌曲
    @Mutation
    CHANGE_CURRENTSONG (song: Song) {
      this.currentSong = song
    }

    // 改变当前歌曲下标
    @Mutation
    CHANGE_CURRENTINDEX (index: number) {
      this.currentIndex = index
    }

    @Mutation
    CHANGE_VOLUME (volume: number) {
      this.volume = volume
      window.localStorage.setItem('volume', volume.toString())
    }

    // 改变当前歌曲列表
    @Mutation
    CHANGE_CURRENTSONGS_STACK (songs: Song[]) {
      this.currentSongsStack = songs
    }

    // 改变当前歌曲评论相关
    @Mutation
    CHANGE_CURRENTSONGS_COMMENTINFO (currentSongCommentInfo: CurrentSongCommentInfo) {
      this.currentSongCommentInfo = currentSongCommentInfo
    }

    // 改变当前歌曲播放状态
    @Mutation
    CHANGE_MODE () {
      this.mode = this.mode === MODE.randomPlay ? 0 : this.mode + 1
    }

    // 改变当前播放状态
    @Mutation
    CHANGE_PLAYING (status: boolean) {
      this.playing = status
    }

    @Mutation
    CHANGE_LYRICS (lyrics: Lyric[]) {
      this.lyrics = lyrics
    }

    @Mutation
    CHANGE_LYRIC (lyric: string) {
      this.currentLyric = lyric
    }

    @Mutation
    CHANGE_LINENO (no: number) {
      this.currentLineNo = no
    }

    @Mutation
    CHANGE_SIMISONGS (songs: Song[]) {
      this.simiSongs = songs
    }

    @Action
    async getSongLyrics () {
      const lyrics: Lyric[] = await getSongLyrics(this.currentSong.id) as Lyric[]
      this.CHANGE_LYRICS(lyrics)
    }

    @Action
    async getSimiSongs () {
      const songs: Song[] = await getSimiSongs(this.currentSong.id)
      this.CHANGE_SIMISONGS(songs)
    }

    @Action
    async getSongCommentInfo (currentPage = 1) {
      const currentSongCommentInfo: CurrentSongCommentInfo = await getSongCommentInfo(this.currentSong.id, currentPage)
      this.CHANGE_CURRENTSONGS_COMMENTINFO(currentSongCommentInfo)
    }
}

export const playerStore = getModule(Player)
