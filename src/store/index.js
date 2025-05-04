import { createStore } from 'vuex'

// Mock kullanıcılar (Sadece personel ve yöneticiler)
const mockUsers = {
  'ogrenci.isleri@akdeniz.edu.tr': {
    id: 1,
    name: 'Ayşe Yıldırım',
    email: 'ogrenci.isleri@akdeniz.edu.tr',
    password: 'admin123',
    role: 'STAFF',
    department: 'Öğrenci İşleri Daire Başkanlığı'
  },
  'sks@akdeniz.edu.tr': {
    id: 2,
    name: 'Mehmet Sağlık',
    email: 'sks@akdeniz.edu.tr',
    password: 'admin123',
    role: 'STAFF',
    department: 'Sağlık, Kültür ve Spor Dairesi Başkanlığı'
  },
  'guvenlik@akdeniz.edu.tr': {
    id: 3,
    name: 'Hakan Güvenç',
    email: 'guvenlik@akdeniz.edu.tr',
    password: 'admin123',
    role: 'STAFF',
    department: 'Koruma ve Güvenlik Şube Müdürlüğü'
  },
  'isg@akdeniz.edu.tr': {
    id: 4,
    name: 'Zehra Emniyet',
    email: 'isg@akdeniz.edu.tr',
    password: 'admin123',
    role: 'STAFF',
    department: 'İş Sağlığı ve Güvenliği Koordinatörlüğü'
  },
  'yapi.isleri@akdeniz.edu.tr': {
    id: 5,
    name: 'Mustafa İnşaat',
    email: 'yapi.isleri@akdeniz.edu.tr',
    password: 'admin123',
    role: 'STAFF',
    department: 'Yapı İşleri ve Teknik Daire Başkanlığı'
  },
  'bilgi.islem@akdeniz.edu.tr': {
    id: 6,
    name: 'Elif Teknoloji',
    email: 'bilgi.islem@akdeniz.edu.tr',
    password: 'admin123',
    role: 'STAFF',
    department: 'Bilgi İşlem Daire Başkanlığı'
  },
  'kutuphane@akdeniz.edu.tr': {
    id: 7,
    name: 'Ahmet Kitap',
    email: 'kutuphane@akdeniz.edu.tr',
    password: 'admin123',
    role: 'STAFF',
    department: 'Kütüphane ve Dokümantasyon Daire Başkanlığı'
  },
  'idari.mali@akdeniz.edu.tr': {
    id: 8,
    name: 'Fatma Muhasebe',
    email: 'idari.mali@akdeniz.edu.tr',
    password: 'admin123',
    role: 'STAFF',
    department: 'İdari ve Mali İşler Daire Başkanlığı'
  }
}

