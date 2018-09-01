<template>
  <article v-if="isAdmin">
    <h2>問題編集</h2>
    <section v-for="(notification, idx) in notifications" :key="notification.id">
      <h3>NotificationID: {{notification.id}}</h3>
      <form v-on:submit.prevent="editNotification(idx)">
        <div class="field">
          <div class="label">
            <label for="title">Title:</label>
          </div>
          <div class="input">
            <input class="title" type="text" name="title" v-model="notification.title">
          </div>
        </div>
        <div class="field">
          <div class="label">
            <label for="contents">Notification text:</label>
          </div>
          <div class="contents">
            <textarea type="text" name="contents" v-model="notification.notification" cols="60" rows="5" />
          </div>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div class="success" v-if="isSuccess">Success!</div>
      <div class="error" v-if="isError">Invalid data</div>
    </section>
  </article>
</template>

<script>
import {HTTP} from '../Header'

export default {
  data () {
    return {
      notifications: [],
      isSuccess: false,
      isError: false,
      isAdmin: false
    }
  },
  mounted () {
    HTTP.get(`role`,
      {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(response => {
        if (response.data.results === 'admin') {
          this.$data.isAdmin = true
        }
      })
    HTTP.get(`notifications`,
      {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(response => {
        this.$data.notifications = response.data.results.notifications
      })
  },
  methods: {
    editNotification: function (id) {
      HTTP.put(`notifications/` + String(this.$data.notifications[id].id),
        this.$data.notifications[id],
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          withCredentials: true
        })
        .then(response => {
          this.$data.isSuccess = true
          this.$data.isError = false
          setTimeout(() => {
            this.$data.isSuccess = false
          }, 3000)
        })
        .catch(e => {
          this.$data.isSuccess = false
          this.$data.isError = true
        })
    }
  }

}
</script>

<style scoped>
section {
  background: white;
  width: 60vw;
  margin: 0 auto 1em auto;
  padding: 1em;
  border: solid 3.15px #6699cc;
  border-radius: 10px 10px;
}
button {
  position: relative;
  padding: 0.25em 0.5em;
  text-decoration: none;
  color: #fff;
  background: #6699cc;
  border: solid 2px #5386b9;
  font-size: 20px;
  font-family: "a-otf-ud-shin-maru-go-pr6n";
  font-weight: 700;
  width: 10vw;
}
button:hover {
  cursor: pointer;
  background: #76a9dc;
  transform: scale(1.01, 1.01);

}
button:active {
  background: #4679ac;
}
input, textarea {
  font-size: 16px;
}
.field {
  margin: 1em auto;
}
.label {
  font-size: 24px;
}
.success {
  margin: 2vh auto 2vh auto;
  font-size: 24px;
}
.error {
  margin: 2vh auto 2vh auto;
  font-size: 24px;
  color: #ff5d86;
}
</style>
