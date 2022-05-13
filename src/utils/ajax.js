const base_url = "http://localhost:8080/";

let postRequest_v2 = (url, data, callback) => {
    console.log(url,data);
    let formData = new FormData();

    for (let p in data){
        if(data.hasOwnProperty(p))
            formData.append(p, data[p]);
    }

    let opts = {
        method: "POST",
        dateType:'json',
        header:{'content-type':'application/json'},
        body: formData,
        credentials: "include"
    };

    fetch(url,opts)
        .then((response) => {
            // console.log(response);
            return response.json()
        })
        .then((data) => {
            console.log(data);
            callback(data);
        })
        .catch((error) => {
           callback("");
        });
};

let postRequest = (url, json, callback) => {

    let opts = {
        method: "POST",
        body: JSON.stringify(json),//.replace("\\",""),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    console.log(opts);
    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};
export {postRequest,postRequest_v2,base_url};