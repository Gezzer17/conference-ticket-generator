const divUpload = document.querySelector('.upload-div');
const inputUpload = document.querySelector('[name=fileUpload]')
const sviElementiUUploadDivu = divUpload.querySelectorAll('*');

//Stimanje diva na upload, otvaranjem inputa 
divUpload.addEventListener('click',()=>
{
    
    inputUpload.click();
    

});


//Funkcija za provjeru tipa fajla

let provjeraTipaFajla = (string)=>
{
        console.log(string);
        console.log(typeof string);
        
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
           
            console.log(vrijednostKB);
        }
        else
        {
            
            console.log(vrijednostKB);
            const pLabelaIspod = document.querySelector('.ispod-info-label p');
            let stalniTekst = pLabelaIspod.innerHTML;
            pLabelaIspod.innerHTML = "File too large. Please upload photo under 500KB";
            pLabelaIspod.classList.toggle('state-error');
            setTimeout(() => {
                
                pLabelaIspod.innerHTML = `${stalniTekst}`;
                pLabelaIspod.classList.toggle('state-error');

            }, 5000);
        }


}

//Dodavanje Event Listenera Za sliku ukoliko korisnik doda Sliku,da je priakzemo u divu




inputUpload.addEventListener('change',(e)=>
    {
        let fajlSLike = e.target.files[0];

        if(fajlSLike)
        {
            if(!provjeraTipaFajla(fajlSLike.type) || !provjeraVelicineFajla(fajlSLike.size))
            {
                return;
            }

            
            let reader = new FileReader();
            reader.onload = function(e)
            {


            }
            reader.readAsDataURL(fajlSLike);


        }
         
    });
