const divUpload = document.querySelector('.upload-div');
const inputUpload = document.querySelector('[name=fileUpload]')
const sviElementiUUploadDivu = divUpload.querySelectorAll('*');
const defaultniIzgleddivUploada = divUpload.innerHTML;
const glavniContainer = document.querySelector('.glavni-div');
let obj = 
{
    slika:"",
    ime:"",
    email:"",
    username:"" 
};


let otvoriFileBrowser = ()=>
{
    inputUpload.click();
}

//Stimanje diva na upload, otvaranjem inputa 
divUpload.addEventListener('click',otvoriFileBrowser);




//Funkcija za provjeru tipa fajla

let provjeraTipaFajla = (string)=>
{
        
        
        if(string === 'image/jpeg' || string === 'image/png')
        {
            
            
            return true;

        }
        

        return false;
}

let provjeraVelicineFajla = (velicinaFajla)=>
{

        let vrijednostKB = velicinaFajla / 1000;
        if(vrijednostKB < 500)
        {
           

            return true;
        }
        else
        {
            
            
            const pLabelaIspod = document.querySelector('.ispod-info-label p');
            const svgLabelaIspod = document.querySelector('.ispod-info-label svg');
            let stalniTekst = pLabelaIspod.innerHTML;
            pLabelaIspod.innerHTML = "File too large. Please upload photo under 500KB";
            pLabelaIspod.classList.toggle('state-error');
            svgLabelaIspod.classList.toggle('error-svg');
            setTimeout(() => {
                
                pLabelaIspod.innerHTML = `${stalniTekst}`;
                pLabelaIspod.classList.toggle('state-error');
                svgLabelaIspod.classList.toggle('error-svg');
                
            }, 5000);
            return false;
        }


}
//Dodavanje EventListenra na Dugmad koja samo dodali
let dodavanjeEventListenraNaNovaDugmad = ()=>
{
    const dugmadZaUploadPoslije = document.querySelectorAll('.dugmad-after-upload');

                        if(dugmadZaUploadPoslije)
                        {   

                            dugmadZaUploadPoslije.forEach(dugme=>
                            {
                                dugme.addEventListener('click',(e)=>
                                {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if(e.target.classList.contains('dugme-za-brisanje'))
                                    {

                                        divUpload.innerHTML = defaultniIzgleddivUploada;
                                        divUpload.addEventListener('click',otvoriFileBrowser);
                                    }
                                    else
                                    {
                                        otvoriFileBrowser();
                                    }

                                })
                            })

                        }

                    if(dugmadZaUploadPoslije)
                    {
                        
                        divUpload.removeEventListener('click',otvoriFileBrowser);
                    }
}


let pripremaZaDodavanjeNaClick = (e)=>
    {       
        let fajlSLike; 
        e.preventDefault();
        fajlSLike = e.target.files[0];
        uzimanjeSLike(fajlSLike);
        
    }
//Funkcija dodavanja slike

let uzimanjeSLike = (fajlSLike)=>
{
    if(fajlSLike)
        {
            if(!provjeraTipaFajla(fajlSLike.type) || !provjeraVelicineFajla(fajlSLike.size))
            {
                console.log("Ne nastavljam");
                return;
            }

            
            let reader = new FileReader();
            reader.onload = function(e)
            {
                let StaDodajemo =   
                `<img src="${e.target.result}" class="slika-upload">
                 <div class="dugmad-div">
                 <button class="dugme-za-brisanje dugmad-after-upload">Remove Image</button>
                 <button class="dugme-za-promjenu dugmad-after-upload">Change Image</button>
                 </div>
                 `
                 divUpload.innerHTML = StaDodajemo;
                 
                 dodavanjeEventListenraNaNovaDugmad();    
            }
            reader.readAsDataURL(fajlSLike);

        }
}

//Dodavanje Event Listenera Za sliku ukoliko korisnik doda Sliku,da je priakzemo u divu
inputUpload.addEventListener('change',pripremaZaDodavanjeNaClick);




