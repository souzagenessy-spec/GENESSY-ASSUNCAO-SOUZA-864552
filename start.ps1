# Script de Inicialização Rápido - Pet Manager
Write-Host "🐾 INICIANDO PET MANAGER 🐾" -ForegroundColor Cyan
Write-Host ""

# Parar processos Node existentes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# Limpar cache
Remove-Item -Path ".\node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".\dist" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".\.vite" -Recurse -Force -ErrorAction SilentlyContinue

# Verificar dependências
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
}

# Configurar ambiente
$env:NODE_OPTIONS = "--openssl-legacy-provider"

Write-Host ""
Write-Host "✅ Configuração completa!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Iniciando servidor..." -ForegroundColor Cyan
Write-Host "📡 URL: http://localhost:3000" -ForegroundColor White -BackgroundColor DarkBlue
Write-Host "⏳ Por favor, aguarde..." -ForegroundColor Yellow
Write-Host ""

# Iniciar servidor
npm run dev
