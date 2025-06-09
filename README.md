# Checklist App

## Índice

1. [Descrição](#descrição)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologias](#tecnologias)
4. [Instalação e Execução](#instalação-e-execução)
5. [Documentação do Código](#documentação-do-código)
6. [Demonstração](#demonstração)
7. [Estrutura de Pastas do Projeto](#estrutura-de-pastas-do-projeto)

## Descrição

Este é um aplicativo de checklist desenvolvido em React Native. O objetivo principal do aplicativo é permitir a criação, visualização, edição e exclusão de listas de tarefas, similar a aplicativos de lembretes como Apple Reminders e Google Tasks. Cada item na lista pode ser marcado como concluído ou não concluído, e os dados são armazenados localmente.

## Funcionalidades

- **Criar checklists**: Permite a criação de novas listas de tarefas.
- **Editar e excluir checklists**: Os checklists existentes podem ser modificados ou removidos.
- **Marcar tarefas como concluídas**: Cada item pode ser marcado como concluído ou não.
- **Persistência de dados**: As listas e tarefas são salvas localmente e permanecem acessíveis após o fechamento do aplicativo.

## Tecnologias

- **React Native**: Framework principal para desenvolvimento do aplicativo móvel.
- **Async Storage** (ou outra tecnologia de armazenamento local) para persistência de dados no dispositivo.

## Instalação e Execução

1. **Clone o repositório**

   ```bash
   git clone https://github.com/DevGuiPereira/ListaDeTarefas
   cd ListaDeTarefas/MyList

   - Instale o Expo CLI (se ainda não o tiver): 
   
   npm install -g expo-cli

   - Instale as dependências: 

   npm install

   -Execute o aplicativo com Expo:

   expo start

   Use o Expo Go ou um Emulador mobile.

## Documentação do Código

Abaixo estão algumas das seções principais do código:

- **Tela Principal**: Exibe a lista de checklists e botões para adicionar, editar ou excluir listas.
- **Página de Pesquisa**: Permite buscar tarefas específicas dentro dos checklists.
- **Modal de Criação de Tarefas**: Formulário para criar novas tarefas.
- **Modal de Edição de Tarefas**: Formulário para editar tarefas existentes.

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

## Demonstração

Assista à demonstração da implementação no [Loom Video](https://www.loom.com/share/26374ddd821d4c12a29f65c2833aadaf?sid=f84c0569-d354-471f-861c-8f702d67727f), onde é abordada a parte mais relevante do código.

[Vídeo do Aplicativo no Expo Go](https://github.com/user-attachments/assets/5b29ca9a-083c-4925-9bef-c25569b64820).


