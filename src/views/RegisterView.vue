<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import bcrypt from "bcryptjs";
import { authService } from "@/services/authService";

const router = useRouter();

const getName = ref("");
const getFirstName = ref("");
const getEmail = ref("");
const getPassword = ref("");
const getConfirm = ref("");

const errorMessage = ref("");

function register() {
    console.log('bouton cliqué');
    
  errorMessage.value = "";
  // RESTRICION EMAIL//////////////////////////////////////
  const currentUsers = authService.getUsers();
  console.log("Utilisateurs actuels :", currentUsers);
  if (currentUsers.some((user) => user.email === getEmail.value)) {
    errorMessage.value = "Cet email existe déjà";
    return;
  }

  // RESTRICTION MOT DE PASSE//////////////////////////////
  const regPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!regPassword.test(getPassword.value)) {
    errorMessage.value =
      "Le mot de passe doit contenir 8 caractères, une majuscule, un chiffre et un caractère spécial.";
      getPassword.value = "";    
      return;
  }
  if (getPassword.value !== getConfirm.value) {
    errorMessage.value = "Les mots de passe ne correspondent pas !!";
    return;
  }
  // CRYPTAGE / DECRYPTAGE ////////////////////////////////
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(getPassword.value, salt);


// New users
  const newUsers = {
    id: Date.now(),
    name: getName.value,
    firstName: getFirstName.value,
    email: getEmail.value,
    password: hashed,
    confirm: hashed,
  };
  currentUsers.push(newUsers);
  localStorage.setItem("db_users", JSON.stringify(currentUsers));


  errorMessage.value = "Inscription réussie! Connectez-vous à présent.";
  router.push("/");
}
</script>

<template>
  <div class="studio-wrapper">
    <div class="auth-card">
      <header class="auth-header">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <h1>Créer un profil</h1>
        <p>Commencez à organiser votre temps avec précision.</p>
      </header>

      <form @submit.prevent="register" class="auth-form">
        <div class="name-grid">
          <div class="field-group">
            <label for="name">Nom</label>
            <input v-model="getName" type="text" id="name" placeholder="Nom" required />
          </div>
          <div class="field-group">
            <label for="firstName">Prénom</label>
            <input v-model="getFirstName" type="text" id="firstName" placeholder="Prénom" required />
          </div>
        </div>

        <div class="field-group">
          <label for="email">Email</label>
          <input v-model="getEmail" type="email" id="email" placeholder="...@company.com" required />
        </div>

        <div class="field-group">
          <label for="password">Mot de passe</label>
          <input v-model="getPassword" type="password" id="password" placeholder="••••••••" required />
        </div>

        <div class="field-group">
          <label for="confirm">Confirmer le mot de passe</label>
          <input v-model="getConfirm" type="password" id="confirm" placeholder="••••••••" required />
        </div>

        <Transition name="slide">
          <p v-if="errorMessage" class="error-banner">{{ errorMessage }}</p>
        </Transition>

        <button type="submit" class="submit-btn">Continuer</button>
      </form>

      <footer class="auth-footer">
        <span>Vous avez déjà un compte ?</span>
        <router-link to="/">Se connecter</router-link>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* --- BASE & FONTS --- */
.studio-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa; /* Blanc cassé très propre */
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* --- CARD --- */
.auth-card {
  width: 100%;
  max-width: 440px;
  background: #ffffff;
  padding: 48px;
  border-radius: 12px;
  border: 1px solid #eaeaea;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.03);
}

/* --- HEADER --- */
.auth-header {
  text-align: center;
  margin-bottom: 32px;
}
.logo {
  width: 40px;
  height: 40px;
  background: #000000;
  color: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.logo svg { width: 22px; height: 22px; }
h1 { font-size: 24px; font-weight: 600; color: #111111; margin: 0; letter-spacing: -0.02em; }
.auth-header p { font-size: 14px; color: #666666; margin-top: 8px; }

/* --- FORM --- */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.name-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
label {
  font-size: 13px;
  font-weight: 500;
  color: #444444;
}
input {
  height: 42px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  font-size: 14px;
  color: #111111;
  transition: all 0.2s ease;
}
input::placeholder { color: #aaaaaa; }
input:focus {
  outline: none;
  border-color: #000000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

/* --- BUTTON --- */
.submit-btn {
  height: 44px;
  background: #111111;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-top: 8px;
}
.submit-btn:hover {
  opacity: 0.9;
}

/* --- FEEDBACK --- */
.error-banner {
  font-size: 13px;
  color: #e53e3e;
  background: #fff5f5;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #feb2b2;
}

/* --- FOOTER --- */
.auth-footer {
  margin-top: 32px;
  text-align: center;
  font-size: 14px;
  color: #666666;
}
.auth-footer a {
  color: #111111;
  font-weight: 600;
  text-decoration: none;
  margin-left: 5px;
}
.auth-footer a:hover { text-decoration: underline; }

@media (max-width: 480px) {
  .auth-card { padding: 32px 24px; border: none; box-shadow: none; background: transparent; }
  .name-grid { grid-template-columns: 1fr; }
}
</style>
