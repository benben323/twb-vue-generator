<template>
  <div class="history">
    <div class="title">最近查询</div>
    <ul class="list">
      <li><span class="from">北京</span><span class="to">上海</span></li>
      <li><span class="from">北京</span><span class="to">上海</span></li>
      <li><span class="from">北京</span><span class="to">上海</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory'
}
</script>

<style lang="less">
@border-color: #dedede;

.history {
  text-align: center;
  padding: 10px 0;

  .title {
    font-size: 14px;
    position: relative;

    &::before {
      content: "";
      border-top: 1px solid @border-color;
      position: absolute;
      right: 50%;
      top: 7px;
      left: 35px;
      margin-right: 40px;
    }

    &::after {
      content: "";
      border-top: 1px solid @border-color;
      position: absolute;
      left: 50%;
      top: 7px;
      right: 35px;
      margin-left: 40px;
    }
  }

  .list {
    padding-top: 20px;
    font-size: 12px;

    li {
      padding-bottom: 10px;
    }

    .from {
      padding-right: 80px;
      position: relative;

      &::after {
        content: "";
        border-top: 1px solid @border-color;
        position: absolute;
        width: 60px;
        top: 6px;
        left: 50%;
        margin-left: -18px;
      }
    }
  }
}
</style>
