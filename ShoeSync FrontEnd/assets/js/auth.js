/* ==========================================================================
   SHOESYNC - AUTENTICACIÓN Y PERSISTENCIA (auth.js)
   ========================================================================== */

const DEMO_ACCOUNTS = {
  "admin@shoesync.com": { pswd: "123456", role: "admin", name: "Administrador General", target: "admin/dashboard.html" },
  "ventas@shoesync.com": { pswd: "123456", role: "ventas", name: "Carlos López (Ventas)", target: "ventas/dashboard.html" },
  "produccion@shoesync.com": { pswd: "123456", role: "produccion", name: "Ing. Miguel Porras", target: "produccion/dashboard.html" },
  "almacen@shoesync.com": { pswd: "123456", role: "almacen", name: "Roberto Gómez (Almacén)", target: "almacen/dashboard.html" },
  "cliente@shoesync.com": { pswd: "123456", role: "cliente", name: "Coppel S.A. de C.V.", target: "cliente/inicio.html" }
};

// Inicializar BBDD Simulada en localStorage
function initMockDatabase() {
  if (!localStorage.getItem("shoesync_orders")) {
    const defaultOrders = [
      { id: "PED-001", client: "Coppel", model: "Bota Industrial Pro", pairs: 2000, date: "2026-06-19", status: "En Producción", stage: "Pespunte", progress: 65 },
      { id: "PED-002", client: "Elektra", model: "Calzado Escolar Niño", pairs: 1000, date: "2026-07-01", status: "En Producción", stage: "Corte", progress: 25 },
      { id: "PED-003", client: "Liverpool", model: "Mocasín Confort Dama", pairs: 500, date: "2026-07-10", status: "Pendiente", stage: "Pendiente", progress: 0 },
      { id: "PED-004", client: "Suburbia", model: "Tenis Casual Unisex", pairs: 3000, date: "2026-05-15", status: "Completado", stage: "Entregado", progress: 100 }
    ];
    localStorage.setItem("shoesync_orders", JSON.stringify(defaultOrders));
  }
}

// Iniciar Sesión
function loginUser(email, password) {
  const account = DEMO_ACCOUNTS[email.toLowerCase()];
  if (account && account.pswd === password) {
    localStorage.setItem("shoesync_session", JSON.stringify({
      email: email,
      role: account.role,
      name: account.name
    }));
    window.location.href = account.target;
    return { success: true };
  }
  return { success: false, message: "Correo o contraseña incorrectos." };
}

// Cerrar Sesión
function logoutUser() {
  localStorage.removeItem("shoesync_session");
  // Redirigir correctamente a la raíz
  const path = window.location.pathname;
  if (path.includes("/admin/") || path.includes("/ventas/") || path.includes("/produccion/") || path.includes("/almacen/") || path.includes("/cliente/")) {
    window.location.href = "../login.html";
  } else {
    window.location.href = "login.html";
  }
}

// Verificar sesión
function getCurrentSession() {
  const session = localStorage.getItem("shoesync_session");
  return session ? JSON.parse(session) : null;
}

initMockDatabase();