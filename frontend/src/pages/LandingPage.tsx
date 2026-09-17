import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div>
      <header>
        <nav>
          <h2>OmniMarket</h2>
          <div>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Get Started</button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section>
          <h1>The Multi-Tenant SaaS Platform for Modern Commerce</h1>
          <p>
            Deploy scalable, production-grade storefronts with instant isolation and enterprise-grade performance.
          </p>
          <div>
            <Link to="/signup">
              <button>Create Your Store</button>
            </Link>
            <Link to="/login">
              <button>Sign In to Console</button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}