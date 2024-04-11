
export const isDebug = import.meta.env.MODE !== 'production'; // development test production

/**
 * 自适应布局方式
 * pc: 无缩放
 * h5: 移动端自适应布局，根据根 fontSize 自动缩放 (视觉设计稿 375)
 * auto: 视口宽度 <= 640 的时候自动 切换为 h5模式
 * */
export const adaptLayout = 'auto'; // pc, h5, auto