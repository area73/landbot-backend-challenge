# Usar una imagen base oficial de Node.js
FROM node:20-alpine

# Definir el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de configuración del proyecto al contenedor
COPY .env .env
COPY package*.json ./
COPY tsconfig.json ./
COPY vitest.config.ts ./
COPY vitest.config.e2e.ts ./
COPY eslint.config.mjs ./
COPY .prettierrc ./
COPY .prettierignore ./
COPY .gitignore ./
copy types.d.ts ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar el código fuente del proyecto al contenedor
COPY ./src ./src


# crear dist
RUN npm run build


# Exponer el puerto en el que la aplicación se ejecutará (ajustar según sea necesario)
EXPOSE 3000

# Configuración para ejecutar el proyecto
CMD ["npm", "run", "start"]
