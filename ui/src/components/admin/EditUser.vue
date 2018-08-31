<template>
  <article v-if="isAdmin">
    <section class="edituser">
      <h2>ユーザ編集</h2>
      <section v-for="(user, idx) in users" :key="user.id">
        <h3>UserID: {{ user.id }}</h3>
        <form v-on:submit.prevent="editUser(idx)">
          <div class="field">
            <div class="label">
              <label for="password">password:</label>
            </div>
          </div>
          <div class="input">
            <input class="password" type="password" name="password" v-model="user.password">
          </div>
          <div class="field">
            <div class="label">
              <label for="role">role:</label>
            </div>
          </div>
          <div class="input">
            <input class="text" type="text" name="text" v-model="user.role">
          </div>
          <div class="submit">
            <button type="submit">Submit</button>
          </div>
        </form>
        <div class="success" v-if="isSuccess">Success!</div>
        <div class="error" v-if="isError">Invalid data</div>
      </section>
    </section>
  </article>
</template>

<script>
import {HTTP} from '../Header'

export default {
  data () {
    return {
      users: [],
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
    HTTP.get('users',
      {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(response => {
        this.$data.users = response.data.results.users
      })
  },
  methods: {
    editUser: function (id) {
      HTTP.put('users/' + String(this.$data.users[id].id),
        this.$data.users[id],
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

</style>
