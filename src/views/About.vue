<script setup lang="ts">
// Future features data

type feature = {
  icon: string
  title: string
  description: string
  status: string
}
// Future features data
const features: feature[] = [
  {
    icon: '🔐',
    title: 'JWT Authentication',
    description: 'Secure user authentication with JSON Web Tokens',
    status: 'completed',
  },
  {
    icon: '👥',
    title: 'Role-Based Access Control',
    description: 'Admin and user roles with proper authorization',
    status: 'completed',
  },
  {
    icon: '📝',
    title: 'Posts Management',
    description: 'Full CRUD operations for blog posts',
    status: 'in-progress',
  },
  {
    icon: '✏️',
    title: 'Create Posts',
    description: 'Rich text editor for creating new posts',
    status: 'planned',
  },
  {
    icon: '🎨',
    title: 'Edit Posts',
    description: 'Update existing posts with ease',
    status: 'planned',
  },
  {
    icon: '🗑️',
    title: 'Delete Posts',
    description: 'Remove posts with confirmation dialogs',
    status: 'planned',
  },
  {
    icon: '💬',
    title: 'Comments System',
    description: 'User comments on posts with moderation',
    status: 'planned',
  },
  {
    icon: '🔍',
    title: 'Search & Filter',
    description: 'Search posts by title, content, and filter by author',
    status: 'planned',
  },
]

// Tech stack data
const techStack = {
  backend: [
    { name: 'NestJS', icon: '🏗️', description: 'Progressive Node.js framework' },
    { name: 'TypeORM', icon: '🗄️', description: 'Object-relational mapping' },
    { name: 'PostgreSQL', icon: '🐘', description: 'Advanced open source database' },
    { name: 'JWT', icon: '🔑', description: 'JSON Web Token authentication' },
  ],
  frontend: [
    { name: 'Vue 3', icon: '💚', description: 'Progressive JavaScript framework' },
    { name: 'TypeScript', icon: '📘', description: 'Typed JavaScript at scale' },
    { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS framework' },
    { name: 'Axios', icon: '📡', description: 'Promise-based HTTP client' },
  ],
}
</script>

<template>
  <div class="readme-container">
    <div class="readme-content">
      <!-- Header -->
      <div class="header-section">
        <div class="project-badge">
          <span class="badge-icon">🚀</span>
          <span>Full-Stack Demo</span>
        </div>
        <h1 class="project-title">NestJS + Vue Blog Platform</h1>
        <p class="project-description">
          A modern full-stack web application demonstrating enterprise-level architecture with
          authentication, authorization, and content management capabilities.
        </p>

        <div class="badges-row">
          <span class="badge backend">NestJS</span>
          <span class="badge frontend">Vue 3</span>
          <span class="badge database">TypeORM</span>
          <span class="badge auth">JWT Auth</span>
        </div>
      </div>

      <!-- Features Section -->
      <div class="section">
        <h2 class="section-title">
          <span class="title-icon">⚡</span>
          Features
        </h2>
        <div class="features-grid">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="feature-card"
            :class="`status-${feature.status}`"
          >
            <div class="feature-header">
              <span class="feature-icon">{{ feature.icon }}</span>
              <div class="feature-info">
                <h3 class="feature-title">{{ feature.title }}</h3>
                <span class="feature-status" :class="feature.status">
                  {{ feature.status.replace('-', ' ') }}
                </span>
              </div>
            </div>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <!-- Tech Stack Section -->
      <div class="section">
        <h2 class="section-title">
          <span class="title-icon">🛠️</span>
          Tech Stack
        </h2>

        <div class="tech-stack">
          <div class="stack-category">
            <h3 class="stack-title">Backend</h3>
            <div class="tech-grid">
              <div v-for="tech in techStack.backend" :key="tech.name" class="tech-item">
                <span class="tech-icon">{{ tech.icon }}</span>
                <div class="tech-info">
                  <span class="tech-name">{{ tech.name }}</span>
                  <span class="tech-desc">{{ tech.description }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="stack-category">
            <h3 class="stack-title">Frontend</h3>
            <div class="tech-grid">
              <div v-for="tech in techStack.frontend" :key="tech.name" class="tech-item">
                <span class="tech-icon">{{ tech.icon }}</span>
                <div class="tech-info">
                  <span class="tech-name">{{ tech.name }}</span>
                  <span class="tech-desc">{{ tech.description }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Architecture Section -->
      <div class="section">
        <h2 class="section-title">
          <span class="title-icon">🏗️</span>
          Architecture
        </h2>
        <div class="architecture-diagram">
          <div class="arch-layer frontend-layer">
            <div class="layer-title">Frontend Layer</div>
            <div class="layer-content">Vue 3 + TypeScript + Tailwind CSS</div>
          </div>
          <div class="arch-arrow">↓</div>
          <div class="arch-layer api-layer">
            <div class="layer-title">API Layer</div>
            <div class="layer-content">NestJS REST API + JWT Auth</div>
          </div>
          <div class="arch-arrow">↓</div>
          <div class="arch-layer business-layer">
            <div class="layer-title">Business Layer</div>
            <div class="layer-content">Services + Guards + Decorators</div>
          </div>
          <div class="arch-arrow">↓</div>
          <div class="arch-layer data-layer">
            <div class="layer-title">Data Layer</div>
            <div class="layer-content">TypeORM + PostgreSQL</div>
          </div>
        </div>
      </div>

      <!-- Roadmap Section -->
      <div class="section">
        <h2 class="section-title">
          <span class="title-icon">🗺️</span>
          Development Roadmap
        </h2>
        <div class="roadmap">
          <div class="roadmap-item completed">
            <div class="roadmap-marker"></div>
            <div class="roadmap-content">
              <h4>Phase 1: Foundation</h4>
              <p>✅ Authentication system, Role-based access, Basic entities</p>
            </div>
          </div>
          <div class="roadmap-item current">
            <div class="roadmap-marker"></div>
            <div class="roadmap-content">
              <h4>Phase 2: Content Management</h4>
              <p>🚧 CRUD operations for posts, Rich text editor, Media uploads</p>
            </div>
          </div>
          <div class="roadmap-item planned">
            <div class="roadmap-marker"></div>
            <div class="roadmap-content">
              <h4>Phase 3: Advanced Features</h4>
              <p>📋 Comments system, Search functionality, Email notifications</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer-section">
        <p class="footer-text">
          Built with ❤️ to demonstrate modern full-stack development practices
        </p>
        <div class="footer-links">
          <a href="#" class="footer-link">Documentation</a>
          <a href="#" class="footer-link">API Reference</a>
          <a href="#" class="footer-link">GitHub</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.readme-container {
  min-height: 100vh;
  background: #fafbfc;
  padding: 20px;
}

.readme-content {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

/* Header */
.header-section {
  text-align: center;
  margin-bottom: 60px;
  padding-bottom: 40px;
  border-bottom: 2px solid #e1e4e8;
}

.project-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 20px;
}

.badge-icon {
  font-size: 1.1rem;
}

.project-title {
  font-size: 3rem;
  font-weight: 700;
  color: #24292e;
  margin: 20px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.project-description {
  font-size: 1.25rem;
  color: #586069;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.badges-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.badge {
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  color: white;
}

.badge.backend {
  background: #e34c26;
}
.badge.frontend {
  background: #4fc08d;
}
.badge.database {
  background: #336791;
}
.badge.auth {
  background: #000000;
}

/* Sections */
.section {
  margin-bottom: 50px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 2rem;
  font-weight: 600;
  color: #24292e;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e1e4e8;
}

.title-icon {
  font-size: 1.5rem;
}

/* Features */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.feature-card {
  background: #f6f8fa;
  border: 2px solid #e1e4e8;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-card.status-completed {
  border-color: #28a745;
  background: linear-gradient(135deg, rgba(40, 167, 69, 0.05) 0%, rgba(40, 167, 69, 0.1) 100%);
}

.feature-card.status-in-progress {
  border-color: #ffc107;
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.05) 0%, rgba(255, 193, 7, 0.1) 100%);
}

.feature-card.status-planned {
  border-color: #6f42c1;
  background: linear-gradient(135deg, rgba(111, 66, 193, 0.05) 0%, rgba(111, 66, 193, 0.1) 100%);
}

.feature-header {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 10px;
}

.feature-icon {
  font-size: 2rem;
}

.feature-info {
  flex: 1;
}

.feature-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #24292e;
  margin: 0 0 5px 0;
}

.feature-status {
  font-size: 0.8rem;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.feature-status.completed {
  background: #28a745;
  color: white;
}

.feature-status.in-progress {
  background: #ffc107;
  color: #212529;
}

.feature-status.planned {
  background: #6f42c1;
  color: white;
}

.feature-description {
  color: #586069;
  margin: 0;
}

/* Tech Stack */
.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
}

.stack-category {
  background: #f6f8fa;
  border-radius: 12px;
  padding: 25px;
}

.stack-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #24292e;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tech-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: white;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.tech-item:hover {
  transform: translateX(5px);
}

