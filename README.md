# TiendaVSCR - Tienda Virtual Completa

**Proyecto Final ITI-523**  
Sistema completo de tienda virtual con backend PHP/MySQL y frontend responsive con Bootstrap 5, incluyendo carrito de compras, proceso de pago, gestión de usuarios y reportes.

---

## 🛠 Sistema Integrado

- Backend completo en PHP con MySQL.  
- Frontend responsive completamente funcional con Bootstrap 5.  
- Carrito de compras, proceso de pago seguro, gestión de usuarios y reportes.

---

## 🚀 Cómo ejecutar (XAMPP / Apache)

1. Copia la carpeta `TiendaConadimi` dentro de tu carpeta de proyectos de XAMPP:

   - **Windows:** `C:\xampp\htdocs\TiendaConadimi`  
   - **Linux/Mac:** `/opt/lampp/htdocs/TiendaConadimi`

2. Configurar la base de datos:
   - Inicia XAMPP (Apache + MySQL)  
   - Accede a phpMyAdmin: [http://localhost/phpmyadmin](http://localhost/phpmyadmin)  
   - Crea una nueva base de datos llamada `tiendaconadimi`  
   - Importa el archivo de configuración de la base de datos (si está incluido)

3. Configurar conexión:
   - Edita `backend/config/Database.php` con tus credenciales de MySQL
   - Verifica que las rutas en la configuración sean correctas

4. Acceder al sistema:
   - Frontend: [http://localhost/TiendaConadimi/frontend/template/index.php](http://localhost/TiendaConadimi/frontend/template/index.php)  
   - Panel Admin: [http://localhost/TiendaConadimi/frontend/template/admin.php](http://localhost/TiendaConadimi/frontend/template/admin.php)

---

## ✅ Funcionalidades Implementadas

### Autenticación y Gestión de Usuarios
- Registro de usuarios — `frontend/template/registro.php`  
- Inicio/cierre de sesión — `frontend/template/login.php` + `backend/api/usuarios/`  
- Perfil de usuario — `frontend/template/perfil.php`  
- Historial de pedidos integrado en perfil  

### Catálogo de Productos
- Categorización (Electrónica, Ropa, Hogar, Viajes) — `frontend/template/products.php`  
- Lista con detalles completos — descripción, precio, imágenes  
- Búsqueda y filtrado avanzado — por nombre, categoría, rango de precio  
- Gestión de productos (Admin) — `backend/api/productos/`  

### Carrito de Compras
- Agregar, eliminar y actualizar productos — `frontend/assets/js/cart.js`  
- Cálculo automático: subtotal, IVA 13%, costos de envío, total  
- Persistencia con backend y sesiones de usuario  

### Proceso de Compra
- Pasarela de pago — tarjeta de crédito y PayPal — `frontend/template/checkout.php`  
- Validaciones seguras — Luhn, CVV, fecha de expiración  
- Confirmación de pedido con número de seguimiento — `frontend/template/confirmacion.php`  
- Factura imprimible — PDF generado — `frontend/template/factura.php`  

### Gestión de Pedidos
- Registro completo — usuario, fecha, monto, productos  
- Seguimiento — número único por pedido  
- Historial — accesible desde perfil de usuario  

### Reportes de Ventas
- Panel administrativo — `frontend/template/reports.php`  
- Estadísticas: ventas por período, productos más vendidos  
- Exportación en formato imprimible  

---

## 🔧 Backend (PHP + MySQL)
- API REST completa — `backend/api/`  
- Autenticación segura con hash de contraseñas y sesiones  
- CRUD productos — `backend/api/productos/`  
- Gestión pedidos — `backend/api/pedidos/`  
- Gestión usuarios — `backend/api/usuarios/`  
- Carrito persistente — `backend/api/carrito/`  
- Validaciones de entrada: prevención SQL injection y XSS  
- Base de datos MySQL estructurada y normalizada  

---

## 🌐 Frontend (HTML + CSS + JS)
- Diseño responsive — Bootstrap 5  
- Interfaz intuitiva — UX optimizada  
- Validaciones cliente — JavaScript + HTML5  
- Interacciones dinámicas — AJAX, filtros en tiempo real  
- Seguridad frontend — CSP, sanitización DOM  

---

## 🔒 Seguridad
- HTTPS — Certificado SSL configurado  
- Validación de entradas — backend y frontend  
- Sesiones seguras — manejo apropiado de autenticación  
- Contraseñas cifradas — hash seguro en base de datos  

---

## ☁️ Hosting y Despliegue
- GitHub — control de versiones y hosting del código  
- Certificado SSL — HTTPS habilitado  
- Documentación — README completo + guías de instalación  

---

## 📁 Estructura del Proyecto

TiendaConadimi/
├── backend/
│ ├── api/
│ │ ├── carrito/
│ │ ├── pago/
│ │ ├── pedidos/
│ │ ├── productos/
│ │ └── usuarios/
│ ├── config/
│ │ └── Database.php
│ ├── models/
│ │ ├── Carrito.php
│ │ ├── Pedido.php
│ │ ├── Producto.php
│ │ └── Usuario.php
│ └── utils/
│ └── auth.php
├── frontend/
│ ├── assets/
│ │ ├── css/
│ │ ├── img/
│ │ └── js/
│ ├── template/
│ │ ├── admin.php
│ │ ├── cart.php, checkout.php
│ │ ├── confirmacion.php, factura.php
│ │ ├── index.php, products.php
│ │ ├── login.php, registro.php
│ │ ├── perfil.php, reports.php
│ │ ├── header.php, footer.php
│ │ └── hash_password.php
│ ├── security/
│ │ └── frontend_security_checklist.md
│ └── tests/
│ └── test_runner.html
└── README.md
