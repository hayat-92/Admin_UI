async function getData(){
    let url="https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    try {
        let data = await fetch(url);
        let response=await data.json();
        return await response;
    } catch (error) {
        return null;
    }
}







export {getData,}