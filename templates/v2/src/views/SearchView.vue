<template>
    <div>
        <div class="content">
            <div class="city clearfix">
                <div class="from">
                    <p class="label">国内/国际出发城市</p>
                    <p class="in-city">北京</p>
                </div>
                <em class="exchange">交换</em>
                <div class="to">
                    <p class="label">国内/国际到达城市</p>
                    <p class="in-city">上海</p>
                </div>
            </div>
            <div class="date clearfix">
                <p class="label">出发日期</p>
                <p class="data">
                    <span class="highlight">{{Date.today().addDays(1).format('MM月dd日')}}</span>&nbsp;<span>明天</span>
                </p>
            </div>
            <x-button type="primary" text="飞机票查询" class="search" @click.native="search"></x-button>
        </div>
        <search-history></search-history>
    </div>
</template>

<script>
	import {XButton} from '../components/widgets'
	import utils from '../common/utils'
	import SearchHistory from '../components/SearchHistory.vue'
	import '../common/dateUtils.js'

	export default {
		name: 'SearchView',
		components: {
			XButton,
			SearchHistory
		},
		methods: {
			search: function () {
				// TODO: 测试用的Cookie
//       utils.addCookie('CooperateQqUser', 'openid=808696C213B37DAA5EA2233D9E5D0D01&userid=n/535Dc86c3aiUiGNjg1ag==&MemberSysId=43', 365)
//       utils.addCookie('cookieOpenSource', 'openid=808696C213B37DAA5EA2233D9E5D0D01&token=', 365)
      localStorage.removeItem('finalFilter');
       this.$router.push({
         name: 'book1',
         params: {
           from: 'BJS',
           to: 'SHA',
           fromCity: '北京',
           toCity: '上海',
           date: Date.today().addDays(1).format('yyyy-MM-dd'),
         }
       })
    }
  }
}
</script>

<style lang="less" scoped>
    @border-color: #dedede;

    .content {
        background-color: #fff;
        padding: 0 10px 13px;
        border-bottom: 1px solid @border-color;
    }

    .city {
        padding: 17px 0 14px 0;
        position: relative;
        border-bottom: 1px solid @border-color;

        & > div {
            float: left;
            width: 50%;
            position: relative;
        }
        .to {
            text-align: right;
        }

        .label {
            font-size: 15px;
            color: #7f7f7f;
            padding: 0 0 12px 0;
        }

        .in-city {
            position: relative;
            height: 32px;
            padding-bottom: 0;
            font-size: 20px;
            color: #000;
            width: 100%;
            line-height: 30px;
        }

        .exchange {
            position: absolute;
            left: 50%;
            margin-left: -8px;
            top: 50px;
        }
    }

    .date {
        line-height: 55px;
        background-position: -10px -10px;
        border-bottom: 1px solid @border-color;
        position: relative;
        font-size: 15px;

        .label {
            float: left;
        }

        .data {
            float: right;

            .highlight {
                color: #f60;
            }
        }
    }

    .search {
        margin-top: 13px;
    }
</style>
