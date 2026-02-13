import bcrypt from "bcryptjs";

const defaultUsers = [
  {
    lastName: "Yehouenou",
    firstName: "Manoël",
    email: "manoel@example.com",
    password: bcrypt.hashSync("Mm12!!", 10),
  },
  {
    lastName: "Attolou",
    firstName: "Dylan",
    email: "dylan@example.com",
    password: bcrypt.hashSync("Dd34!!", 10),
  },
];
export const authService = {
  getUsers() {
    const stored = localStorage.getItem("db_users");
    if (!stored) {
      // Si vide, on enregistre les utilisateurs par défaut
      localStorage.setItem("db_users", JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    return JSON.parse(stored);
  },
  login(usersInfos) {
    const users = this.getUsers();
    const found = users.find(
      (u) => u.email === usersInfos.email );
    if (found) {
      const isMatch =
        bcrypt.compareSync(usersInfos.password, found.password) ;
        
      if (isMatch) {
        localStorage.setItem("currentUser", JSON.stringify(found));
        localStorage.setItem("isLoggedIn", "true");
        return true;
      }
    }
    return false;
  },
  logOut() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
  },
  isAuthenticated() {
    return localStorage.getItem("isLoggedIn") === "true";
  },
};