//Event listeneri za drag and drop
divUpload.addEventListener('dragover', (e) => {
   
    e.stopPropagation();
    e.preventDefault();

});

divUpload.addEventListener('dragleave', (e) => {
   
    e.preventDefault();
    e.stopPropagation();
    
    
});

divUpload.addEventListener('drop',(e)=>
{
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    uzimanjeSLike(file);
    
});


let dodavanjeLabela = (imeParentDiva,tekst) =>
{   
    const glavniDiv = document.querySelector(`.${imeParentDiva}`)
    if(!glavniDiv.classList.contains('upload-hidden') )
    {
        return;
    }
    const pMali = document.querySelector(`.${imeParentDiva} p`);
    const svgIspod = document.querySelector(`.${imeParentDiva} svg`);
    glavniDiv.classList.toggle('upload-hidden');
    pMali.classList.toggle('state-error');
    svgIspod.classList.toggle('error-svg');
    
    setTimeout(() => {
        
        glavniDiv.classList.toggle('upload-hidden');
        pMali.classList.toggle('state-error');
        svgIspod.classList.toggle('error-svg');

    }, 3000);
    
}
//Stimanje validacija nakon klika button

let ValidirajEmail = (email) =>
{
    let regex = /^[a-zA-Z0-9]{1,19}(\.?[a-zA-Z0-9]{1,19})?@(gmail|outlook)\.com$/;

    if(regex.test(email))
    {
        
        return true;
    }
    else
    {
        return false;
    }


}
let ValidirajUserName = (username) =>
{
    let regex = /^@[a-zA-Z0-9]{2,30}$/;

    if(regex.test(username))
    {
        return true;

    }
    return false;
}


// Validacija radi, ne znam , al radi 
let ValidacijaInputa = ()=>
{
    let istina = true;
    const ime = document.getElementById('imeVal');
    const email = document.getElementById('email');
    const userName = document.getElementById('username');
    const slika = document.getElementById('dugmeZaUpload');
    
    
    if(slika)
    {
        
        const pLabelaIspod = document.querySelector('.ispod-info-label p');
        const svgLabelaIspod = document.querySelector('.ispod-info-label svg');
        let stalniTekst = pLabelaIspod.innerHTML;
        if(pLabelaIspod.classList.contains('state-error'))
        {
            return;
        }
        pLabelaIspod.innerHTML = "Please select the picture!";
        pLabelaIspod.classList.toggle('state-error');
        svgLabelaIspod.classList.toggle('error-svg');
        setTimeout(() => {
            
            pLabelaIspod.innerHTML = `${stalniTekst}`;
            pLabelaIspod.classList.toggle('state-error');
            svgLabelaIspod.classList.toggle('error-svg');
            
        }, 3000);
        istina = false;
        
    }
    if(!ime.value.trim())
    {
    
        istina = dodavanjeLabela('valIme');
    }
    if(!email.value.trim()  || !ValidirajEmail(email.value))
    {
        istina = dodavanjeLabela('valEmail');
    }
    if(!userName.value.trim() || !ValidirajUserName(userName.value))
    {
        istina = dodavanjeLabela('valUsername');
    }


    return istina;
}

