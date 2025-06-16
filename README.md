# MyList App

**Trabalho de Desenvolvimento de Aplicativos Móveis**
**BCC - 7º periodo**

## Alunos: Lucas Lemos, Joao Pedro Souza e Angelo Favero

## Descrição

Este é um aplicativo de checklist desenvolvido em React Native. O objetivo principal do aplicativo é permitir a criação, visualização, edição e exclusão de listas de tarefas, similar a aplicativos de lembretes como Apple Reminders e Google Tasks. Cada item na lista pode ser marcado como concluído ou não concluído, e os dados são armazenados localmente.

## Funcionalidades

- **Listagem e pesquisa de tarefas**
- **Criação de tarefas**
- **Edição e exclusão de tarefas**
- **Marcar/desmarcar tarefas como concluídas**
- **Tela de métricas**:

## Tecnologias

- **React Native**: Framework principal para desenvolvimento do aplicativo móvel.
- **Async Storage** (ou outra tecnologia de armazenamento local) para persistência de dados no dispositivo.
- **React Navigation** para navegação entre telas.
- **Styde Components** para estilização dos componentes.
- **Expo** para execução do aplicativo em um dispositivo móvel.

## Instalação e Execução

1. **Clone o repositório**

   ```bash
   git clone https://github.com/Lucasssdev/to-do-project.git

   - Instale o Expo CLI (se ainda não o tiver):

   npm install -g expo-cli

   - Instale as dependências:

   npm install

   -Execute o aplicativo com Expo:

   npx expo start

   Use o Expo Go ou um Emulador mobile.
   ```

## Documentação do Código

Abaixo estão algumas das seções principais do código:

- **Tela Principal**: Exibe a lista de checklists e botões para adicionar, editar ou excluir e pesquisar tarefas.
- **Modal de Criação de Tarefas**: Formulário para criar novas tarefas.
- **Modal de Edição de Tarefas**: Formulário para editar tarefas existentes.
- **Tela de Métricas**: Exibe estatísticas sobre o número de tarefas concluídas e não concluídas.

As funcionalidades principais foram desenvolvidas usando `React Hooks` para gerenciamento de estado e `Async Storage` para a persistência dos dados localmente.

## Estrutura de Pastas do Projeto

### Caminho para percorrer as pastas

1. **src/** - Contém o código-fonte do projeto.
   - **app/** - Telas do meu aplicativo.
     - **Main/** - Página Main.
     - **ModalCreateTask/** - Página para a Criação de Tarefas.
     - **modalDetails/** - Página para Detalhes das Tarefas.
     - **modalEdition/** - Págia para Editar Tarefas.
     - **search/** - Página para Pesquisar Tarefas.
   - **components/** - Componentes reutilizavéis.
     - **buttonClose/** - Compoente de botão para fechar páginas.
     - **buttonDelete/** - Compoente de botão para deletar tarefas.
     - **buttonEdit/** - Compoente de botão para editar tarefas.
     - **buttonNew/** - Compoente de botão para criar tarefas.
     - **buttonSave/** - Compoente de botão para salvar tarefas.
     - **inputDate/** - Compoente de input para receber dados date.
     - **inputText/** - Compoente de input para receber dados string.
   - **global/** - Contém cores utilizadas no Projeto.
   - **routes** - Contém as rotas das páginas.
   - **server/** - pasta que contem as funções de manipulação de dados.
