import { defineComponent, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { themeStore } from '@/store/modules/theme'
import useHotSearch from '@/hooks/header/useHotSearch.tsx'
import useCommonSearch from '@/hooks/header/useCommonSearch.tsx'
import { debounce } from '@/utils/util'
import './index.scss'
export default defineComponent({
  setup () {
    const $router = useRouter()
    const keyWords = ref<string>('')
    const isFocus = ref<boolean>(false)
    const themeType = computed(() => themeStore.themeType)
    const { renderHotSearchList } = useHotSearch(keyWords, isFocus, $router)
    const { getSearchList, renderSearchList } = useCommonSearch(keyWords, isFocus, $router)
    watch(keyWords, () => {
      handleInputChange()
    })
    const handleInputChange = debounce(() => {
      getSearchList()
    }, 300)
    const handeShowSearchInfo = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        isFocus.value = false
        $router.push(`/search/${keyWords.value}`)
      }
    }
    const directives = { value: () => { isFocus.value = false }, arg: 'search_input' }
    return () => (
      <div class="search">
        <input
          id="search_input"
          type="text"
          placeholder="搜索"
          v-model={keyWords.value}
          class={`search-input ${themeType.value}-cl-primary_3 ${themeType.value}-bg-primary_4`}
          onFocus={() => { isFocus.value = true }}
          onKeyup={handeShowSearchInfo}
        />
        <i class="iconfont icon-search"></i>
        { isFocus.value
          ? <div class="list-container" v-outside={directives}>
            {keyWords.value
              ? renderSearchList()
              : renderHotSearchList()
            }
          </div>
          : null
        }
      </div>
    )
  }
})
