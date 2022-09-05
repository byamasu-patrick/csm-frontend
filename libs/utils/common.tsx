export const convertSelectedImageToBase64 = (file: File, cbfunction: Function) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cbfunction(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