// Departman bazlı sorunlar
const departmentIssues = {
  'Öğrenci İşleri Daire Başkanlığı': [
    {
      id: 1,
      title: 'Harç Ödeme Sorunu',
      description: 'Online harç ödeme sistemi hata veriyor.',
      status: 'Açık',
      priority: 'Yüksek',
      location: [36.896722, 30.639722], // Öğrenci İşleri binası
      image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80', // university paperwork
      createdAt: '2024-03-24 10:00'
    },
    {
      id: 2,
      title: 'Ders Kayıt Problemi',
      description: 'Öğrenciler seçmeli derslere kayıt olamıyor.',
      status: 'İncelemede',
      priority: 'Acil',
      location: [36.896722, 30.639722], // Öğrenci İşleri binası
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', // university registration
      createdAt: '2024-03-24 09:30'
    }
  ],
  'Sağlık, Kültür ve Spor Dairesi Başkanlığı': [
    {
      id: 3,
      title: 'Yemekhane Hijyen Sorunu',
      description: 'Merkezi yemekhanede temizlik standartları yetersiz.',
      status: 'İncelemede',
      priority: 'Yüksek',
      location: [36.89534964755765, 30.65533239751871], // Merkezi Yemekhane
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80', // cafeteria
      createdAt: '2024-03-24 11:15'
    },
    {
      id: 4,
      title: 'Spor Salonu Ekipman Arızası',
      description: 'Fitness salonundaki koşu bantları çalışmıyor.',
      status: 'Açık',
      priority: 'Orta',
      location: [36.89452238965895, 30.649749295692192], // Spor Kompleksi
      image: 'https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?auto=format&fit=crop&w=600&q=80', // broken gym equipment
      createdAt: '2024-03-24 12:00'
    }
  ],
  'Koruma ve Güvenlik Şube Müdürlüğü': [
    {
      id: 5,
      title: 'Şüpheli Şahıs İhbarı',
      description: 'Kütüphane çevresinde şüpheli hareketler gözlemlendi.',
      status: 'İncelemede',
      priority: 'Acil',
      location: [36.89615281957794, 30.659225091687233], // Merkezi Kütüphane
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', // security
      createdAt: '2024-03-24 08:30'
    },
    {
      id: 6,
      title: 'Yetersiz Aydınlatma',
      description: 'C Blok arkası akşam saatlerinde karanlık kalıyor.',
      status: 'Açık',
      priority: 'Yüksek',
      location: [36.894167, 30.641944], // C Blok
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', // dark campus
      createdAt: '2024-03-24 14:00'
    }
  ],
  'İş Sağlığı ve Güvenliği Koordinatörlüğü': [
    {
      id: 7,
      title: 'Yangın Çıkışı Engeli',
      description: 'A Blok yangın merdiveninde malzeme yığını var.',
      status: 'Açık',
      priority: 'Acil',
      location: [36.893889, 30.641389], // A Blok
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80', // fire exit
      createdAt: '2024-03-24 10:00'
    }
  ],
  'Yapı İşleri ve Teknik Daire Başkanlığı': [
    {
      id: 8,
      title: 'Asansör Arızası',
      description: 'Mühendislik Fakültesi asansörü çalışmıyor.',
      status: 'İncelemede',
      priority: 'Yüksek',
      location: [36.896477963924966, 30.649296785065157], // Mühendislik Fakültesi
      image: 'https://files.sikayetvar.com/complaint/3030/30300051/1728310755250.img-5124_768x768.jpg', // elevator
      createdAt: '2024-03-24 09:30'
    },
    {
      id: 9,
      title: 'Klima Sorunu',
      description: 'D-304 dersliğinde klima çalışmıyor.',
      status: 'Açık',
      priority: 'Orta',
      location: [36.896744018504236, 30.649857492836522], // D Blok
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', // air conditioner
      createdAt: '2024-03-24 11:15'
    },
    {
      id: 15,
      title: 'Fen Fakültesi Aydınlatma Sorunu',
      description: '204 nolu derslikte tavan lambası titreşiyor ve bazen dersler sırasında tamamen kapanıyor.',
      status: 'Çözüldü',
      priority: 'Orta',
      location: [36.89891988056335, 30.65553446517883], // Fen Fakültesi
      image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80', // classroom light
      createdAt: '2023-08-10 09:00'
    },
    {
      id: 16,
      title: 'Kütüphane Çatı Sızıntısı',
      description: 'Kütüphanenin Kuzey kanadında, tarih bölümü yakınlarında tavandan su sızıntısı var.',
      status: 'İncelemede',
      priority: 'Yüksek',
      location: [36.895922209428356, 30.658821385757715], // Merkezi Kütüphane
      image: 'https://www.izolasyoncozumleri.net/wp-content/uploads/2019/12/catidan-yagmur-suyu-akiyor.jpg', // library leak
      createdAt: '2023-08-15 14:00'
    }
  ],
  'Bilgi İşlem Daire Başkanlığı': [
    {
      id: 10,
      title: 'İnternet Kesintisi',
      description: 'Eduroam bağlantısı kampüs genelinde kesik.',
      status: 'Açık',
      priority: 'Acil',
      location: [36.895278, 30.641111], // Bilgi İşlem Binası
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', // wifi
      createdAt: '2024-03-24 12:00'
    },
    {
      id: 11,
      title: 'OBS Erişim Sorunu',
      description: 'Öğrenci Bilgi Sistemine erişilemiyor.',
      status: 'İncelemede',
      priority: 'Yüksek',
      location: [36.895278, 30.641111], // Bilgi İşlem Binası
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', // computer
      createdAt: '2024-03-24 08:30'
    }
  ],
  'Kütüphane ve Dokümantasyon Daire Başkanlığı': [
    {
      id: 12,
      title: 'Hasarlı Kitap',
      description: 'Referans bölümünde yırtık kitaplar var.',
      status: 'Açık',
      priority: 'Orta',
      location: [36.895856320686214, 30.658912013619446], // Merkezi Kütüphane
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80', // damaged book
      createdAt: '2024-03-24 14:00'
    },
    {
      id: 17,
      title: 'Kütüphane Çatı Sızıntısı',
      description: 'Kütüphanenin Kuzey kanadında, tarih bölümü yakınlarında tavandan su sızıntısı var. Kitapların zarar görmemesi için acil önlem alınması gerekiyor.',
      status: 'İncelemede',
      priority: 'Yüksek',
      location: [36.892778, 30.645833], // Merkezi Kütüphane
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', // library leak
      createdAt: '2023-08-15 14:00'
    }
  ],
  'İdari ve Mali İşler Daire Başkanlığı': [
    {
      id: 13,
      title: 'Çevre Temizliği',
      description: 'Fakülte girişinde çöp birikimi var.',
      status: 'Açık',
      priority: 'Orta',
      location: [36.895000, 30.640833], // İdari Bina
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', // trash
      createdAt: '2024-03-24 10:00'
    },
    {
      id: 14,
      title: 'Yaralı Kedi İhbarı',
      description: 'C Blok önünde yaralı sokak kedisi var.',
      status: 'İncelemede',
      priority: 'Yüksek',
      location: [36.894167, 30.641944], // C Blok
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80', // injured cat
      createdAt: '2024-03-24 09:30'
    }
  ]
}

