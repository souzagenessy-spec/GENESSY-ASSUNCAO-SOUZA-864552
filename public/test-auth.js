// test-auth.js - Teste rápido de autenticação
console.log('🔐 Testando autenticação...');

// Verificar localStorage
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

console.log('Token:', token ? '✅ Presente' : '❌ Ausente');
console.log('Usuário:', user ? '✅ Presente' : '❌ Ausente');

if (user) {
  try {
    const userData = JSON.parse(user);
    console.log('Dados do usuário:', userData);
  } catch (e) {
    console.error('Erro ao parsear usuário:', e);
  }
}

// Função para simular login
window.mockLogin = () => {
  const mockToken = 'test-token-' + Date.now();
  const mockUser = {
    id: 'test-id',
    name: 'Usuário Teste',
    email: 'teste@petsmt.com'
  };
  
  localStorage.setItem('token', mockToken);
  localStorage.setItem('user', JSON.stringify(mockUser));
  
  console.log('✅ Login mock realizado!');
  console.log('Recarregue a página para ver as mudanças');
  return { token: mockToken, user: mockUser };
};

// Função para logout
window.mockLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  console.log('✅ Logout realizado!');
  console.log('Recarregue a página para ver as mudanças');
};

console.log('🎮 Comandos disponíveis no console:');
console.log('  mockLogin()  - Simula login');
console.log('  mockLogout() - Faz logout');
