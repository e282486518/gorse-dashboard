<template>
  <d-card class="card-small">
    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
      <div class="block-handle"></div>
    </d-card-header>

    <d-card-body class="p-0">
      <!-- Top Referrals List Group -->
      <d-list-group flush class="list-group-small">
        <d-list-group-item
          v-for="(item, idx) in items"
          :key="idx"
          class="d-flex px-3"
        >
          <span class="text-semibold text-fiord-blue"><i class="material-icons mr-1">{{ item.icon }}</i>{{ item.name }}</span>
          <span class="ml-auto text-right text-semibold text-reagent-gray"
            >{{ format(query(item.key)) }}</span
          >
        </d-list-group-item>
      </d-list-group>
    </d-card-body>
    <d-card-footer> </d-card-footer>
  </d-card>
</template>

<script>
import moment from 'moment';

const axios = require('axios');
const jsonPath = require('jsonpath');

export default {
  name: 'users-by-device',
  props: {
    title: {
      type: String,
      default: 'System Status',
    },
  },
  data() {
    return {
      items: [
        { icon: 'label', name: '主版本', key: '$.BinaryVersion' },
        { icon: 'dns', name: '工作节点数', key: '$.NumWorkers' },
        { icon: 'dns', name: '服务器数量', key: '$.NumServers' },
        { icon: 'tag', name: 'User标签数', key: '$.NumUserLabels' },
        { icon: 'tag', name: 'Item标签数', key: '$.NumItemLabels' },
        { icon: 'trending_up', name: '热门Items更新时间', key: '$.PopularItemsUpdateTime' },
        { icon: 'trending_up', name: '最新Items更新时间', key: '$.LatestItemsUpdateTime' },
        { icon: 'group_work', name: '匹配模型拟合时间', key: '$.MatchingModelFitTime' },
        { icon: 'group_work', name: '匹配模型精度@10', key: '$.MatchingModelScore.Precision' },
        { icon: 'group_work', name: '匹配模型召回率@10', key: '$.MatchingModelScore.Recall' },
        { icon: 'group_work', name: '配模型NDCG@10', key: '$.MatchingModelScore.NDCG' },
        { icon: 'ads_click', name: '排名模型拟合时间', key: '$.RankingModelFitTime' },
        { icon: 'ads_click', name: '排名模型精度', key: '$.RankingModelScore.Precision' },
        { icon: 'ads_click', name: '排名模型召回', key: '$.RankingModelScore.Recall' },
        { icon: 'ads_click', name: '排名模型AUC', key: '$.RankingModelScore.AUC' },
        { icon: 'travel_explore', name: 'User邻居索引召回', key: '$.UserNeighborIndexRecall' },
        { icon: 'travel_explore', name: 'Item邻居索引召回', key: '$.ItemNeighborIndexRecall' },
        { icon: 'travel_explore', name: '匹配索引召回', key: '$.MatchingIndexRecall' },
      ],
      status: {},
    };
  },
  mounted() {
    axios.get('/api/dashboard/stats').then((res) => {
      this.status = res.data;
    });
  },
  methods: {
    query(path) {
      if (!(typeof path === 'string') || !path.startsWith('$')) {
        return '';
      }
      return jsonPath.query(this.status, path)[0];
    },
    format(data) {
      if (typeof data === 'number') {
        return data;
      }
      if (data === '') {
        return '';
      }
      const date = moment(String(data));
      if (date.isValid()) {
        return date.format('YYYY/MM/DD HH:mm');
      }
      return data;
    },
  },
};
</script>
