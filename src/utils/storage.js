/**
 * 封装本地存储的操作模块
 */

/**
 * 存储数据
 */
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    // 对象格式数据转化为JSON字符串格式
    value = JSON.stringify(value)
  }
  // 存储
  localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getItem = (key) => {
  // 获取数据
  const data = localStorage.getItem(key)
  try {
    // 尝试转化为对象格式
    return JSON.parse(data)
  } catch (error) {
    // 无法转化为对象格式，直接获取字符串
    return data
  }
}

/**
 * 删除数据
 */
export const removeItem = key => {
  localStorage.removeItem(key)
}
