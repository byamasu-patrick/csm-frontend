export const convertSelectedImageToBase64 = (file: File , cbfunction: Function) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cbfunction(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}


export const MalawiDistricts = [
    "City", "Dedza", "Dowa", "Kasungu", "Lilongwe", "Mchinji", "Nkhotakota", "Ntcheu", "Ntchisi", "Salima",
    "Chitipa", "Karonga", "Likoma", "Mzimba", "Nkhata Bay", "Rumphi", "Balaka", "Blantyre", "Chikwawa",
    "Chiradzulu", "Machinga", "Mangochi", "Mulanje", "Mwanza", "Nsanje", "Thyolo", "Phalombe", "Zomba",
    "Neno"
]

export const MalawiRegions = [
    "Country", "Central Region", "Northern Region", "Southern Region"
]