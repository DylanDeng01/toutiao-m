/**
 * PostCss配置文件
 */

module.exports = {
  plugins: {
    // vue/cli内部已经配置了autoprefixer，所以产生了冲突，注释掉
    // autoprefixer作用：生成浏览器css样式规则前缀，兼容不同版本浏览器
    // 'autoprefixer':{
    //  配置要兼容到的环境信息
    //   browsers: [
    //     "Android >= 4.0",
    //     "iOS >= 8"
    //   ]
    // },

    // px 转 rem
    'postcss-pxtorem': {
      // 根元素的值，lib-flexible的rem适配方案，把一行分为10份，每一份是1/10
      // 所有rootValue 应该设置为设计稿宽度的1/10
      // 我们设计稿是750,所有应该设置为75
      // 但是vant建议设置37.5,为什么?因为vant是基于375写的
      // 所有必须设置为37.5,唯一缺点就是使用我们设计稿的尺寸都必须/2
      // 有没有更好的办法?
      //    如果是Vant样式,就按照 37.5 来转换
      //    如果是 我们自己的样式,就按照 75 来转换
      // 通过查阅文档,我们发现 rootValue 支持两种类型
      //    数字:固定数字
      //    函数:可以动态处理返回
      //        postcss -pxtorem 处理每个css文件的时候都回来调用rootValue函数
      //        它会把被处理的css 文件相关信息通过参数传递给该函数
      rootValue({ file }) {
        // console.log(file,'处理的文件 ');
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // rootValue: 37.5,

      // propList需要转换的css属性
      // * 代表所有
      propList: ['*']
    }
  }
}
