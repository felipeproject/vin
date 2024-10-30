#!/bin/bash

# Adiciona todas as mudanças ao commit
git add .

# Faz o commit com uma mensagem padrão
git commit -m "Atualizações automáticas"

# Descobre a branch atual
CURRENT_BRANCH=$(git branch --show-current)

# Faz o push para a branch atual
git push origin $CURRENT_BRANCH
