
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export function completePath(path){

    if (apiKey){
        return `${apiUrl}/${path}?api_key=${apiKey}`;
    }

    return `${apiUrl}/${path}`;
}
