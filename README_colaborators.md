📘 Guía para colaboradores del proyecto

🛠️ Requisitos previos
   - Tener Git instalado en el equipo.
   - Tener una cuenta activa en GitHub.
   - Haber sido agregado como colaborador del repositorio (si no, pídeselo a Kevin).


🔄 Clonar el repositorio
   - Abre una terminal o consola.
   - Ejecuta el siguiente comando:
      - git clone https://github.com/DekoFQ/streaming-backend.git
      - cd streaming-backend


🧠 Configurar tu identidad en Git (solo una vez)
   - Esto asegura que tus commits estén correctamente firmados:
      - git config --global user.name "Tu Nombre"
      - git config --global user.email "tunombre@ejemplo.com"
   - 💡 Usa el mismo correo que usaste en GitHub.


🌱 Crear tu propia rama (personal)
   - ⚠️ Importante: siempre debes crear tu rama a partir de main.
      - git checkout main               # Cambiar a la rama principal
      - git pull origin main            # Asegurarse de tener la última versión
      - git checkout -b tu-nombre       # Crear y cambiar a tu propia rama


💾 Subir tu rama a GitHub (solo la primera vez)
   - git add .
   - git commit -m "Inicio de la rama camilo"
   - git push -u origin camilo
   - 💡 Luego de eso, solo necesitarás usar git push para subir tus cambios futuros.


🔃 Cómo compartir tu trabajo (Pull Request) 
   - Cuando hayas terminado una funcionalidad o bloque de trabajo:
     - Ve a GitHub.
     - Verás un botón que dice "Compare & Pull Request".
     - Asegúrate que dice: camilo → main (tu rama → rama principal).
     - Agrega un título y descripción clara.
     - Envía el Pull Request para revisión.


⚠️ Reglas importantes
- 🚫 Nunca trabajes directamente sobre la rama main.
- ✅ Siempre crea tu rama a partir de main.
- 🔄 Sincroniza frecuentemente tu rama con main para evitar conflictos.
- ✅ Commits frecuentes y claros.
- ✅ Los cambios deben subirse por Pull Request.
