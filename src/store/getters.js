export default {
  getDateStr: (state) => (date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
    const year = date.getFullYear()
    const month = '0' + (date.getMonth() + 1)
    const day = ('0' + date.getDate()).substr(-2)
    const hour = ('0' + date.getHours()).substr(-2)
    const minute = ('0' + date.getMinutes()).substr(-2)
    const second = ('0' + date.getSeconds()).substr(-2)
    switch (format) {
      case 'YYYY-MM-DD HH:mm:ss': return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }
  }
}
