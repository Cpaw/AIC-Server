import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Challenges from '@/components/Challenges'
import Challenge from '@/components/Challenge'
import Ranking from '@/components/Ranking'
import Notification from '@/components/Notification'
import Auth from '@/components/Auth'
import Admin from '@/components/Admin'
import AddChallenge from '@/components/admin/AddChallenge'
import EditChallenge from '@/components/admin/EditChallenge'
import EditUser from '@/components/admin/EditUser'
import EditNotification from '@/components/admin/EditNotification'
import UploadAnswer from '@/components/admin/UploadAnswer'
import AddNotification from '@/components/admin/AddNotification'
import Delete from '@/components/admin/Delete'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/challenges',
      name: 'challenges',
      component: Challenges
    },
    {
      path: '/challenge/:challenge_id',
      name: 'challenge',
      component: Challenge
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/notification',
      name: 'notification',
      component: Notification
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/admin/addchallenge',
      name: 'addchallenge',
      component: AddChallenge
    },
    {
      path: '/admin/editchallenge',
      name: 'editchallenge',
      component: EditChallenge
    },
    {
      path: '/admin/edituser',
      name: 'edituser',
      component: EditUser
    },
    {
      path: '/admin/uploadanswer',
      name: 'uploadanswer',
      component: UploadAnswer
    },
    {
      path: '/admin/addnotification',
      name: 'addnotification',
      component: AddNotification
    },
    {
      path: '/admin/delete',
      name: 'delete',
      component: Delete
    },
    {
      path: '/admin/editnotification',
      name: 'editnotification',
      component: EditNotification
    }
  ]
})
