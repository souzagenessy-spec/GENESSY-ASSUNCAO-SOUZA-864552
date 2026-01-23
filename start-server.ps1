# Limpar tela
Clear-Host

# Mensagem inicial
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "?? PET MANAGER - SERVIDOR DE DESENVOLVIMENTO" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Ir para diretório
cd "C:\Users\souza\Documents\pet-manager-frontend"

# Iniciar servidor Vite
Write-Host "Iniciando servidor Vite..." -ForegroundColor Yellow
npm run dev

# Manter terminal aberto
Write-Host "`nPressione Ctrl+C para parar o servidor" -ForegroundColor Gray
