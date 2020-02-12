// components/search/index.js
import {
  KeywordModel
} from '../../models/keyWord'
import {
  BookModel
} from "../../models/book";
const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
  },

  lifetimes: {
    attached() {
      this.setData({
        historyWords: keywordModel.getHistory()
      })
      keywordModel.getHot().then(res => {
        this.setData({
          hotWords: res.hot
        })
      })

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onCancel() {
      this.triggerEvent('cancel', {}, {})
    },

    onConfirm(event) {
      const q = event.detail.value

      bookModel.search(0, q).then(res => {
        this.setData({
          dataArray: res.books,
          finished: true,
        })
        keywordModel.addToHistory(q)
      })
    },

    onDelete() {
      this.setData({
        finished: false
      })
    }
  }
})