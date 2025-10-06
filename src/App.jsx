import React, { useState } from 'react';
import './App.css';

function App() {
  const [following, setFollowing] = useState('');
  const [followers, setFollowers] = useState('');
  const [results, setResults] = useState(null);

  const compareLists = () => {
    // Convertir a arrays y limpiar
    const followingArray = following.split('\n')
      .map(user => user.trim().toLowerCase())
      .filter(user => user.length > 0);
    
    const followersArray = followers.split('\n')
      .map(user => user.trim().toLowerCase())
      .filter(user => user.length > 0);

    // Encontrar diferencias
    const notFollowingBack = followingArray.filter(user => !followersArray.includes(user));
    const notFollowedBack = followersArray.filter(user => !followingArray.includes(user));

    setResults({
      notFollowingBack,
      notFollowedBack
    });
  };

  const exportResults = () => {
    if (!results) return;

    const content = `USUARIOS QUE NO TE SIGUEN DE VUELTA:\n${results.notFollowingBack.join('\n')}\n\nUSUARIOS QUE TE SIGUEN PERO TÚ NO SIGUES:\n${results.notFollowedBack.join('\n')}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultados_instagram.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setFollowing('');
    setFollowers('');
    setResults(null);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🔍 Comparador de Seguidores Instagram</h1>
        
        <div className="input-section">
          <div className="input-group">
            <h3>📋 Personas que TÚ sigues</h3>
            <textarea
              value={following}
              onChange={(e) => setFollowing(e.target.value)}
              placeholder="Pega aquí la lista de usuarios que sigues (uno por línea)"
              rows={6}
            />
            <div className="counter">{following.split('\n').filter(line => line.trim()).length} usuarios</div>
          </div>

          <div className="input-group">
            <h3>👥 Tus SEGUIDORES</h3>
            <textarea
              value={followers}
              onChange={(e) => setFollowers(e.target.value)}
              placeholder="Pega aquí la lista de usuarios que te siguen (uno por línea)"
              rows={6}
            />
            <div className="counter">{followers.split('\n').filter(line => line.trim()).length} usuarios</div>
          </div>

          <div className="button-group">
            <button className="btn-primary" onClick={compareLists}>
              🔍 Comparar Listas
            </button>
            <button className="btn-secondary" onClick={clearAll}>
              🗑️ Limpiar Todo
            </button>
          </div>
        </div>

        {results && (
          <div className="result-section">
            <h2>📊 Resultados</h2>
            
            <div className="result-group">
              <h4>
                ❌ Usuarios que NO te siguen de vuelta: 
                <span className="count"> {results.notFollowingBack.length}</span>
              </h4>
              <div className="user-list">
                {results.notFollowingBack.map((user, index) => (
                  <div key={index} className="user-item">
                    @{user}
                  </div>
                ))}
                {results.notFollowingBack.length === 0 && (
                  <div className="empty-message">¡Todos te siguen de vuelta! 🎉</div>
                )}
              </div>
            </div>

            <div className="result-group">
              <h4>
                🤝 Usuarios que te siguen pero tú no: 
                <span className="count"> {results.notFollowedBack.length}</span>
              </h4>
              <div className="user-list">
                {results.notFollowedBack.map((user, index) => (
                  <div key={index} className="user-item">
                    @{user}
                  </div>
                ))}
                {results.notFollowedBack.length === 0 && (
                  <div className="empty-message">Sigues a todos tus seguidores 🤝</div>
                )}
              </div>
            </div>

            <button className="btn-export" onClick={exportResults}>
              📥 Exportar Resultados
            </button>
          </div>
        )}

        <div className="instructions">
          <h3>📝 ¿Cómo usar?</h3>
          <ol>
            <li>Ve a tu perfil de Instagram</li>
            <li>Toca "Siguiendo" y copia TODOS los nombres</li>
            <li>Toca "Seguidores" y copia TODOS los nombres</li>
            <li>Pega cada lista en su cuadro correspondiente</li>
            <li>¡Haz click en "Comparar Listas"!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;