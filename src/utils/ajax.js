const base_url = "http://localhost:8080/";
// const base_url = "https://localhost:8443/";
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


let postRequest_v2_async = async (url, data) => {
    console.log(url, data);
    let formData = new FormData();

    for (let p in data) {
        if (data.hasOwnProperty(p))
            formData.append(p, data[p]);
    }

    let opts = {
        method: "POST",
        dateType: 'json',
        header: {'content-type': 'application/json'},
        body: formData,
        credentials: "include"
    };

    const response = await fetch(url, opts);
    const res = await response.json();
    console.log(res);
    return res;
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
        .then(async (response) => {
            try {
                let res = await response.json()
                return res;
            } catch (e) {
                return response;
            }
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

let postRequest_async = async (url, json) => {

    let opts = {
        method: "POST",
        body: JSON.stringify(json),//.replace("\\",""),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    const response = await fetch(url, opts);
    const res = await response.json();
    console.log(res);
    return res;
};
export {postRequest,postRequest_v2,postRequest_async,postRequest_v2_async,base_url};
