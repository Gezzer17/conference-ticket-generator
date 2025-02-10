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
        if(string !== 'image/jpeg' || string !== 'image/png')
        {
            console.log("Slika nije u ispravnom formatu!");
        }


}

//Dodavanje Event Listenera Za sliku ukoliko korisnik doda Sliku,da je priakzemo u divu




inputUpload.addEventListener('change',(e)=>
    {
        let fajlSLike = e.target.files[0];
        if(fajlSLike)
        {
            

            
            let reader = new FileReader();
            reader.onload = function(e)
            {
                

            }
            reader.readAsDataURL(fajlSLike);


        }
         
    });
