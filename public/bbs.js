"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    const job = document.querySelector('#jobselect').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message + '&hizuke='+ new Date().toLocaleString()+ '&job='+ job,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+0,
                //body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                let numl = response.messages.length;
                let hn = document.querySelector('#hn').value;
                let a = parseInt(hn);
                const coverDivs = document.querySelectorAll('div.cover');

                // 各<div>要素をループで削除
                coverDivs.forEach(div => div.remove());
                for( let mes of response.messages ) {
                    console.log('hn='+hn);
                    console.log('numl='+numl);
                    console.log('a='+a);
                    if(numl - a > 0){
                        a += 1;
                        continue;
                    }
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name + "[" + mes.job + "]";
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    let hizuke_area = document.createElement('span');
                    hizuke_area.className = 'hizuke';
                    hizuke_area.innerText = mes.hizuke;
                    cover.appendChild( hizuke_area );
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );

                    bbs.appendChild( cover );
                }
            })
        }
    });
});