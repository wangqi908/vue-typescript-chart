import { Vue, Component, Watch } from 'vue-property-decorator'
import { searchReset } from '@/utils'
@Component
export default class PageMixin extends Vue {
  [x: string]: any
  pageNum = 0 //
  currentPage = 1
  pageSize = this.$store.state.pageSize
  info = {}
  multipleSelection = [] //多选
  activeId = '' //当前id
  showDialog = false
  currentCom: any = ''

  // 点击分页
  handleCurrentChange(val: number) {
    this.pageNum = val - 1
    this.renderTable()
  }

  //多选
  handleSelectionChange(val: []) {
    this.multipleSelection = val
  }

  //查询
  search() {
    this.pageNum = 0
    this.currentPage = 1
    this.renderTable()
  }

  //重置查询
  reset() {
    this.searchData = searchReset(this.searchData)

    this.pageNum = 0
    this.currentPage = 1
    this.renderTable()
  }

  // 删除
  del() {
    if (this.multipleSelection.length === 0) {
      this.$message.warning('请选择要删除对象')
      return false
    }
    this.showDialog = true
  }

  // 操作成功
  handleClose() {
    this.renderTable()
  }

  @Watch('showDialog')
  toggleShowDialog(val: boolean) {
    if (!val) {
      this.currentCom = ''
    }
  }
  // watch: {
  //   showDialog(val) {
  //     if (!val) {
  //       this.currentCom = ''
  //     }
  //   }
  // }
}
