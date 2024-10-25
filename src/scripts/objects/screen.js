const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `
            <div class="info">
                <img src="${user.avatarUrl}" alt="Foto do perfil do usuario">
                    <div  class="data">
                        <h1>${user.name ?? 'Nao possui nome cadastrado    😢'} </h1>
                        <p>${user.bio ?? 'Nao possui bio cadastrado 😢'} </p>
                        <h2>Número de seguidores: 👥${user.userFollowers}</h2>
                        <h2>Número de pessoas que está seguindo: 👥${user.userFollowing}</h2>
                    </div>
            </div>`;

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `
            <li>
                <a href="${repo.html_url}" target="_blank">${repo.name}
                    <ul class="popularity">
                        <li>🍴${repo.forks}</li>
                        <li>⭐${repo.stargazers_count}</li>
                        <li>👀${repo.watchers}</li>
                        <li>🖥️${repo.language ?? 'X'}</li>
                    </ul>
                </a>
            </li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML +=  `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div> `;
        }

        let eventsItens = ''
        user.events.forEach(function(event){

            if(event.type === 'CreateEvent'){
                eventsItens += `<li>
                                    <p>${event.repo.name} <br><br> Sem mensagem de commit</p>
                                </li>`
            }else if(event.type === 'PushEvent'){
                eventsItens += `<li>
                                    <p>${event.repo.name} <br><br> ${event.payload.commits[0].message}</P>
                                </li>`
            }
        })

        if(user.events.length > 0){
            this.userProfile.innerHTML +=  `<div class="event">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`
            
        }else{
            this.userProfile.innerHTML +=  `<div class="event">
                                                <h2>Eventos</h2>
                                                <h3>Não Contem Eventos</h3>
                                            </div>`
        }

    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }