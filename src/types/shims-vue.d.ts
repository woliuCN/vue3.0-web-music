declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 解决scss文件报错问题
declare module '*.scss'{
	const style: any
	export default style
}

declare module 'swiper'

declare module 'create-keyframe-animation'