.tech-icon {
  font-size: 1.5rem;
  width: 30px;
  text-align: center;
}

.tech-info {
  display: flex;
  flex-direction: column;
}

.tech-name {
  font-weight: 600;
  color: #24292e;
}

.tech-desc {
  font-size: 0.9rem;
  color: #586069;
}

/* Architecture */
.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
}

.arch-layer {
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  border: 2px solid;
}

.frontend-layer {
  background: linear-gradient(135deg, #4fc08d 0%, #42b883 100%);
  border-color: #42b883;
  color: white;
}

.api-layer {
  background: linear-gradient(135deg, #e34c26 0%, #f06529 100%);
  border-color: #e34c26;
  color: white;
}

.business-layer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
}

.data-layer {
  background: linear-gradient(135deg, #336791 0%, #4682b4 100%);
  border-color: #336791;
  color: white;
}

.layer-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.layer-content {
  font-size: 0.9rem;
  opacity: 0.9;
}

.arch-arrow {
  font-size: 1.5rem;
  color: #586069;
  font-weight: bold;
}

/* Roadmap */
.roadmap {
  position: relative;
  padding-left: 30px;
}

.roadmap::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e1e4e8;
}

.roadmap-item {
  position: relative;
  margin-bottom: 30px;
}

.roadmap-marker {
  position: absolute;
  left: -37px;
  top: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid;
}

.roadmap-item.completed .roadmap-marker {
  background: #28a745;
  border-color: #28a745;
}

.roadmap-item.current .roadmap-marker {
  background: #ffc107;
  border-color: #ffc107;
}

.roadmap-item.planned .roadmap-marker {
  background: white;
  border-color: #6f42c1;
}

.roadmap-content h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #24292e;
  margin: 0 0 5px 0;
}

.roadmap-content p {
  color: #586069;
  margin: 0;
}

/* Footer */
.footer-section {
  text-align: center;
  padding-top: 40px;
  border-top: 2px solid #e1e4e8;
  margin-top: 60px;
}

.footer-text {
  color: #586069;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.footer-link {
  color: #0366d6;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.footer-link:hover {
  background: #f6f8fa;
}

/* Responsive */
@media (max-width: 768px) {
  .readme-content {
    padding: 20px;
  }

  .project-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .tech-stack {
    grid-template-columns: 1fr;
  }

  .badges-row {
    justify-content: center;
  }
}
</style>
