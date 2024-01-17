<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">导入导出</h3>
      </div>
    </div>

    <!-- Default Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <h6 class="m-0">数据导出</h6>
          </div>
          <div class="card-body p-0 pb-3">
            <d-list-group flush>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col sm="12" md="2">
                    <a :href="'/api/bulk/users'">
                      <d-button class="advance_button" outline
                        >&nbsp;&nbsp;&nbsp;导出
                        Users&nbsp;&nbsp;&nbsp;</d-button
                      >
                    </a>
                  </d-col>
                  <d-col sm="12" md="10">
                    <label
                      >导出 users 到 csv 文件. 其格式为 "user_id,
                      labels".</label
                    >
                  </d-col>
                </d-row>
              </d-list-group-item>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col sm="12" md="2">
                    <a :href="'/api/bulk/items'">
                      <d-button class="advance_button" outline
                        >&nbsp;&nbsp;&nbsp;导出
                        Items&nbsp;&nbsp;&nbsp;</d-button
                      >
                    </a>
                  </d-col>
                  <d-col sm="12" md="10">
                    <label
                      >导出 items 到 csv 文件. 其格式为 "item_id, is_hidden, categories,
                      timestamp, labels, description".</label
                    >
                  </d-col>
                </d-row>
              </d-list-group-item>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col sm="12" md="2">
                    <a :href="'/api/bulk/feedback'">
                      <d-button outline>导出 Feedback</d-button>
                    </a>
                  </d-col>
                  <d-col sm="12" md="10">
                    <label
                      >导出 feedbacks 到 csv 文件. 其格式为
                      "feedback_type, user_id, item_id, timestamp".</label
                    >
                  </d-col>
                </d-row>
              </d-list-group-item>
            </d-list-group>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <h6 class="m-0">数据导入</h6>
          </div>
          <div class="card-body p-0 pb-3">
            <d-list-group flush>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col sm="12" md="2">
                    <router-link :to="{ name: 'import_users' }">
                      <d-button outline
                        >&nbsp;&nbsp;&nbsp;导入
                        Users&nbsp;&nbsp;&nbsp;</d-button
                      >
                    </router-link>
                  </d-col>
                  <d-col sm="12" md="10">
                    <label>导入 users 数据.</label>
                  </d-col>
                </d-row>
              </d-list-group-item>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col sm="12" md="2">
                    <router-link :to="{ name: 'import_items' }">
                      <d-button outline
                        >&nbsp;&nbsp;&nbsp;导入
                        Items&nbsp;&nbsp;&nbsp;</d-button
                      >
                    </router-link>
                  </d-col>
                  <d-col sm="12" md="10">
                    <label>导入 items 数据.</label>
                  </d-col>
                </d-row>
              </d-list-group-item>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col sm="12" md="2">
                    <router-link :to="{ name: 'import_feedback' }">
                      <d-button outline>导入 Feedback</d-button>
                    </router-link>
                  </d-col>
                  <d-col sm="12" md="10">
                    <label>导入 feedbacks 数据.</label>
                  </d-col>
                </d-row>
              </d-list-group-item>
            </d-list-group>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <h6 class="m-0">Danger Zone</h6>
          </div>
          <div class="card-body p-0 pb-3">
            <d-list-group flush>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col sm="12" md="2">
                    <d-button outline theme="danger" @click.native="handleClick"
                    >&nbsp;清除数据&nbsp;</d-button
                    >
                    <d-modal v-if="showDialog" @close="handleClose" centered>
                      <d-modal-header>
                        <d-modal-title>Are you absolutely sure?</d-modal-title>
                      </d-modal-header>
                      <d-modal-body>
                        <label>This action <span style="color: red; font-weight: bold">cannot</span> be undone. This will permanently:</label>
                        <d-checkbox v-model="checkList" value="delete_users">Delete all users.</d-checkbox>
                        <d-checkbox v-model="checkList" value="delete_items">Delete all items.</d-checkbox>
                        <d-checkbox v-model="checkList" value="delete_feedback">Delete all feedbacks.</d-checkbox>
                        <d-checkbox v-model="checkList" value="delete_cache">Delete all caches.</d-checkbox>
                        <d-alert :theme="alertTheme" :show="showAlert">{{ alertMessage }}</d-alert>
                        <d-button outline theme="danger" @click="purge" :disabled="disableDialog">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          I understand the consequences, purge all data
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </d-button>
                      </d-modal-body>
                    </d-modal>
                  </d-col>
                  <d-col sm="12" md="10">
                    <label>清除数据存储和缓存存储中的所有数据.</label>
                  </d-col>
                </d-row>
              </d-list-group-item>
            </d-list-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  data() {
    return {
      showDialog: false,
      checkList: [],
      alertMessage: '',
      alertTheme: '',
      showAlert: false,
      disableDialog: false,
    };
  },
  methods: {
    handleClick() {
      this.showDialog = true;
      this.showAlert = false;
      this.disableDialog = false;
      this.checkList = [];
    },
    handleClose() {
      this.showDialog = false;
    },
    purge() {
      this.disableDialog = true;
      const params = new URLSearchParams();
      params.append('check_list', this.checkList);
      axios.post('api/purge', params)
        .then(() => {
          this.alertMessage = 'purge database successfully';
          this.alertTheme = 'success';
          this.showAlert = true;
          setTimeout(() => {
            this.showDialog = false;
          }, 500);
        })
        .catch((error) => {
          if (error.response) {
            this.alertMessage = error.response.data;
          } else {
            this.alertMessage = error;
          }
          this.alertTheme = 'danger';
          this.showAlert = true;
          this.disableDialog = false;
        });
    },
  },
};
</script>
