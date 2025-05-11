# M2 Application de notifications pour les parents d'eleves

Ce projet est une application [décris rapidement ici, ex: web de gestion, plateforme e-commerce, etc.].

## Prérequis

- Node.js (version recommandée : >= 18)
- npm ou yarn
- Git
- Prisma CLI (`npx prisma`)
- Un accès à une base de données (PostgreSQL, MySQL, etc.)

## Étapes d'installation

### 1. Utiliser l'invite de commande (bash)

Assurez-vous d'exécuter toutes les commandes ci-dessous dans **CMD** (et non PowerShell).

### 2. Cloner le projet

```bash
git clone https://github.com/danielkembeu/m2-app.git
cd ton-projet
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Configurer la base de données avec Prisma

Créez un fichier `.env` à la racine du projet en vous basant sur le fichier `.env.example` :

```bash
copy .env.example .env
```

Modifiez la variable DATABASE_URL avec l'URL de votre base de données.

Ensuite, initialisez Prisma :

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Lancer le serveur

```bash
npm run dev
```

### 6. Mettre à jour le projet avec les dernières modifications

```bash
git pull
```

### 7. Visualiser la base de données avec Prisma Studio

```bash
npx prisma studio
```

Cela ouvrira une interface web pour naviguer facilement dans votre base de données.

#### Scripts utiles

- **npm run dev**: Lancer le serveur de développement
- **npx prisma migrate dev**: Appliquer les migrations Prisma
- **npx prisma studio**: Ouvrir Prisma Studio
- **git pull**: Récupérer les dernières modifications
"# M2-APP-CONVERTED" 
"# M2-APP-CONVERTED" 
