# Inglêsando 😎 - The Word Catcher
Na jornada de aprendizado da língua inglesa, frequentemente nos deparamos com novas palavras todos os dias enquanto estamos navegando pela Internet. Pensando nisso, surgiu a ideia de criar essa extensão que visa ajudar os usuários a ampliar seu vocabulário em inglês. 

# Sobre o projeto
A extensão permite que os usuários selecionem palavras desconhecidas de qualquer página web e as armazenem em uma lista personalizada. Além disso, a extensão fornece acesso rápido a definições e exemplos de uso das palavras selecionadas, tornando o aprendizado mais eficiente e prático.

## Layout da extensão
<img width="230px" src="https://cdn.discordapp.com/attachments/1105473103909363793/1155855980010164284/Captura_de_tela_2023-09-25_101001.png">

## Funcionalidades
- **Captura de Palavras**: Os usuários podem selecionar palavras em inglês em páginas da web, como sites de notícias, artigos ou em qualquer lugar, graças a `chrome.contextMenus API` que te permite clicar com o botão direito do mouse nas palavras selecionadas, e assim, adicionar essas palavras à lista de vocabulário da extensão.

- **Armazenamento de Palavras**: As palavras selecionadas são armazenadas localmente na extensão usando a API de armazenamento do Chrome `chrome.storage.local`. Ficando disponível a qualquer momento para o usuário.

- **Reprodução de Áudio**: Cada vez que uma palavra é removida da lista, a extensão reproduz um áudio correspondente ao evento.

- **Acesso Rápido a Definições**: Os usuários podem clicar nas palavras em sua lista de vocabulário para acessar rapidamente a definição das palavras e phrasal verbs em um dicionário online (Oxford dictionary). Nesse dicionário o usuário também terá acesso a pronúncia das palavras.

- **Exemplos de Uso**: Além das definições, a extensão também oferece links para exemplos de uso das palavras em frases do dia a dia. Isso possibilita que os usuários compreendam como as palavras são aplicadas em contextos reais.

- **Remoção de Palavras**: Os usuários podem remover palavras da lista de vocabulário a qualquer momento, caso já tenham aprendido ou não desejem mais mantê-las na lista.

# Como executar o projeto
Pré-requisitos: Navegador Google Chrome instalado.

```bash
# clonar repositório
git clone https://github.com/sstephanyy/Google-extension-the-word-catcher

# entrar na pasta do projeto 
cd myExtension

# no chrome, clique nos três pontinhos ao lado do seu perfil. Ache "Extensões", em seguida, "Gerir extensões". 

# após escolher "Gerir extensões", ele irá te redirecionar para a página de extensões do Chrome. Certifique-se de ativar o modo de programador.

# feito isso, você precisa clicar no botão "Carregar expandida" e escolher a pasta onde o projeto está inserido.

# agora, a extensão está disponível em sua loja de extensões do Chrome. Você também pode fixar a extensão conforme a imagem abaixo.

```
![image 1](https://github.com/sstephanyy/Google-extension-the-word-catcher/assets/128330097/44563b7f-9d21-4d35-b05d-22c9e044e9ba)

![image 2](https://github.com/sstephanyy/Google-extension-the-word-catcher/assets/128330097/ceb0393f-35da-4a63-b48a-75e67126d225)

![image 3](https://github.com/sstephanyy/Google-extension-the-word-catcher/assets/128330097/2ef44aae-6c4a-43e6-b380-f564258bd60c)



## Contribuições
Se você deseja contribuir para o Inglêsando, ficarei feliz em receber sua ajuda! Sinta-se à vontade para enviar pull requests com melhorias, correções de bugs, novos recursos ou qualquer outra forma de contribuição. Juntos, podemos tornar o Inglêsando ainda melhor!