let NastimajSve = () =>
{
    let gornjiDio = `<h4 class="gornji-naslov"><img src="/assets/images/logo-mark.svg" alt="" class="logo-mark">Coding Conf</h4>`;
    let gornjiNaslov = `<h1 class="veliki-naslov">Congrats, <span class="imePrezime">${obj.ime}</span>!<br>Your ticket is ready</h1>`;
    let opis = `<p class="tekst-ispod-naslova">We've eamiled your ticket to <br><span class="email">${obj.email}</span> and will send updates in <br> the run to event</p>`
    let ticket = `<div class="Ticket">
                    <div class="lijevaStranaTicket">
                            <div class="gornja-desna-strana-ticket">
                                <div class="logoNaziv">
                                    <img src="/assets/images/logo-mark.svg" alt="" class="MaliLogo">
                                    <h3>Coding Conf</h3>
                                </div>
                                <p>Jan 31, 2025 / Austin, TX</p>
                            </div>
                            <div class="Donja-Strana">
                                <img class="slika" src="${obj.slika}" >
                                <div class="desno-tekst-o">
                                    <h3 class="ime">${obj.ime}</h3>
                                    <div class="logo-username">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" fill="none" viewBox="0 0 22 23"><path fill="white" fill-rule="evenodd" d="M13.022 15.221c.08.268.11.55.088.833l.002.44a.66.66 0 0 1-1.32 0v-.492c.025-.336-.074-.61-.276-.821a.66.66 0 0 1 .405-1.112c1.536-.17 2.559-.704 2.559-2.763 0-.515-.196-1.004-.55-1.375a.66.66 0 0 1-.142-.687c.108-.29.14-.598.096-.897-.225.076-.578.233-1.064.559a.66.66 0 0 1-.542.088 5.81 5.81 0 0 0-3.071 0 .66.66 0 0 1-.543-.088c-.48-.322-.831-.48-1.064-.556-.043.299-.01.606.096.895a.66.66 0 0 1-.14.684c-.359.377-.554.87-.551 1.39 0 2.032 1.027 2.576 2.568 2.768a.66.66 0 0 1 .394 1.112.992.992 0 0 0-.276.756l.001.475c0 .29-.192.549-.47.632a4.082 4.082 0 0 1-1.164.189c-1.22 0-1.799-.735-2.177-1.216-.157-.199-.319-.404-.43-.43a.66.66 0 0 1 .32-1.282c.55.137.867.54 1.147.895.377.478.64.817 1.449.691a2.174 2.174 0 0 1 .096-.683c-1.18-.31-2.778-1.177-2.778-3.904a3.296 3.296 0 0 1 .659-2 3.125 3.125 0 0 1 .17-1.948A.661.661 0 0 1 6.936 7c.192-.058.899-.166 2.214.648a7.105 7.105 0 0 1 3.186 0c1.315-.813 2.021-.704 2.213-.648a.66.66 0 0 1 .42.373c.267.62.325 1.3.172 1.949.428.57.66 1.26.66 1.984 0 2.76-1.596 3.617-2.778 3.915Zm1.252-11.853H6.846c-2.912 0-4.866 2.05-4.866 5.086v6.987c0 3.045 1.954 5.087 4.866 5.087h7.428c2.912 0 4.866-2.042 4.866-5.087V8.454c0-3.036-1.954-5.086-4.866-5.086Z" clip-rule="evenodd"/></svg>
                                        <p>@username</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <h3 class="brojka">#1352s</h3>
                  </div>`
    glavniContainer.innerHTML+=gornjiDio;
    glavniContainer.innerHTML+=gornjiNaslov;
    glavniContainer.innerHTML+=opis;
    glavniContainer.innerHTML+=ticket;

}

let provjeraISubmitanje = (e)=>
{
    e.preventDefault();
    if(ValidacijaInputa())
    {

        obj.ime = document.getElementById("imeVal").value;
        obj.email = document.getElementById("email").value;
        obj.username = document.getElementById("username").value;
        obj.slika = document.querySelector('.slika-upload').src;
        glavniContainer.innerHTML ="";
        console.log(obj);
        NastimajSve();

    }

}



const submitDugme = document.getElementById('crveniInput');

submitDugme.addEventListener('click',provjeraISubmitanje)






/*Stimanje tabiranja*/

document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
       
        const inputi = Array.from(document.querySelectorAll('[tabindex]'));
        
        const fokusiraniIndex = inputi.findIndex(input=> input === document.activeElement);
        console.log(fokusiraniIndex);
        if(fokusiraniIndex === inputi.length - 1)
        {
            e.preventDefault();
            inputi[0].focus();
        }


    }
});


/*Event listner za upload div*/


divUpload.addEventListener('focus',(e)=>
{
    divUpload.addEventListener('keydown',(e)=>
    {

        if(e.key === "Enter")
        {
            otvoriFileBrowser();
        }

    })


})