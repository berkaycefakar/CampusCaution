import { createStore } from 'vuex'
import AuthService from '../services/auth.service'

// Kampüs sınırları içinde rastgele nokta üreten yardımcı fonksiyon
function getRandomInRange(from, to) {
  return from + Math.random() * (to - from);
}

// Bir noktanın polygon içinde olup olmadığını kontrol eden fonksiyon
function isPointInPolygon(point, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][1], yi = polygon[i][0];
    const xj = polygon[j][1], yj = polygon[j][0];
    const intersect = ((yi > point[0]) !== (yj > point[0])) &&
      (point[1] < (xj - xi) * (point[0] - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function generateRandomPoint() {
  const kampusSinirlari = [
    [36.899694, 30.634019],
    [36.887765, 30.640463],
    [36.888079, 30.655371],
    [36.882754, 30.656119],
    [36.885279, 30.662316],
    [36.901071, 30.665057]
  ];

  let point;
  do {
    const lat = getRandomInRange(36.882754, 36.901071);
    const lng = getRandomInRange(30.634019, 30.665057);
    point = [lat, lng];
  } while (!isPointInPolygon(point, kampusSinirlari));

  return point;
}

export default createStore({
  state: {
    issues: [
      {
        id: 1,
        title: 'Kırık Bank',
        description: 'Merkezi kütüphane önündeki bank kırılmış durumda.',
        status: 'Açık',
        priority: 'Orta',
        location: generateRandomPoint(),
        image: 'https://placehold.co/600x400',
        createdAt: '2024-12-24 10:00'
      },
      {
        id: 2,
        title: 'Bozuk Aydınlatma',
        description: 'Mühendislik fakültesi yolundaki sokak lambası çalışmıyor.',
        status: 'İncelemede',
        priority: 'Yüksek',
        location: generateRandomPoint(),
        image: 'https://placehold.co/600x400',
        createdAt: '2024-12-24 09:30'
      },
      {
        id: 3,
        title: 'Su Sızıntısı',
        description: 'Fen fakültesi B blok girişinde su sızıntısı var.',
        status: 'Açık',
        priority: 'Acil',
        location: generateRandomPoint(),
        image: 'https://placehold.co/600x400',
        createdAt: '2024-12-24 11:15'
      }
    ],
    selectedIssue: null,
    isAuthenticated: !!localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    loginError: null
  },
  mutations: {
    setSelectedIssue(state, issue) {
      state.selectedIssue = issue;
    },
    updateIssueStatus(state, { id, status }) {
      const issue = state.issues.find(issue => issue.id === id);
      if (issue) {
        issue.status = status;
      }
    },
    deleteIssue(state, id) {
      state.issues = state.issues.filter(issue => issue.id !== id);
      if (state.selectedIssue?.id === id) {
        state.selectedIssue = null;
      }
    },
    loginSuccess(state, user) {
      state.isAuthenticated = true;
      state.user = user;
      state.loginError = null;
    },
    loginFailure(state, error) {
      state.isAuthenticated = false;
      state.user = null;
      state.loginError = error;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  actions: {
    selectIssue({ commit }, issue) {
      commit('setSelectedIssue', issue);
    },
    updateIssueStatus({ commit }, payload) {
      commit('updateIssueStatus', payload);
    },
    deleteIssue({ commit }, id) {
      commit('deleteIssue', id);
    },
    async login({ commit }, { username, password }) {
      try {
        const response = await AuthService.login(username, password);
        commit('loginSuccess', response.user);
        return Promise.resolve(response);
      } catch (error) {
        commit('loginFailure', error.response?.data?.message || 'Login failed');
        return Promise.reject(error);
      }
    },
    async register({ commit }, { username, email, password }) {
      try {
        const response = await AuthService.register(username, email, password);
        commit('loginSuccess', response.data.user);
        return Promise.resolve(response.data);
      } catch (error) {
        commit('loginFailure', error.response?.data?.message || 'Registration failed');
        return Promise.reject(error);
      }
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    }
  },
  getters: {
    getIssues: state => state.issues,
    getSelectedIssue: state => state.selectedIssue,
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user,
    loginError: state => state.loginError
  }
})