import { AxiosResponse } from 'axios'
import { SEARCH_TYPE } from '@/utils/constant'
import { getRequest } from '../request'
import { convertSearchInfo, convertSearchSuggest } from './translate'
const REQUEST_URL = {
  hotSearch: '/search/hot/detail',
  searchSuggest: '/search/suggest',
  cloudsearch: '/cloudsearch'
}

// 获取热们歌单分类
export const getHotSearchLists = () => {
  return getRequest(REQUEST_URL.hotSearch)
}

export const getSearchSuggest = (keywords: string) => {
  return getRequest(REQUEST_URL.searchSuggest, { keywords }).then(convertSearchSuggest)
}

export const getSearchInfo = (keywords: string, type: string, currentPage: number) => {
  return getRequest(REQUEST_URL.cloudsearch, { keywords, type: SEARCH_TYPE[type].type, limit: SEARCH_TYPE[type].limit, offset: (currentPage - 1) * SEARCH_TYPE[type].limit }).then((res: AxiosResponse<any>) => convertSearchInfo(res, type))
}
