<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{$t('register')}}
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        {{$t('appTitle')}}
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Ad Soyad
            </label>
            <div class="mt-1">
              <input
                id="name"
                v-model="name"
                name="name"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Şifre Tekrar
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                name="confirmPassword"
                type="password"
                autocomplete="new-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="role" class="block text-sm font-medium text-gray-700">
              Rol
            </label>
            <div class="mt-1">
              <select
                id="role"
                v-model="role"
                name="role"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="STUDENT">Öğrenci</option>
                <option value="STAFF">Personel</option>
                <option value="ADMIN">Yönetici</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{$t('register')}}
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Zaten hesabınız var mı?
              </span>
            </div>
          </div>

          <div class="mt-6">
            <button
              @click="goToLogin"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{$t('login')}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'RegisterView',
  setup() {
    const router = useRouter()
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const role = ref('STUDENT')

    const handleRegister = async () => {
      if (password.value !== confirmPassword.value) {
        alert('Şifreler eşleşmiyor!')
        return
      }

      try {
        await axios.post('/auth/register', {
          name: name.value,
          email: email.value,
          password: password.value,
          role: role.value
        })

        // Başarılı kayıt sonrası login sayfasına yönlendir
        router.push('/login')
      } catch (error) {
        console.error('Kayıt hatası:', error)
        if (error.response) {
          alert(error.response.data.message || 'Kayıt işlemi başarısız. Lütfen bilgilerinizi kontrol edin.')
        } else {
          alert('Kayıt işlemi başarısız. Lütfen bilgilerinizi kontrol edin.')
        }
      }
    }

    const goToLogin = () => {
      router.push('/login')
    }

    return {
      name,
      email,
      password,
      confirmPassword,
      role,
      handleRegister,
      goToLogin
    }
  }
}
</script> 