export default createStore({
  state: {
    issues: JSON.parse(localStorage.getItem('issues') || '[]'),
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
        // Sorunları localStorage'a kaydet
        localStorage.setItem('issues', JSON.stringify(state.issues));
      }
    },
    deleteIssue(state, id) {
      // Sadece görüntülenen listeden kaldır, orijinal veriyi etkileme
      state.issues = state.issues.filter(issue => issue.id !== id);
      if (state.selectedIssue?.id === id) {
        state.selectedIssue = null;
      }
      // localStorage'a kaydetme - böylece sayfa yenilendiğinde orijinal veriler geri gelecek
    },
    loginSuccess(state, user) {
      state.isAuthenticated = true;
      state.user = user;
      state.loginError = null;
      // Kullanıcının departmanına göre sorunları yükle
      state.issues = departmentIssues[user.department] || [];
      // Sorunları localStorage'a kaydet
      localStorage.setItem('issues', JSON.stringify(state.issues));
      // User bilgisini localStorage'a kaydet
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'mock-jwt-token-' + user.id);
    },
    loginFailure(state, error) {
      state.isAuthenticated = false;
      state.user = null;
      state.loginError = error;
      // Local storage'ı temizle
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('issues');
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.issues = [];
      // Local storage'ı temizle
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('issues');
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
        // Mock login - sadece personel girişine izin ver
        const user = mockUsers[username];
        if (user && user.password === password) {
          commit('loginSuccess', user);
          return Promise.resolve({ user });
        } else {
          throw new Error('Geçersiz kullanıcı bilgileri veya yetkisiz erişim.');
        }
      } catch (error) {
        commit('loginFailure', error.message);
        return Promise.reject(error);
      }
    },
    logout({ commit }) {
      commit('logout');
    },
    // Sayfa yüklendiğinde kullanıcı ve sorunları kontrol et
    initializeStore({ commit }) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      
      if (user && token) {
        // Kullanıcı oturumu varsa, departman sorunlarını yükle
        commit('loginSuccess', user);
      } else {
        // Oturum yoksa temizle
        commit('logout');
      }
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