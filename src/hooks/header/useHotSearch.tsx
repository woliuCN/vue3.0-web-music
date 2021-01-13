import { onMounted, ref } from 'vue'
import { getHotSearchLists } from '@/api/search'
interface HotList {
  searchWord: string;
  score: number;
  content: string;
  iconUrl: string;
  [propsName: string]: any;
}
export default function useHotSearch (keyWords, isFocus, $router) {
  const hotSearchLists = ref<HotList[]>([])
  const handleSelectHotItem = (searchWord: string) => {
    keyWords.value = searchWord; isFocus.value = false; $router.push(`/search/${keyWords.value}`)
  }
  // 渲染热搜列表
  const renderHotSearchList = () => {
    return <div class="hot-list">
      <h1 class="title">热搜榜</h1>
      <ul>
        {hotSearchLists.value.map((item, index) => {
          return <li class="list-item" onClick={() => handleSelectHotItem(item.searchWord)}>
            <div class={`index ${index + 1 > 3 ? '' : 'red'}`} > {index + 1} </div>
            <div class="content">
              <div class="header">
                <span class={`word ${index + 1 > 3 ? '' : 'bold'}`} > {item.searchWord}</span>
                {item.iconUrl ? <img src={item.iconUrl} /> : null}
                <span class="scope">{item.score}</span>
              </div>
              <div class="desc">
                {item.content}
              </div>
            </div>
          </li>
        })}
      </ul>
    </div>
  }
  const _getHotSearchLists = async () => {
    const { data: { data } } = await getHotSearchLists()
    hotSearchLists.value = data
  }
  onMounted(() => {
    _getHotSearchLists()
  })
  return {
    renderHotSearchList
  }
}
