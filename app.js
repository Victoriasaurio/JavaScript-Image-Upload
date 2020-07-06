const imagepreview = document.getElementById('img-preview');
const imageuploader = document.getElementById('img-uploader');
const imageUploadBar = document.getElementById('img-upload-bar');

/*URL para subir la imagen a CLOUDINARY*/
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/saurio-rex/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'lcmhlzzc';

//Propiedad 'change' que escucha el evento al seleccionarlo
imageuploader.addEventListener('change', async (e) => {
    const file = e.target.files[0]; /**Imagen seleccionada */

    const formData = new FormData();
    formData.append('file', file); /**Archivo a enviar*/
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    /**FETCH simula AJAX o POST de JQUERY */

    /**AXIOS */ //Enviando información a cloudinary
    const res = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data' /**Enviando un formulario con un data(image) */
        },
        /**Método de AXIOS Progreso de subida de datos */
        onUploadProgress(e) {
            console.log(Math.round(e.loaded * 100 / e.total)); //Redondea los valores y retorna como porcentaje
            const progress = (e.loaded * 100) / e.total; //Guardando en una constante el porcentaje
            imageUploadBar.setAttribute('value', progress); //Pasando porcentaje al valor de la barra-loader
        }
    });
    imagepreview.src = res.data.secure_url;
});