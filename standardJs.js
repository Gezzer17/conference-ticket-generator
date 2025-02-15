const divUpload = document.querySelector('.upload-div');
const inputUpload = document.querySelector('[name=fileUpload]')
const sviElementiUUploadDivu = divUpload.querySelectorAll('*');
const defaultniIzgleddivUploada = divUpload.innerHTML;
const glavniContainer = document.querySelector('.glavni-div');


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


let provjeraISubmitanje = (e)=>
{
    e.preventDefault();
    if(ValidacijaInputa())
    {

        glavniContainer.innerHTML = "";
    }

}



const submitDugme = document.getElementById('crveniInput');

submitDugme.addEventListener('click',provjeraISubmitanje)






/*Stimanje tabiranja*/

document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
       
       
        const inputi = Array.from(document.querySelectorAll('[tabindex]'));
        console.log(inputi);
        const fokusiraniIndex = inputi.findIndex(input=> input === document.activeElement);
        
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