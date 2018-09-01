<template>
  <article v-if="isAdmin">
    <section class="challenge">
      <h2>問題削除</h2>
      <form v-on:submit.prevent="deleteChallenge">
        <div class="field">
          <div class="label">
            <label for="title">Id:</label>
          </div>
          <div class="input">
            <input class="challenge_id" type="number" name="challenge_id" v-model="challenge.Id">
          </div>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div class="success" v-if="isSuccess">Success!</div>
      <div class="error" v-if="isFailed">Failed</div>
      <h2>通知削除</h2>
      <form v-on:submit.prevent="deleteNotification">
        <div class="field">
          <div class="label">
            <label for="title">Id:</label>
          </div>
          <div class="input">
            <input class="notification_id" type="number" name="notification_id" v-model="notification.Id">
          </div>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div class="success" v-if="isSuccess">Success!</div>
      <div class="error" v-if="isFailed">Failed</div>
      <h2>ユーザ削除</h2>
      <form v-on:submit.prevent="deleteUser">
        <div class="field">
          <div class="label">
            <label for="title">Id:</label>
          </div>
          <div class="input">
            <input class="user_id" type="number" name="user_id" v-model="user.Id">
          </div>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div class="success" v-if="isSuccess">Success!</div>
      <div class="error" v-if="isFailed">Failed</div>
    </section>
  </article>
</template>

<script>
import {HTTP} from '../Header'

export default {
  data () {
    return {
      challenge: {
        Id: 0
      },
      notification: {
        Id: 0
      },
      user: {
        Id: 0
      },
      isSuccess: false,
      isFailed: false,
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
      .catch(e => {
      })
  },
  methods: {
    deleteChallenge: function () {
      HTTP.delete('challenges/' + String(this.$data.challenge.Id),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          withCredentials: true
        })
        .then(response => {
          this.$data.isFailed = false
          this.$data.isSuccess = true
          setTimeout(() => {
            this.$data.isSuccess = false
          }, 3000)
        })
        .catch(e => {
          this.$data.isFailed = true
        })
    },
    deleteNotification: function () {
      HTTP.delete('notification/' + String(this.$data.notification.Id),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          withCredentials: true
        })
        .then(response => {
          this.$data.isFailed = false
          this.$data.isSuccess = true
          setTimeout(() => {
            this.$data.isSuccess = false
          }, 3000)
        })
        .catch(e => {
          this.$data.isFailed = true
        })
    },
    deleteUser: function () {
      HTTP.delete('users/' + String(this.$data.user.Id),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          withCredentials: true
        })
        .then(response => {
          this.$data.isFailed = false
          this.$data.isSuccess = true
          setTimeout(() => {
            this.$data.isSuccess = false
          }, 3000)
        })
        .catch(e => {
          this.$data.isFailed = true
        })
    }
  }
}
</script>

<style scoped>
article {
  display: -webkit-flex;
  display: flex;
}
section {
  -webkit-justify-content: space-around;
  justify-content: space-around;
  margin: 0 auto;
}
label {
  width: 8vw;
}
input, button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-family: "a-otf-ud-shin-maru-go-pr6n";
  font-size: 20px;
  border: solid 2px #6688cc;
  border-radius: 5px;
  outline: 0;
}
input:focus {
  border: solid 2px #6699cc;
  border-radius: 5px;
}
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-family: "a-otf-ud-shin-maru-go-pr6n";
  font-size: 20px;
  border: solid 2px #6688cc;
  border-radius: 5px;
  outline: 0;
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
}
button:active {
  background: #4679ac;
}
.field {
  margin: 0 auto 5vh auto;
  padding: 5px;
  font-size: 24px;
  font-weight: 700;
  width: 80vw;
}
.contents {

}
.label {
  text-align: center;
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
